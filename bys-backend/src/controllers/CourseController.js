// CourseController.js

const {
  accountAddress,
  UserContractAddress,
  CourseContractAddress,
  DepartmentContractAddress,
} = require("../Constants/contractConstants.js");
const { MESSAGES } = require("../Constants/MessageConstant.js");
const CourseContract = require("../Blockchain/Contracts/Course/CourseContract.js");
const PostContract = require("../Blockchain/Contracts/Post/PostContract.js");
const { unixTimeStampToDateTime, getDepartmentWalletAddress, decrypt, isEmpty } = require("../Utils/utils.js");
const OpenedCourseContract = require("../Blockchain/Contracts/Course/OpenedCourseContract.js");
const StudentCourseInfoContract = require("../Blockchain/Contracts/CourseStudent/StudentCourseInfoContract.js");

async function createCourse(req, res) {
  const { name, code = '', departmentId, capacity = 0, credit = 0 } = req.body;

  try {
    const departmentWalletAddress = await getDepartmentWalletAddress(departmentId);
   
    await CourseContract.methods
      .addCourse(name, code, departmentId, capacity, credit)
      .send({ from: departmentWalletAddress, gas: 500000 });

    res.status(200).json({
      message: MESSAGES.COURSE_CREATE_SUCCESS,
      success: true,
    });
  } catch (error) {
    console.error("Server Error", error);
    res.status(500).json({ error: "Server Error" });
  }
}

async function updateCourse(req, res) {
  const courseId = req.params.id;
  const { name, code = '', capacity = 0, credit = 0, departmentId } = req.body;

  try {
    const departmentWalletAddress = await getDepartmentWalletAddress(departmentId);

    await CourseContract.methods
      .updateCourse(courseId, name, code, capacity, credit)
      .send({ from: departmentWalletAddress, gas: 500000 });

    res.status(200).json({
      message: MESSAGES.COURSE_UPDATE_SUCCESS,
      success: true,
    });
  } catch (error) {
    console.error("Server Error", error);
    res.status(500).json({ error: "Server Error" });
  }
}

async function getCourse(req, res) {
  try {
    const courseId = req.params.id;

    const course = await CourseContract.methods
      .getCourse(courseId)
      .call();

    const data = {
      id: Number(course.id),
      courseId: Number(course.courseId),
      schedules: course.schedules,
      year: Number(course.year),
      semester: Number(course.semester),
      isActive: course.isActive ? 1 : 0,
      courseName: course.courseName,
      departmentId: Number(course.departmentId),
      capacity: Number(course.capacity),
      credit: Number(course.credit), 
      code: course.code,
    };  

    res.status(200).json({
      message: MESSAGES.COURSE_GET_SUCCESS,
      success: true,
      data: data,
    });
  } catch (error) {
    console.error("Server Error", error);
    res.status(500).json({ error: "Server Error" });
  }
}

async function createOpenedCourse(req, res) {
  const { courseId, schedules, year, semester, grading_rules = '', location = '', departmentId} = req.body;

  try {
    const departmentWalletAddress = await getDepartmentWalletAddress(departmentId);

    await OpenedCourseContract.methods
      .addOpenedCourse(
        courseId,
        schedules,
        year,
        semester,
        grading_rules,
        location
      )
      .send({ from: departmentWalletAddress, gas: 500000 });

    res.status(200).json({
      message: MESSAGES.OPENED_COURSE_CREATE_SUCCESS,
      success: true,
    });
  } catch (error) {
    console.error("Server Error", error);
    res.status(500).json({ error: "Server Error" });
  }
}

async function updateOpenedCourse(req, res) {
  const courseId = req.params.id;
  const { schedules, year, semester, is_active, grading_rules = "", teacher_ids, location = '', departmentId } = req.body;

  try {
    const departmentWalletAddress = await getDepartmentWalletAddress(departmentId);

    await OpenedCourseContract.methods
      .updateOpenedCourse(
        courseId,
        schedules,
        year,
        semester,
        is_active,
        grading_rules,
        location)
        .send({ from: departmentWalletAddress, gas: 500000 });

    await OpenedCourseContract.methods
      .setTeacherIds(
        courseId,
        teacher_ids
      ).send({ from: accountAddress, gas: 500000 });

    res.status(200).json({
      message: MESSAGES.OPENED_COURSE_UPDATE_SUCCESS,
      success: true,
    });
  } catch (error) {
    console.error("Server Error", error);
    res.status(500).json({ error: "Server Error" });
  }
}

async function updateGradingRules(req, res) {
  const courseId = req.params.id;
  const { grading_rules, departmentId } = req.body;

  try {
    const departmentWalletAddress = await getDepartmentWalletAddress(departmentId);

    await OpenedCourseContract.methods
      .setGradingRules(
        courseId,
        grading_rules
        )
        .send({ from: departmentWalletAddress, gas: 500000 });

    res.status(200).json({
      message: MESSAGES.OPENED_COURSE_UPDATE_SUCCESS,
      success: true,
    });
  } catch (error) {
    console.error("Server Error", error);
    res.status(500).json({ error: "Server Error" });
  }
}

async function getOpenedCourse(req, res) {
  try {
    const courseId = req.params.id;

    const course = await OpenedCourseContract.methods
      .getOpenedCourseDetail(courseId)
      .call();

    const data = {
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
      location: course.location,
    };

    res.status(200).json({
      message: MESSAGES.OPENED_COURSE_GET_SUCCESS,
      success: true,
      data: data,
    });
  } catch (error) {
    console.error("Server Error", error);
    res.status(500).json({ error: "Server Error" });
  }
}

