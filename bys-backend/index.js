const express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
const refactoreController = require("./src/Refactore/RefactoreController");
const userController = require("./src/controllers/UserController");
const facultyController = require("./src/controllers/FacultyController");
const departmentController = require("./src/controllers/DepartmentController");
const courseController = require("./src/controllers/CourseController");
const examController = require("./src/controllers/ExamController");
const authController = require("./src/controllers/AuthController");
const authenticateToken = require("./middleware/authenticateToken");
const authorizeRole = require("./middleware/authorizeRole");

const app = express();
const port = 8000;

app.use(cors());
app.use(bodyParser.json());

// Endpoints

app.post("/login", authController.login);
app.post("/logout", authController.logout);
app.post("/register", authController.register);

app.use(authenticateToken);

app.get("/users", authorizeRole(['Admin']), userController.getAllUsers);
app.get("/user/:id", userController.getUser);
app.post("/user/:id/approve", authorizeRole(['Admin']), userController.approveUser);
app.post("/user/:id/change-role", authorizeRole(['Admin']), userController.changeRole);

app.get("/student/:id/courses", userController.getCourses);
app.get("/student/:id/departments", userController.getStudentDepartments);
app.post("/student/:id/course-selection", userController.selectCourse);
app.get("/student/:id/academic-infos", userController.getAcademicInfos);
app.get("/student/:id/weekly-schedule", userController.getStudentWeeklySchedule);
app.get("/student/:id/transcript", userController.bringTranscript);
app.get("/student/:id/exams", userController.getStudentExams);
app.post("/student/:id/activity", authorizeRole(['Admin']), userController.updateDepartmentActivity);
app.get("/student/:id/activity", userController.getDepartmentActivity);
app.put("/student-course-info/:id", authorizeRole(['Teacher', 'Admin']), userController.updateAcademicInfos);
app.delete("/student-course-info/:id", authorizeRole(['Teacher', 'Admin']), userController.deleteAcademicInfos);

app.get("/teacher/:id/departments", userController.getTeacherDepartments);
app.get("/teacher/:id/courses", userController.getTeacherCourses);
app.get("/teacher/:id/given-courses", userController.getTeacherGivenCourses);
app.get("/teacher/:id/weekly-schedule", userController.getTeacherWeeklySchedule);
app.get("/teacher/:id/exams", userController.getTeacherExams);
app.get("/advisor/:id/students", userController.getAdvisorStudents);

app.get("/course/:id", courseController.getCourse);
app.put("/course/:id", authorizeRole(['Admin']), courseController.updateCourse);
app.post("/course/create", authorizeRole(['Admin']), courseController.createCourse);
app.post("/course/:id/create-event", courseController.createPost);
app.get("/course/:id/events", courseController.getPosts);

app.put("/course-selection/:id/change-status", courseController.changeCourseSelectionStatus);
app.get("/course-selection/activity", courseController.getCourseSelectionActivity);
app.patch("/course-selection/activity", authorizeRole(['Admin']), courseController.toggleCourseSelectionActivity);

app.get("/opened-course/:id", courseController.getOpenedCourse);
app.post("/opened-course/create", authorizeRole(['Admin']), courseController.createOpenedCourse);
app.put("/opened-course/:id/update", authorizeRole(['Admin']), courseController.updateOpenedCourse);
app.get("/opened-course/:id/students", courseController.getCourseStudents);
app.post("/opened-course/:id/grading-rules", authorizeRole(['Admin', 'Teacher']), courseController.updateGradingRules);

app.post("/exam/create", authorizeRole(['Admin']), examController.createExam);
app.put("/exam/:id", authorizeRole(['Admin']), examController.updateExam);
app.delete("/exam/:id", authorizeRole(['Admin']), examController.deleteExam);

app.get("/faculty/:id", facultyController.getFaculty);
app.post("/faculty/create", authorizeRole(['Admin']), facultyController.createFaculty);
app.put("/faculty/:id", authorizeRole(['Admin']), facultyController.updateFaculty);
app.get("/faculty/:id/departments", facultyController.getDepartments);
app.get("/faculties", authorizeRole(['Admin']), facultyController.getAllFaculties);

app.post("/department/create", authorizeRole(['Admin']), departmentController.createDepartment);
app.get("/department/:id", departmentController.getDepartment);
app.put("/department/:id", authorizeRole(['Admin']), departmentController.updateDepartment);
app.get("/department/:id/courses", authorizeRole(['Admin']), departmentController.getCourses);
app.get("/department/:id/opened-course", authorizeRole(['Admin', 'Student']), departmentController.getOpenedCourses);
app.get("/department/:id/teachers", authorizeRole(['Admin']), departmentController.getTeachers);
app.get("/department/:id/students", authorizeRole(['Admin']), departmentController.getStudents);
app.get("/department/:id/exams", authorizeRole(['Admin']), departmentController.getExams);
app.get("/departments", authorizeRole(['Admin']), departmentController.getAllDepartments);

app.listen(port, () => {
  // refactoreController.addTempRecords();
  console.log(`Example app listening on port ${port}`);
});
