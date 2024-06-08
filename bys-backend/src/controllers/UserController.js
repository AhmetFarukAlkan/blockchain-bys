// UserController.js

const {
  UserContractAddress,
  accountAddress,
} = require("../Constants/contractConstants.js");
const { MESSAGES } = require("../Constants/MessageConstant.js");
const CryptoJS = require("crypto-js"); // CryptoJS modülünü içe aktarın
const UserContract = require("../Blockchain/Contracts/User/UserContract.js");
const DepartmentContract = require("../Blockchain/Contracts/Department/DepartmentContract.js");
const StudentCourseInfoContract = require("../Blockchain/Contracts/CourseStudent/StudentCourseInfoContract.js");
const TeacherContract = require("../Blockchain/Contracts/User/TeacherContract.js");
const StudentContract = require("../Blockchain/Contracts/User/StudentContract.js");
const { getSemesterKey } = require("../Enum/Semesters.js");
const { calculateInfo, getWeeklySchedule, unixTimeStampToDateTime, getDepartmentWalletAddress, decrypt, encrypt, isEmpty } = require("../Utils/utils.js");
const ExamContract = require("../Blockchain/Contracts/Exam/ExamContract.js");
const { ROLE } = require("../Constants/roleConstants.js");
const { StudentCourseStatus } = require("../Enum/StudentCourseStatuses.js");
const secret = "your-secret-key";

async function getAllUsers(req, res) {
  try {
    const personalInfo = await UserContract.methods.getAllUsers().call();
    const hasRole = req.query.hasRole === 'true';

    const sanitizedPersonalInfo = personalInfo.map((user) => {
      return {
        userId: user.userId.toString(),
        name: decrypt(user.name),
        surname: decrypt(user.surname),
        number: decrypt(user.number),
        mail: decrypt(user.mail),
        phone: decrypt(user.phone),
        isActive: user.isActive,
        roles: user.roles,
        created_at: unixTimeStampToDateTime(user.created_at.toString()),
        courseIds: user.courseIds?.map((id) => id.toString()),
      };
    }).filter(user => user.isActive === false)
    .filter(user => !isEmpty(user.roles) === hasRole);

    sanitizedPersonalInfo.sort((a, b) => {
      return new Date(b.created_at) - new Date(a.created_at);
    });    

    res.status(200).json({
      data: sanitizedPersonalInfo,
      total: sanitizedPersonalInfo.length,
      message: MESSAGES.USER_INDEX_SUCCESS,
      success: true,
    });
  } catch (error) {
    console.error("Server Error", error);
    res.status(500).json({ error: "Server Error" });
  }
}

async function getUser(req, res) {
  try {
    const userId = req.params.id;

    const user = await UserContract.methods.getUserPersonalInfo(userId).call();

    const sanitizedUserInfo = {
        name: decrypt(user[0]),
        surname: decrypt(user[1]),
        number: decrypt(user[2]),
        mail: decrypt(user[3]),
        phone: decrypt(user[4]),
    };

    res.status(200).json({
      data: sanitizedUserInfo,
      message: MESSAGES.USER_GET_SUCCESS,
      success: true,
    });
  } catch (error) {
    console.error("Server Error", error);
    res.status(500).json({ error: "Server Error" });
  }
}

async function approveUser(req, res) {
  const userId = req.params.id;
  const {
    role,
    department_id,
    teacherId,
    number = ''
  } = req.body;

  try {
    if (role === ROLE.STUDENT){
      const advisorInfo = await UserContract.methods
        .getAdvisorInfo(
          teacherId
        )
        .call();

        const advisorDepartmentId = Number(advisorInfo.departmentId);

        if (Number(department_id) !== advisorDepartmentId) {
          return res.status(500).json({ error: "Bu öğretim üyesini danışman olarak seçemezsiniz" });
        }

        await UserContract.methods
          .addStudentToAdvisor(teacherId, userId)
          .send({ from: accountAddress, gas: 800000 });
    }

    if (role !== ROLE.ADMIN){
      await UserContract.methods
        .addUserDepartment(userId, department_id, role, 1)
        .send({ from: accountAddress, gas: 800000 });
    }

    if (role === ROLE.TEACHER){
      await UserContract.methods
        .addAdvisorStudentRelationship(userId, [], department_id)
        .send({ from: accountAddress, gas: 800000 });
    }

    await UserContract.methods
      .approveUser(
        userId,
        encrypt(number),
        [role],
        1,
      )
      .send({ from: accountAddress, gas: 500000 });

    res.status(200).json({
      message: MESSAGES.USER_UPDATE_SUCCESS,
      success: true,
    });
  } catch (error) {
    console.error("Server Error", error);
    res.status(500).json({ error: "Server Error" });
  }
}