async function getCoursesByTeacher(req, res) {
  try {
    const teacherId = req.params.id;

    const courses = await CourseContract.methods
      .getCoursesByTeacher(teacherId, DepartmentContractAddress)
      .call();

    const data = courses.map((course) => {
      return {
        course_id: course.courseId.toString(),
        department_id: course.departmentId.toString(),
        teacher_id: course.teacherId.toString(),
        name: course.name,
        capacity: course.capacity.toString(),
        credit: course.credit.toString(),
        isActive: course.isActive,
      };
    });

    res.status(200).json({
      message: MESSAGES.COURSE_GET_SUCCESS,
      success: true,
      data: data,
    });
  } catch (error) {
    console.error("Server Error", error);
    res.status(500).json({ error: "Server Error" });
  }
}

async function createPost(req, res) {
  const { userId, body } = req.body;
  const courseId = req.params.id;

  try {
    await PostContract.methods
      .addPost(userId, body, courseId)
      .send({ from: accountAddress, gas: 500000 });

    res.status(200).json({
      message: MESSAGES.POST_CREATE_SUCCESS,
      success: true,
    });
  } catch (error) {
    console.error("Server Error", error);
    res.status(500).json({ error: "Server Error" });
  }
}

async function getPosts(req, res) {
  try {
    const courseId = req.params.id;

    const posts = await PostContract.methods
      .getPostsByCourse(courseId, UserContractAddress)
      .call();
    const data = posts.map((post) => {
      return {
        body: post.body,
        user_name: !isEmpty(post.user_name) ? decrypt(post.user_name.split(' ')[0]) + " " + decrypt(post.user_name.split(' ')[1]) : '',
        created_at: unixTimeStampToDateTime(post.created_at.toString()),
        course_id: post.course_id.toString(),
      };
    }).filter(post => post.body !== '');

    res.status(200).json({
      message: MESSAGES.POST_GET_SUCCESS,
      success: true,
      data: data,
    });
  } catch (error) {
    res.status(500).json({ error: "Server Error:" + error });
  }
}

async function changeCourseSelectionStatus(req, res) {
  try {
    const selectionId = req.params.id;
    const { status, departmentId } = req.body;
    const departmentWalletAddress = await getDepartmentWalletAddress(departmentId);

    await StudentCourseInfoContract.methods
      .updateStudentCourseInfoStatus(selectionId, status)
      .send({ from: departmentWalletAddress, gas: 500000 });

    res.status(200).json({
      message: MESSAGES.STUDENT_COURSE_SELECTION_UPDATE_STATUS_SUCCESS,
      success: true,
    });
  } catch (error) {
    console.error("Server Error", error);
    res.status(500).json({ error: "Server Error" });
  }
}

async function getCourseSelectionActivity(req, res) {
  try {
    const isActive = await StudentCourseInfoContract.methods
      .getContractIsActive()
      .call();

      res.status(200).json({
        data: isActive,
        message: MESSAGES.SUCCESS,
        success: true,
      });
  } catch (error) {
    console.error("Server Error", error);
    res.status(500).json({ error: "Server Error" });
  }
}

async function toggleCourseSelectionActivity(req, res) {
  try {
    await StudentCourseInfoContract.methods
      .toggleContractActive()
      .send({ from: accountAddress, gas: 500000 });

      res.status(200).json({
        message: MESSAGES.SUCCESS,
        success: true,
      });
  } catch (error) {
    console.error("Server Error", error);
    res.status(500).json({ error: "Server Error" });
  }
}

async function getCourseStudents(req, res) {
  try {
    const openedCourseId = req.params.id;

    const students = await StudentCourseInfoContract.methods
      .getStudentCourseInfos(openedCourseId)
      .call();

    const sanitizedStudents = students.map((student) => {
      return {
        studentName: !isEmpty(student.studentName) ? decrypt(student.studentName.split(' ')[0]) + " " + decrypt(student.studentName.split(' ')[1]) : '',
        number: decrypt(student.studentNumber),
        id: Number(student.id),
        courseId: Number(student.courseId),
        isActive: student.isActive ? 1 : 0,
        departmentId: Number(student.departmentId),
        studentStatus: student.studentStatus,
        absentee: student.absentee ? 1 : 0,
        midtermGrade: Number(student.midtermGrade),
        finalGrade: Number(student.finalGrade),
        makeupExamGrade: Number(student.makeupExamGrade),
        letterGrade: student.letterGrade,
        studentCourseInfoId: Number(student.studentCourseInfoId),
        gradingRules: student.gradingRules,
      };
    }).filter(student => student.id !== 0);

    res.status(200).json({
      data: sanitizedStudents,
      total: sanitizedStudents.length,
      message: MESSAGES.OPENED_COURSE_STUDENTS_GET_SUCCESS,
      success: true,
    });
  } catch (error) {
    console.error("Server Error", error);
    res.status(500).json({ error: "Server Error" });
  }
}

module.exports = {
  createCourse,
  updateCourse,
  getCourse,
  createOpenedCourse,
  updateOpenedCourse,
  updateGradingRules,
  getOpenedCourse,
  getCoursesByTeacher,
  createPost,
  getPosts,
  changeCourseSelectionStatus,
  getCourseSelectionActivity,
  toggleCourseSelectionActivity,
  getCourseStudents,
};
