import { components } from "react-select";
import AddCourseModal from "../Components/modals/Course/AddCourseModal";
import AddOpenedCourseModal from "../Components/modals/Course/AddOpenedCourseModal";
import ShowCourseStudentsModal from "../Components/modals/Course/ShowCourseStudentsModal";
import UpdateCourseModal from "../Components/modals/Course/UpdateCourseModal";
import UpdateOpenedCourseModal from "../Components/modals/Course/UpdateOpenedCourseModal";
import AddDepartmentModal from "../Components/modals/Department/AddDepartmentModal";
import UpdateDepartmentModal from "../Components/modals/Department/UpdateDepartmentModal";
import AddExamModal from "../Components/modals/Exam/AddExamModal";
import AddFacultyModal from "../Components/modals/Faculty/AddFacultyModal";
import UpdateFacultyModal from "../Components/modals/Faculty/UpdateFacultyModal";
import ShowStudentAcademicInfosModal from "../Components/modals/User/ShowStudentAcademicInfosModal";
import ShowStudentTranscriptModal from "../Components/modals/User/ShowStudentTranscriptModal";
import UpdateExamModal from "../Components/modals/Exam/UpdateExamModal";
import ShowApproveUserModal from "../Components/modals/User/ShowApproveUserModal";
import AddDepartmentUserModal from "../Components/modals/Department/AddDepartmentUserModal";
import ShowWarningMessageModal from "../Components/modals/common/ShowWarningMessageModal";
import UpdateOpenedCourseGradingRulesModal from "../Components/modals/Course/UpdateOpenedCourseGradingRulesModal";

export const modalRoute = [
  {
    name: "UpdateFacultyModal",
    component: UpdateFacultyModal,
  },
  {
    name: "AddFacultyModal",
    component: AddFacultyModal,
  },
  {
    name: "UpdateDepartmentModal",
    component: UpdateDepartmentModal,
  },
  {
    name: "AddDepartmentModal",
    component: AddDepartmentModal,
  },
  {
    name: "AddCourseModal",
    component: AddCourseModal,
  },
  {
    name: "UpdateCourseModal",
    component: UpdateCourseModal,
  },
  {
    name: "AddOpenedCourseModal",
    component: AddOpenedCourseModal,
  },
  {
    name: "UpdateOpenedCourseModal",
    component: UpdateOpenedCourseModal,
  },
  {
    name : "ShowStudentAcademicInfosModal",
    component: ShowStudentAcademicInfosModal,
  },
  {
    name: "ShowCourseStudentsModal",
    component: ShowCourseStudentsModal
  },
  {
    name : "ShowStudentTranscriptModal",
    component: ShowStudentTranscriptModal,
  },
  {
    name : "AddExamModal",
    component: AddExamModal,
  },
  {
    name : "UpdateExamModal",
    component: UpdateExamModal,
  },
  {
    name: "ShowApproveUserModal",
    component: ShowApproveUserModal,
  },
  {
    name: "AddDepartmentUserModal",
    component: AddDepartmentUserModal,
  },
  {
    name: "ShowWarningMessageModal",
    component: ShowWarningMessageModal
  },
  {
    name: "UpdateOpenedCourseGradingRulesModal",
    component: UpdateOpenedCourseGradingRulesModal
  }
];
export default modalRoute;