async function changeRole(req, res) {
  const userId = req.params.id;
  const {
    role,
    department_id,
    teacherId,
  } = req.body;

  try {
    const userRoles = await UserContract.methods
      .getUserRoles(userId)
      .call();

    if(isEmpty(userRoles)) {
      return res.status(500).json({ error: "Bu kullanıcı pasif bir kullanıcı. Departman'a kaydedemezsin." });
    }

    let roles = [...new Set([...userRoles, role])];

    if (role !== ROLE.ADMIN){
      const userDepartments = await UserContract.methods
        .getUserDepartments(userId)
        .call();

      const sanitizedUserDepartments= userDepartments.map((userDepartment) => {
        return {
          userId: Number(userDepartment.userId),
          departmentId: Number(userDepartment.departmentId),
          role: userDepartment.role,
        };
      });

      const isUserAlreadyInDepartment = sanitizedUserDepartments.some((userDepartment) => userDepartment.departmentId === Number(department_id));
      
      if (isUserAlreadyInDepartment) {
        return res.status(500).json({ error: "Bu kullanıcı zaten bu departmana kayıtlı" });
      }

      await UserContract.methods
        .addUserDepartment(userId, department_id, role, 1)
        .send({ from: accountAddress, gas: 800000 });
    }

    if (role === ROLE.STUDENT){
      const advisorInfo = await UserContract.methods
        .getAdvisorInfo(
          teacherId
        )
        .call();

        const advisorDepartmentId = Number(advisorInfo.departmentId);

        if (Number(department_id) !== advisorDepartmentId) {
          return res.status(500).json({ error: "Bu öğretim üyesini danışman olarak seçemezsiniz" });
        }

        await UserContract.methods
          .addStudentToAdvisor(teacherId, userId)
          .send({ from: accountAddress, gas: 800000 });
    }

    if (role === ROLE.TEACHER){
      const advisorInfo = await UserContract.methods
        .getAdvisorInfo(
          userId
        )
        .call();

      const advisorDepartmentId = Number(advisorInfo.departmentId);

      if (advisorDepartmentId === 0) {
        await UserContract.methods
          .addAdvisorStudentRelationship(userId, [], department_id)
          .send({ from: accountAddress, gas: 800000 });      
      }
    }

    await UserContract.methods
      .setUserRoles(
        userId,
        roles
      )
      .send({ from: accountAddress, gas: 500000 });

    res.status(200).json({
      message: MESSAGES.USER_UPDATE_SUCCESS,
      success: true,
    });
  } catch (error) {
    console.error("Server Error", error);
    res.status(500).json({ error: "Server Error" });
  }
}

async function getCourses(req, res) {
  try {
    const userId = req.params.id;
    const { departmentId, isArchive = false } = req.query;

    const courses = await StudentCourseInfoContract.methods
      .getStudentCourses(
        userId,
        departmentId,
        isArchive ? 1 : 0
      )
      .call();

    const sanitizedCourses = courses.map((course) => {
      return {
        id: Number(course.id),
        courseId: Number(course.courseId),
        schedules: course.schedules,
        year: Number(course.year),
        semester: Number(course.semester),
        isActive: course.isActive ? 1 : 0,
        name: course.courseName,
        departmentId: Number(course.departmentId),
        capacity: Number(course.capacity),
        credit: Number(course.credit), 
        code: course.code,
        studentStatus: course.studentStatus
      };
    })
    .filter(course => course.id !== 0);

    res.status(200).json({
      data: sanitizedCourses,
      total: sanitizedCourses.length,
      message: MESSAGES.USER_COURSE_GET_SUCCESS,
      success: true,
    });
  } catch (error) {
    console.error("Server Error", error);
    res.status(500).json({ error: "Server Error" });
  }
}

async function getStudentDepartments(req, res) {
  try {
    const userId = req.params.id;

    const departments = await DepartmentContract.methods
      .getDepartmentsByStudent(userId, UserContractAddress)
      .call();

    const sanitizedDepartments = departments.map((department) => {
      return {
        id: department.departmentId.toString(),
        name: department.name,
      };
    }).filter(department => department.id !== 0);;

    res.status(200).json({
      data: sanitizedDepartments,
      message: MESSAGES.USER_DEPARTMENT_GET_SUCCESS,
      success: true,
    });
  } catch (error) {
    console.error("Server Error", error);
    res.status(500).json({ error: "Server Error" });
  }
}

