import CourseDetail from '../Components/pages/Course/CourseDetail';
import CourseSelection from '../Components/pages/Course/CourseSelection';
import GivenCourses from '../Components/pages/Course/GivenCourses';
import ReviewCourseSelection from '../Components/pages/Course/ReviewCourseSelection';
import Dashboard from '../Components/pages/Dashboard/Dashboard';
import DepartmentDetail from '../Components/pages/Department/DepartmentDetail';
import Departments from '../Components/pages/Department/Departments';
import FacultyList from '../Components/pages/Faculty/FacultyList';
import StudentAcademicInfos from '../Components/pages/Student/StudentAcademicInfos';
import StudentExams from '../Components/pages/Student/StudentExams';
import StudentTranscript from '../Components/pages/Student/StudentTranscript';
import StudentWeeklySchedule from '../Components/pages/Student/StudentWeeklySchedule';
import MentoredStudents from '../Components/pages/Teacher/MentoredStudents';
import TeacherExams from '../Components/pages/Teacher/TeacherExams';
import TeacherWeeklySchedule from '../Components/pages/Teacher/TeacherWeeklySchedule';
import UserList from '../Components/pages/User/UserList';
import {URL} from '../Constants/urlConstants';

const MainRoute = [
  {
    path: URL.DEFAULT_PATH,
    exact: true,
    auth: true,
    component: Dashboard
  },
  {
    path: URL.HOME,
    exact: true,
    auth: true,
    component: Dashboard
  },
  {
    path: URL.OPENED_COURSE + '/:id',
    exact: true,
    auth: true,
    component: CourseDetail
  },
  {
    path: URL.USERS,
    exact: true,
    auth: true,
    component: UserList
  },
  {
    path: URL.FACULTIES,
    exact: true,
    auth: true,
    component: FacultyList
  },
  {
    path: URL.DEPARTMENTS,
    exact: true,
    auth: true,
    component: Departments
  },
  {
    path: URL.DEPARTMENTS + '/:id',
    exact: true,
    auth: true,
    component: DepartmentDetail
  },
  {
    path: URL.COURSES + URL.SELECTION,
    exact: true,
    auth: true,
    component: CourseSelection
  },
  {
    path: URL.COURSES + URL.REVIEW_SELECTIONS,
    exact: true,
    auth: true,
    component: ReviewCourseSelection
  },
  {
    path: URL.COURSES + URL.GIVEN,
    exact: true,
    auth: true,
    component: GivenCourses
  },
  {
    path: URL.STUDENT + URL.COURSES,
    exact: true,
    auth: true,
    component: StudentAcademicInfos
  },
  {
    path: URL.STUDENT + URL.TRANSCRIPT,
    exact: true,
    auth: true,
    component: StudentTranscript
  },
  {
    path: URL.STUDENT + URL.WEEKLY_SCHEDULE,
    exact: true,
    auth: true,
    component: StudentWeeklySchedule
  },
  {
    path: URL.STUDENT + URL.EXAMS,
    exact: true,
    auth: true,
    component: StudentExams
  },
  {
    path: URL.TEACHER + URL.MENTORED_STUDENTS,
    exact: true,
    auth: true,
    component: MentoredStudents
  },
  {
    path: URL.TEACHER + URL.WEEKLY_SCHEDULE,
    exact: true,
    auth: true,
    component: TeacherWeeklySchedule
  },
  {
    path: URL.TEACHER + URL.EXAMS,
    exact: true,
    auth: true,
    component: TeacherExams
  },
];

export default MainRoute;
