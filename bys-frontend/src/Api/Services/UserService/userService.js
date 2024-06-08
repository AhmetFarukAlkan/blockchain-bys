import {API_SERVICE_METHOD} from '../../../common/constants/apiServiceMethods';
import {Tags} from '../../../common/constants/apiServiceTag.constant';
import {BACKEND_URL} from '../../../Constants/backendUrlConstants';
import {baseApi} from '../apiService';

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: ({id, query}) => ({
        url: `${BACKEND_URL.USER}/${id}`,
        method: API_SERVICE_METHOD.GET,
        data: {params: query}
      }),
    }),
    approveUser: builder.mutation({
      query: ({body, id}) => ({
        url: `${BACKEND_URL.USER}/${id}${BACKEND_URL.APPROVE}`,
        method: API_SERVICE_METHOD.POST,
        data: {body}
      }),
      invalidatesTags: (_, __, arg) => [
        {type: Tags.DEPARTMENT_TEACHERS},
        {type: Tags.DEPARTMENT_STUDENTS},
        {type: Tags.ADVISOR_STUDENTS},
      ]
    }),
    changeUserRole: builder.mutation({
      query: ({body, id}) => ({
        url: `${BACKEND_URL.USER}/${id}/${BACKEND_URL.CHANGE_ROLE}`,
        method: API_SERVICE_METHOD.POST,
        data: {body}
      }),
      invalidatesTags: (_, __, arg) => [
        {type: Tags.DEPARTMENT_TEACHERS},
        {type: Tags.DEPARTMENT_STUDENTS},
        {type: Tags.ADVISOR_STUDENTS},
      ]
    }),
    changeUserDepartmentActivity: builder.mutation({
      query: ({body, id}) => ({
        url: `${BACKEND_URL.STUDENT}/${id}${BACKEND_URL.ACTIVITY}`,
        method: API_SERVICE_METHOD.POST,
        data: {body}
      }),
      invalidatesTags: (_, __, arg) => [
        {type: Tags.DEPARTMENT_TEACHERS},
        {type: Tags.DEPARTMENT_STUDENTS},
        {type: Tags.USER_DEPARTMENT_ACTIVITY},
      ]
    }),
    getUserDepartmentActivity: builder.query({
      query: ({query, id}) => ({
        url: `${BACKEND_URL.STUDENT}/${id}${BACKEND_URL.ACTIVITY}`,
        method: API_SERVICE_METHOD.GET,
        data: {params: query}
      }),
      providesTags: (_result, _err, arg) => [
        {type: Tags.DEPARTMENT_TEACHERS},
        {type: Tags.DEPARTMENT_STUDENTS},
        {type: Tags.USER_DEPARTMENT_ACTIVITY}
      ]
    }),
    getStudentCourses: builder.query({
      query: ({query, id}) => ({
        url: `${BACKEND_URL.STUDENT}/${id}/${BACKEND_URL.COURSES}`,
        method: API_SERVICE_METHOD.GET,
        data: {params: query}
      }),
      providesTags: (_result, _err, arg) => [
        {type: Tags.STUDENT_ACADEMIC_INFO},
        {type: Tags.COURSE_STUDENTS}
      ]
    }),
    selectCourse: builder.mutation({
      query: ({body, id}) => ({
        url: `${BACKEND_URL.STUDENT}/${id}/${BACKEND_URL.COURSE_SELECTION}`,
        method: API_SERVICE_METHOD.POST,
        data: {body}
      }),
      invalidatesTags: (result, error, arg) => [
        {type: Tags.STUDENT_ACADEMIC_INFO},
        {type: Tags.COURSE_STUDENTS},
      ]
    }),
    getStudentDepartments: builder.query({
      query: ({id}) => ({
        url: `${BACKEND_URL.STUDENT}/${id}/${BACKEND_URL.DEPARTMENTS}`,
        method: API_SERVICE_METHOD.GET
      }),
    }),
    getTeacherDepartments: builder.query({
      query: ({id}) => ({
        url: `${BACKEND_URL.TEACHER}/${id}/${BACKEND_URL.DEPARTMENTS}`,
        method: API_SERVICE_METHOD.GET
      }),
    }),
    getTeacherCourses: builder.query({
      query: ({id, query}) => ({
        url: `${BACKEND_URL.TEACHER}/${id}/${BACKEND_URL.COURSES}`,
        method: API_SERVICE_METHOD.GET,
        data: {params: query}
      }),
      providesTags: (_result, _err, arg) => [{type: Tags.TEACHER_GIVEN_COURSES}]
    }),
    getTeacherGivenCourses: builder.query({
      query: ({id, query}) => ({
        url: `${BACKEND_URL.TEACHER}/${id}/${BACKEND_URL.GIVEN_COURSES}`,
        method: API_SERVICE_METHOD.GET,
        data: {params: query}
      }),
      providesTags: (_result, _err, arg) => [{type: Tags.TEACHER_GIVEN_COURSES}]
    }),
    getTeacherExams: builder.query({
      query: ({query, id}) => ({
        url: `${BACKEND_URL.TEACHER}/${id}/${BACKEND_URL.EXAMS}`,
        method: API_SERVICE_METHOD.GET,
        data: {params: query}
      }),
      providesTags: (_result, _err, arg) => [{type: Tags.EXAMS}]
    }),
    getAdvisorStudents: builder.query({
      query: ({id}) => ({
        url: `${BACKEND_URL.ADVISOR}/${id}${BACKEND_URL.STUDENTS}`,
        method: API_SERVICE_METHOD.GET
      }),
      providesTags: (_result, _err, arg) => [{type: Tags.ADVISOR_STUDENTS}]
    }),
    updateStudentAcademicInfo: builder.mutation({
      query: ({body, id}) => ({
        url: `${BACKEND_URL.STUDENT_COURSE_INFO}/${id}`,
        method: API_SERVICE_METHOD.PUT,
        data: {body}
      }),
      invalidatesTags: (result, error, arg) => [
        {type: Tags.STUDENT_ACADEMIC_INFO},
        {type: Tags.COURSE_STUDENTS},
      ]
    }),
    deleteCourseSelectionStatus: builder.mutation({
      query: ({ id, body }) => ({
        url: `${BACKEND_URL.STUDENT_COURSE_INFO}/${id}`,
        method: API_SERVICE_METHOD.DELETE,
        data: {body}
      }),
      invalidatesTags: (result, error, arg) => [
        {type: Tags.STUDENT_ACADEMIC_INFO},
        {type: Tags.COURSE_STUDENTS},
      ]
    }),
    getStudentAcademicInfos: builder.query({
      query: ({id, query}) => ({
        url: `${BACKEND_URL.STUDENT}/${id}/${BACKEND_URL.ACADEMIC_INFOS}`,
        method: API_SERVICE_METHOD.GET,
        data: {params: query}
      }),
      providesTags: (_result, _err, arg) => [{type: Tags.STUDENT_ACADEMIC_INFO}]
    }),
    getStudentWeeklySchedule: builder.query({
      query: ({id, query}) => ({
        url: `${BACKEND_URL.STUDENT}/${id}${BACKEND_URL.WEEKLY_SCHEDULE}`,
        method: API_SERVICE_METHOD.GET,
        data: {params: query}
      }),
      providesTags: (_result, _err, arg) => [{type: Tags.STUDENT_ACADEMIC_INFO}]
    }),
    getTeacherWeeklySchedule: builder.query({
      query: ({id, query}) => ({
        url: `${BACKEND_URL.TEACHER}/${id}${BACKEND_URL.WEEKLY_SCHEDULE}`,
        method: API_SERVICE_METHOD.GET,
        data: {params: query}
      }),
      providesTags: (_result, _err, arg) => [{type: Tags.STUDENT_ACADEMIC_INFO}]
    }),
    getStudentTranscript: builder.query({
      query: ({id, query}) => ({
        url: `${BACKEND_URL.STUDENT}/${id}${BACKEND_URL.TRANSCRIPT}`,
        method: API_SERVICE_METHOD.GET,
        data: {params: query}
      }),
      providesTags: (_result, _err, arg) => [{type: Tags.STUDENT_ACADEMIC_INFO}]
    }),
    getStudentExams: builder.query({
      query: ({query, id}) => ({
        url: `${BACKEND_URL.STUDENT}/${id}/${BACKEND_URL.EXAMS}`,
        method: API_SERVICE_METHOD.GET,
        data: {params: query}
      }),
      providesTags: (_result, _err, arg) => [{type: Tags.EXAMS}]
    }),
  })
});

export const {
  useGetUserQuery,
  useLazyGetUserQuery,
  useApproveUserMutation,
  useLazyApproveUserMutation,
  useChangeUserRoleMutation,
  useChangeUserDepartmentActivityMutation,
  useLazyChangeUserDepartmentActivityMutation,
  useGetUserDepartmentActivityQuery,
  useLazyGetUserDepartmentActivityQuery,
  useLazyChangeUserRoleMutation,
  useGetStudentCoursesQuery,
  useLazyGetStudentCoursesQuery,
  useSelectCourseMutation,
  useGetStudentDepartmentsQuery,
  useGetTeacherDepartmentsQuery,
  useGetTeacherCoursesQuery,
  useGetTeacherGivenCoursesQuery,
  useGetAdvisorStudentsQuery,
  useUpdateStudentAcademicInfoMutation,
  useDeleteCourseSelectionStatusMutation,
  useGetStudentAcademicInfosQuery,
  useLazyGetStudentAcademicInfosQuery,
  useGetStudentWeeklyScheduleQuery,
  useGetTeacherWeeklyScheduleQuery,
  useGetStudentTranscriptQuery,
  useGetStudentExamsQuery,
  useGetTeacherExamsQuery,
} = userApi;
