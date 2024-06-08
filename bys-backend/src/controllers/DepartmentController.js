// DepartmentController.js

const { MESSAGES } = require("../Constants/MessageConstant.js");
const DepartmentContract = require("../Blockchain/Contracts/Department/DepartmentContract.js");
const {
  accountAddress,
  FacultyContractAddress,
} = require("../Constants/contractConstants.js");
const CourseContract = require("../Blockchain/Contracts/Course/CourseContract.js");
const DepartmentOpenedCourseContract = require("../Blockchain/Contracts/Department/DepartmentOpenedCourseContract.js");
const TeacherContract = require("../Blockchain/Contracts/User/TeacherContract.js");
const StudentContract = require("../Blockchain/Contracts/User/StudentContract.js");
const ExamContract = require("../Blockchain/Contracts/Exam/ExamContract.js");
const { unixTimeStampToDateTime, getDepartmentWalletAddress, decrypt } = require("../Utils/utils.js");
const SenderCheckerContract = require("../Blockchain/Contracts/SenderChecker/SenderCheckerContract.js");

async function createDepartment(req, res) {
  const {
    name = "",
    email = "",
    phone_number = "",
    location = "",
    faculty_id = 0,
    degree_level = "",
    wallet_address = ""
  } = req.body;

  try {
    await DepartmentContract.methods
      .addDepartment(name, faculty_id, email, phone_number, location, degree_level, wallet_address)
      .send({ from: accountAddress, gas: 500000 });

    await SenderCheckerContract.methods
      .addAllowedSender(wallet_address)
      .send({ from: accountAddress, gas: 500000 });

    res.status(200).json({
      message: MESSAGES.DEPARTMENT_CREATE_SUCCESS,
      success: true,
    });
  } catch (error) {
    console.error("Server Error", error);
    res.status(500).json({ error: "Server Error" });
  }
}

async function getDepartment(req, res) {
  try {
    const departmentId = req.params.id;

    const department = await DepartmentContract.methods
      .getDepartmentWithFaculty(departmentId, FacultyContractAddress)
      .call();

    const data = {
      name: department["0"],
      facultyId: department["1"].toString(),
      facultyName: department["2"],
      email: department["3"],
      phoneNumber: department["4"],
      location: department["5"],
      degree_level: department["6"]
    };

    res.status(200).json({
      message: MESSAGES.DEPARTMENT_GET_SUCCESS,
      success: true,
      data: data,
    });
  } catch (error) {
    console.error("Server Error", error);
    res.status(500).json({ error: "Server Error" });
  }
}

async function updateDepartment(req, res) {
  const departmentId = req.params.id;
  const {
    name = "",
    email = "",
    phone_number = "",
    location = "",
    faculty_id = 0,
    degree_level = "",
    wallet_address = ""
  } = req.body;

  try {
    await DepartmentContract.methods
      .updateDepartment(
        departmentId,
        name,
        faculty_id,
        email,
        phone_number,
        location,
        degree_level,
        wallet_address
      )
      .send({ from: accountAddress, gas: 500000 });

    await SenderCheckerContract.methods
      .addAllowedSender(wallet_address)
      .send({ from: accountAddress, gas: 500000 });

    res.status(200).json({
      message: MESSAGES.DEPARTMENT_UPDATE_SUCCESS,
      success: true,
    });
  } catch (error) {
    console.error("Server Error", error);
    res.status(500).json({ error: "Server Error" });
  }
}

async function getAllDepartments(req, res) {
  try {
    const departmentInfo = await DepartmentContract.methods
      .getAllDepartments()
      .call();

    const sanitizedDepartmentInfo = departmentInfo.map((department) => {
      return {
        id: department.departmentId.toString(),
        name: department.name,
        email: department.email,
        phone_number: department.phoneNumber,
        location: department.location,
        faculty_id: department.facultyId.toString(),
        degree_level: department.degree_level
      };
    });

    res.status(200).json({
      data: sanitizedDepartmentInfo,
      total: sanitizedDepartmentInfo.length,
      message: MESSAGES.DEPARTMENT_INDEX_SUCCESS,
      success: true,
    });
  } catch (error) {
    console.error("Server Error", error);
    res.status(500).json({ error: "Server Error" });
  }
}

