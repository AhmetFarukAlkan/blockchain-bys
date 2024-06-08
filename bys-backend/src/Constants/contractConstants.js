require('dotenv').config();

const secret = process.env.SECRET;
const accountAddress = process.env.ACCOUNT_ADDRESS;
const walletPrivateKey = process.env.WALLET_PRIVATE_KEY;
const SenderCheckerContractAddress = process.env.SENDER_CHECKER;
const CourseContractAddress = process.env.COURSE_CONTRACT_ADDRESS;
const OpenedCourseContractAddress = process.env.OPENED_COURSE_CONTRACT_ADDRESS;
const StudentCourseInfoContractAddress= process.env.STUDENT_COURSE_INFO_CONTRACT_ADDRESS;
const DepartmentContractAddress = process.env.DEPARTMENT_CONTRACT_ADDRESS;
const DepartmentOpenedCourseContractAddress = process.env.DEPARTMENT_OPENED_COURSE_CONTRACT_ADDRESS;
const FacultyContractAddress = process.env.FACULTY_CONTRACT_ADDRESS;
const PostContractAddress = process.env.POST_CONTRACT_ADDRESS;
const UserContractAddress = process.env.USER_CONTRACT_ADDRESS;
const TeacherContractAddress = process.env.TEACHER_CONTRACT_ADDRESS;
const StudentContractAddress = process.env.STUDENT_CONTRACT_ADDRESS;
const ExamContractAddress = process.env.EXAM_CONTRACT_ADDRESS;

module.exports = {
    secret,
    accountAddress,
    walletPrivateKey,
    SenderCheckerContractAddress,
    CourseContractAddress,
    OpenedCourseContractAddress,
    StudentCourseInfoContractAddress,
    DepartmentContractAddress,
    DepartmentOpenedCourseContractAddress,
    FacultyContractAddress,
    PostContractAddress,
    UserContractAddress,
    TeacherContractAddress,
    StudentContractAddress,
    ExamContractAddress
};