async function getTeacherDepartments(req, res) {
  try {
    const userId = req.params.id;

    const departments = await DepartmentContract.methods
      .getDepartmentsByTeacher(userId, UserContractAddress)
      .call();

    const sanitizedDepartments = departments.map((department) => {
      return {
        id: department.departmentId.toString(),
        name: department.name,
      };
    }).filter(department => department.id !== 0);

    res.status(200).json({
      data: sanitizedDepartments,
      message: MESSAGES.USER_DEPARTMENT_GET_SUCCESS,
      success: true,
    });
  } catch (error) {
    console.error("Server Error", error);
    res.status(500).json({ error: "Server Error" });
  }
}

async function selectCourse(req, res) {
  try {
    const userId = req.params.id;
    const { course_ids = [], departmentId} = req.body;

    const departmentWalletAddress = await getDepartmentWalletAddress(departmentId);

    await StudentCourseInfoContract.methods
      .addStudentCourseInfos(course_ids, userId)
      .send({ from: departmentWalletAddress, gas: 500000 });

    res.status(200).json({
      message: MESSAGES.STUDENT_COURSE_SELECTION_SUCCESS,
      success: true,
    });
  } catch (error) {
    console.error("Server Error", error);
    res.status(500).json({ error: "Server Error" });
  }
}

async function getTeacherCourses(req, res) {
  try {
    const teacherId = req.params.id;
    const { departmentId } = req.query;

    const courses = await TeacherContract.methods
      .getTeacherCourses(
        teacherId,
        departmentId
      )
      .call();

    const sanitizedCourses = courses.map((course) => {
      return {
        id: Number(course.id),
        courseId: Number(course.courseId),
        schedules: course.schedules,
        year: Number(course.year),
        semester: Number(course.semester),
        isActive: course.isActive ? 1 : 0,
        name: course.courseName,
        departmentId: Number(course.departmentId),
        capacity: Number(course.capacity),
        credit: Number(course.credit), 
        code: course.code,
        studentStatus: course.studentStatus
      };
    }).filter(department => department.id !== 0);

    res.status(200).json({
      data: sanitizedCourses,
      total: sanitizedCourses.length,
      message: MESSAGES.TEACHER_COURSE_GET_SUCCESS,
      success: true,
    });
  } catch (error) {
    console.error("Server Error", error);
    res.status(500).json({ error: "Server Error" });
  }
}

async function getTeacherGivenCourses(req, res) {
  try {
    const teacherId = req.params.id;
    const { departmentId, year, semester } = req.query;

    const courses = await TeacherContract.methods
      .getTeacherCourses(
        teacherId,
        departmentId,
        year,
        semester
      )
      .call();

    const sanitizedCourses = courses.map((course) => {
      return {
        id: Number(course.id),
        courseId: Number(course.courseId),
        schedules: course.schedules,
        year: Number(course.year),
        semester: Number(course.semester),
        isActive: course.isActive ? 1 : 0,
        name: course.courseName,
        departmentId: Number(course.departmentId),
        capacity: Number(course.capacity),
        credit: Number(course.credit), 
        code: course.code,
        studentStatus: course.studentStatus,
        gradingRules: course.gradingRules,
      };
    }).filter(department => department.id !== 0);

    res.status(200).json({
      data: sanitizedCourses,
      total: sanitizedCourses.length,
      message: MESSAGES.TEACHER_COURSE_GET_SUCCESS,
      success: true,
    });
  } catch (error) {
    console.error("Server Error", error);
    res.status(500).json({ error: "Server Error" });
  }
}