async function getCourses(req, res) {
  try {
    const departmentId = req.params.id;

    const courses = await CourseContract.methods
      .getCoursesByDepartment(departmentId)
      .call();

    const sanitizedCourses = courses.map((course) => {
      return {
        id: course.courseId.toString(),
        name: course.name,
        code: course.code,
        schedules: course.schedules,
        capacity: Number(course.capacity),
        credit: Number(course.credit),
        is_active: course.isActive ? 1 : 0,
      };
    });

    res.status(200).json({
      data: sanitizedCourses,
      total: sanitizedCourses.length,
      message: MESSAGES.DEPARTMENT_COURSE_INDEX_SUCCESS,
      success: true,
    });
  } catch (error) {
    console.error("Server Error", error);
    res.status(500).json({ error: "Server Error" });
  }
}

async function getOpenedCourses(req, res) {
  try {
    const { is_active = 1 } = req.query;
    const departmentId = req.params.id;

    const courses = await DepartmentOpenedCourseContract.methods
      .getOpenedCoursesByDepartment(departmentId, is_active)
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
        teacherIds: course.teacherIds.map(Number),
        gradingRules: course.gradingRules,
        location: course.location,
      };
    });

    res.status(200).json({
      data: sanitizedCourses,
      total: sanitizedCourses.length,
      message: MESSAGES.DEPARTMENT_OPENED_COURSE_INDEX_SUCCESS,
      success: true,
    });
  } catch (error) {
    console.error("Server Error", error);
    res.status(500).json({ error: "Server Error" });
  }
}

async function getTeachers(req, res) {
  try {
    const departmentId = req.params.id;

    const teachers = await TeacherContract.methods
      .getTeachersByDepartment(departmentId)
      .call();

      const sanitizedTeachers = teachers.map((teacher) => {
      return {
        userId: Number(teacher.userId),
        name: decrypt(teacher.name),
        surname: decrypt(teacher.surname),
        fullName: `${decrypt(teacher.name)} ${decrypt(teacher.surname)}`,
        number: decrypt(teacher.number),
        mail: decrypt(teacher.mail),
        phone: decrypt(teacher.phone),
        roles: teacher.roles,
      };
    }).filter(teacher => teacher.userId !== 0);

    res.status(200).json({
      data: sanitizedTeachers,
      total: sanitizedTeachers.length,
      message: MESSAGES.DEPARTMENT_TEACHER_INDEX_SUCCESS,
      success: true,
    });
  } catch (error) {
    console.error("Server Error", error);
    res.status(500).json({ error: "Server Error" });
  }
}

async function getStudents(req, res) {
  try {
    const { is_active = 1 } = req.query;
    const departmentId = req.params.id;

    const students = await StudentContract.methods
      .getStudentsByDepartment(departmentId, is_active)
      .call();

      const sanitizedStudents = students.map((student) => {
        return {
          userId: Number(student.userId),
          name: decrypt(student.name),
          surname: decrypt(student.surname),
          number: decrypt(student.number),
          mail: decrypt(student.mail),
          phone: decrypt(student.phone),
          roles: student.roles,
        };
      }).filter(student => student.userId !== 0);
  
      res.status(200).json({
        data: sanitizedStudents,
        total: sanitizedStudents.length,
        message: MESSAGES.DEPARTMENT_STUDENT_INDEX_SUCCESS,
        success: true,
      });
  } catch (error) {
    console.error("Server Error", error);
    res.status(500).json({ error: "Server Error" });
  }
}

async function getExams(req, res) {
  try {
    const departmentId = req.params.id;
    const { year, semester } = req.query;

    const exams = await ExamContract.methods
      .getExamsByDepartmentId(
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
      message: MESSAGES.DEPARTMENT_EXAMS_GET_SUCCESS,
      success: true,
    });
  } catch (error) {
    console.error("Server Error", error);
    res.status(500).json({ error: "Server Error" });
  }
}

module.exports = {
  createDepartment,
  getDepartment,
  updateDepartment,
  getAllDepartments,
  getCourses,
  getOpenedCourses,
  getTeachers,
  getStudents,
  getExams,
};