async function getAdvisorStudents(req, res) {
  try {
    const teacherId = req.params.id;
    const {} = req.query;

    const students = await TeacherContract.methods
      .getAdvisorStudents(teacherId)
      .call();

    const advisorInfo = await UserContract.methods
      .getAdvisorInfo(teacherId)
      .call();

    const sanitizedStudents = students.map((user) => {
      return {
        userId: Number(user.userId),
        name: decrypt(user.name),
        surname: decrypt(user.surname),
        number: decrypt(user.number),
        mail: decrypt(user.mail),
        phone: decrypt(user.phone),
      };
    }).filter(user => user.userId !== 0);

    const sanitizedAdvisorInfo = {
      teacherId: Number(advisorInfo.teacherId),
      departmentId: Number(advisorInfo.departmentId),
    };

    res.status(200).json({
      data: {
        students: sanitizedStudents,
        advisorInfo: sanitizedAdvisorInfo,
      },
      total: sanitizedStudents.length,
      message: MESSAGES.USER_INDEX_SUCCESS,
      success: true,
    });
  } catch (error) {
    console.error("Server Error", error);
    res.status(500).json({ error: "Server Error" });
  }
}

async function getAcademicInfos(req, res) {
  try {
    const userId = req.params.id;
    const { departmentId, year, semester } = req.query;

    const infos = await StudentContract.methods
      .getStudentCourses(
        userId,
        departmentId,
        year,
        semester
      )
      .call();

    const sanitizedInfos = infos.map((info) => {
      return {
        id: Number(info.id),
        courseId: Number(info.courseId),
        schedules: info.schedules,
        year: Number(info.year),
        semester: Number(info.semester),
        isActive: info.isActive ? 1 : 0,
        name: info.courseName,
        departmentId: Number(info.departmentId),
        capacity: Number(info.capacity),
        credit: Number(info.credit), 
        gradingRules: info.gradingRules,
        code: info.code,
        studentStatus: info.studentStatus,
        absentee: info.absentee ? 1 : 0,
        midtermGrade: Number(info.midtermGrade),
        finalGrade: Number(info.finalGrade),
        makeupExamGrade: Number(info.makeupExamGrade),
        letterGrade: info.letterGrade,
        studentCourseInfoId: Number(info.studentCourseInfoId),
      };
    }).filter(info => info.courseId !== 0);

    res.status(200).json({
      data: sanitizedInfos,
      total: sanitizedInfos.length,
      message: MESSAGES.USER_ACADEMIC_INFO_GET_SUCCESS,
      success: true,
    });
  } catch (error) {
    console.error("Server Error", error);
    res.status(500).json({ error: "Server Error" });
  }
}

async function updateAcademicInfos(req, res) {
  try {
    const id = req.params.id;
    const { absentee, midtermGrade, finalGrade, makeupExamGrade, status, letterGrade = '', departmentId } = req.body;

    const departmentWalletAddress = await getDepartmentWalletAddress(departmentId);
    
    await StudentCourseInfoContract.methods
      .updateStudentCourseInfo(
        id, 
        absentee, 
        midtermGrade ? midtermGrade.toString() : -1, 
        finalGrade ? finalGrade.toString() : -1, 
        makeupExamGrade ? makeupExamGrade.toString() : -1, 
        status,
        letterGrade
      )
      .send({ from: departmentWalletAddress, gas: 500000 });

    res.status(200).json({
      message: MESSAGES.STUDENT_ACADEMIC_INFO_UPDATE_SUCCESS,
      success: true,
    });
  } catch (error) {
    console.error("Server Error", error);
    res.status(500).json({ error: "Server Error" });
  }
}

async function updateDepartmentActivity(req, res) {
  try {
    const id = req.params.id;
    const { departmentId, isActive } = req.body;
    const activity = isActive === true;
    const departmentWalletAddress = await getDepartmentWalletAddress(departmentId);
    
    await UserContract.methods
      .updateUserDepartmentStatus(
        id, 
        departmentId,
        activity
      )
      .send({ from: departmentWalletAddress, gas: 500000 });

    res.status(200).json({
      message: MESSAGES.SUCCESS,
      success: true,
    });
  } catch (error) {
    console.error("Server Error", error);
    res.status(500).json({ error: "Server Error" });
  }
}

async function getDepartmentActivity(req, res) {
  try {
    const id = req.params.id;
    const { departmentId } = req.query;
    
    const userDepartments = await UserContract.methods
      .getUserDepartments(id)
      .call();

    const sanitizedUserDepartments = userDepartments.map((userDepartment) => {
      return {
        userId: Number(userDepartment.userId),
        departmentId: Number(userDepartment.departmentId),
        role: userDepartment.role,
        isActive: userDepartment.isActive ? 1 : 0,
      };
    }).find((item) => {
      return item.departmentId === Number(departmentId);
    })

    res.status(200).json({
      data: sanitizedUserDepartments,
      message: MESSAGES.SUCCESS,
      success: true,
    });
  } catch (error) {
    console.error("Server Error", error);
    res.status(500).json({ error: "Server Error" });
  }
}

async function deleteAcademicInfos(req, res) {
  try {
    const id = req.params.id;
    const { departmentId } = req.body;

    const departmentWalletAddress = await getDepartmentWalletAddress(departmentId);
    
    await StudentCourseInfoContract.methods
      .deleteStudentCourseInfo(id)
      .send({ from: departmentWalletAddress, gas: 500000 });

    res.status(200).json({
      message: MESSAGES.STUDENT_ACADEMIC_INFO_DELETE_SUCCESS,
      success: true,
    });
  } catch (error) {
    console.error("Server Error", error);
    res.status(500).json({ error: "Server Error" });
  }
}

async function getStudentWeeklySchedule(req, res) {
  try {
    const userId = req.params.id;
    const { departmentId, year, semester } = req.query;

    const infos = await StudentContract.methods
      .getStudentCourses(
        userId,
        departmentId,
        year,
        semester
      )
      .call();

    const sanitizedInfos = infos.map((info) => {
      return {
        id: Number(info.id),
        courseId: Number(info.courseId),
        schedules: info.schedules,
        year: Number(info.year),
        semester: Number(info.semester),
        isActive: info.isActive ? 1 : 0,
        name: info.courseName,
        departmentId: Number(info.departmentId),
        capacity: Number(info.capacity),
        credit: Number(info.credit), 
        gradingRules: info.gradingRules,
        code: info.code,
        studentStatus: info.studentStatus,
        absentee: info.absentee ? 1 : 0,
        midtermGrade: Number(info.midtermGrade),
        finalGrade: Number(info.finalGrade),
        makeupExamGrade: Number(info.makeupExamGrade),
        letterGrade: info.letterGrade,
        studentCourseInfoId: Number(info.studentCourseInfoId),
        location: info.location,
      };
    }).filter(info => info.courseId !== 0)
    .filter(course => course.studentStatus === StudentCourseStatus.APPROVED);

    res.status(200).json({
      data: getWeeklySchedule(sanitizedInfos),
      message: MESSAGES.STUDENT_WEEKLY_SCHEDULE_GET_SUCCESS,
      success: true,
    });
  } catch (error) {
    console.error("Server Error", error);
    res.status(500).json({ error: "Server Error" });
  }
}

async function bringTranscript(req, res) {
  try {
    const userId = req.params.id;
    const { departmentId } = req.query;

    const infos = await StudentContract.methods
      .getStudentCourses(
        userId,
        departmentId,
      )
      .call();

    const sanitizedInfos = infos.map((info) => {
      return {
        id: Number(info.id),
        courseId: Number(info.courseId),
        schedules: info.schedules,
        year: Number(info.year),
        semester: Number(info.semester),
        isActive: info.isActive ? 1 : 0,
        name: info.courseName,
        departmentId: Number(info.departmentId),
        capacity: Number(info.capacity),
        credit: Number(info.credit), 
        gradingRules: info.gradingRules,
        code: info.code,
        studentStatus: info.studentStatus,
        absentee: info.absentee ? 1 : 0,
        midtermGrade: Number(info.midtermGrade),
        finalGrade: Number(info.finalGrade),
        makeupExamGrade: Number(info.makeupExamGrade),
        letterGrade: info.letterGrade,
        studentCourseInfoId: Number(info.studentCourseInfoId),
      };
    })
    .filter(info => info.courseId !== 0)
    .filter(course => course.studentStatus === StudentCourseStatus.APPROVED)
    .reduce((acc, current) => {
      const existing = acc.find(item => item.courseId === current.courseId);
      if (!existing || existing.id < current.id) {
        return acc.filter(item => item.courseId !== current.courseId).concat(current);
      }
      return acc;
    }, []);

    const info = calculateInfo(sanitizedInfos);

    const groupedCourses = sanitizedInfos.reduce((acc, course) => {
      const key = `${course.year}-${getSemesterKey(course.semester, 'label')}`;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(course);
      return acc;
    }, {});

    res.status(200).json({
      data: {
        transcript: groupedCourses,
        summary: info
      },
      total: groupedCourses.length,
      message: MESSAGES.USER_TRANSCRIPT_GET_SUCCESS,
      success: true,
    });
  } catch (error) {
    console.error("Server Error", error);
    res.status(500).json({ error: "Server Error" });
  }
}

async function getStudentExams(req, res) {
  try {
    const userId = req.params.id;
    const { departmentId, year, semester } = req.query;

    const exams = await ExamContract.methods
      .getStudentExams(
        userId,
        departmentId,
        year,
        semester
      )
      .call();

    const sanitizedExams = exams.map((exam) => {
      return {
        id: Number(exam.id),
        courseId: Number(exam.courseId),
        openedCourseId: Number(exam.openedCourseId),
        departmentId: Number(exam.departmentId),
        examType: exam.examType,
        startTime: unixTimeStampToDateTime(exam.startTime.toString()),
        endTime: unixTimeStampToDateTime(exam.endTime.toString()),
        location: exam.location,
        courseName: exam.courseName,
        code: exam.code,
        year: Number(exam.year),
        semester: Number(exam.semester),
      };
    }).filter(exam => exam.id !== 0);

    res.status(200).json({
      data: sanitizedExams,
      total: sanitizedExams.length,
      message: MESSAGES.STUDENT_EXAMS_GET_SUCCESS,
      success: true,
    });
  } catch (error) {
    console.error("Server Error", error);
    res.status(500).json({ error: "Server Error" });
  }
}

async function getTeacherWeeklySchedule(req, res) {
  try {
    const userId = req.params.id;
    const { departmentId, year, semester } = req.query;

    const infos = await TeacherContract.methods
      .getTeacherCourses(
        userId,
        departmentId,
        year,
        semester
      )
      .call();

    const sanitizedInfos = infos.map((info) => {
      return {
        id: Number(info.id),
        courseId: Number(info.courseId),
        schedules: info.schedules,
        year: Number(info.year),
        semester: Number(info.semester),
        isActive: info.isActive ? 1 : 0,
        name: info.courseName,
        departmentId: Number(info.departmentId),
        capacity: Number(info.capacity),
        credit: Number(info.credit), 
        gradingRules: info.gradingRules,
        code: info.code,
        studentStatus: info.studentStatus,
        absentee: info.absentee ? 1 : 0,
        midtermGrade: Number(info.midtermGrade),
        finalGrade: Number(info.finalGrade),
        makeupExamGrade: Number(info.makeupExamGrade),
        letterGrade: info.letterGrade,
        studentCourseInfoId: Number(info.studentCourseInfoId),
        location: info.location,
      };
    }).filter(info => info.courseId !== 0);

    res.status(200).json({
      data: getWeeklySchedule(sanitizedInfos),
      message: MESSAGES.STUDENT_WEEKLY_SCHEDULE_GET_SUCCESS,
      success: true,
    });
  } catch (error) {
    console.error("Server Error", error);
    res.status(500).json({ error: "Server Error" });
  }
}

async function getTeacherExams(req, res) {
  try {
    const userId = req.params.id;
    const { departmentId, year, semester } = req.query;

    const exams = await ExamContract.methods
      .getTeacherExams(
        userId,
        departmentId,
        year,
        semester
      )
      .call();

    const sanitizedExams = exams.map((exam) => {
      return {
        id: Number(exam.id),
        courseId: Number(exam.courseId),
        openedCourseId: Number(exam.openedCourseId),
        departmentId: Number(exam.departmentId),
        examType: exam.examType,
        startTime: unixTimeStampToDateTime(exam.startTime.toString()),
        endTime: unixTimeStampToDateTime(exam.endTime.toString()),
        location: exam.location,
        courseName: exam.courseName,
        code: exam.code,
        year: Number(exam.year),
        semester: Number(exam.semester),
      };
    }).filter(exam => exam.id !== 0);

    res.status(200).json({
      data: sanitizedExams,
      total: sanitizedExams.length,
      message: MESSAGES.TEACHER_EXAMS_GET_SUCCESS,
      success: true,
    });
  } catch (error) {
    console.error("Server Error", error);
    res.status(500).json({ error: "Server Error" });
  }
}

module.exports = {
  getAllUsers,
  getUser,
  approveUser,
  changeRole,
  getCourses,
  getStudentDepartments,
  getTeacherDepartments,
  selectCourse,
  getTeacherCourses,
  getTeacherGivenCourses,
  getAdvisorStudents,
  getAcademicInfos,
  updateAcademicInfos,
  updateDepartmentActivity,
  getDepartmentActivity,
  deleteAcademicInfos,
  getStudentWeeklySchedule,
  bringTranscript,
  getStudentExams,
  getTeacherWeeklySchedule,
  getTeacherExams,
};
