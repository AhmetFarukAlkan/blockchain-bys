import { API_SERVICE_METHOD } from "../../../common/constants/apiServiceMethods";
import { Tags } from "../../../common/constants/apiServiceTag.constant";
import { BACKEND_URL } from "../../../Constants/backendUrlConstants";
import { baseApi } from "../apiService";

export const courseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: ({ body }) => ({
        url: `${BACKEND_URL.COURSE}${BACKEND_URL.CREATE}`,
        method: API_SERVICE_METHOD.POST,
        data: { body },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: Tags.COURSE_EVENTS, id: arg.id },
      ],
    }),
    createOpenedCourse: builder.mutation({
      query: ({ body }) => ({
        url: `${BACKEND_URL.OPENED_COURSE}${BACKEND_URL.CREATE}`,
        method: API_SERVICE_METHOD.POST,
        data: { body },
      }),
      invalidatesTags: (result, error, arg) => [
        {type: Tags.OPENED_COURSE},
        {type: Tags.TEACHER_COURSE},
        {type: Tags.TEACHER_GIVEN_COURSES},
      ]
    }),
    updateOpenedCourse: builder.mutation({
      query: ({ body, id }) => ({
        url: `${BACKEND_URL.OPENED_COURSE}/${id}${BACKEND_URL.UPDATE}`,
        method: API_SERVICE_METHOD.PUT,
        data: { body },
      }),
      invalidatesTags: (_, __, arg) => [
        {type: Tags.OPENED_COURSE},
        {type: Tags.COURSE_STUDENTS},
        {type: Tags.TEACHER_GIVEN_COURSES},
        {type: Tags.STUDENT_WEEKLY_SCHEDULE},
        {type: Tags.TEACHER_COURSE},
      ]
    }),
    updateOpenedCourseGradingRules: builder.mutation({
      query: ({ body, id }) => ({
        url: `${BACKEND_URL.OPENED_COURSE}/${id}${BACKEND_URL.GRADING_RULES}`,
        method: API_SERVICE_METHOD.POST,
        data: { body },
      }),
      invalidatesTags: (_, __, arg) => [
        {type: Tags.OPENED_COURSE},
        {type: Tags.COURSE_STUDENTS},
        {type: Tags.TEACHER_GIVEN_COURSES},
      ]
    }),
    getCourse: builder.query({
      query: ({ id }) => ({
        url: `${BACKEND_URL.COURSE}/${id}`,
        method: API_SERVICE_METHOD.GET,
      }),
    }),
    getOpenedCourseDetail: builder.query({
      query: ({ id }) => ({
        url: `${BACKEND_URL.OPENED_COURSE}/${id}`,
        method: API_SERVICE_METHOD.GET,
      }),
      providesTags: (_result, _err, arg) => [{type: Tags.OPENED_COURSE}]
    }),
    getOpenedCourseStudents: builder.query({
      query: ({ id }) => ({
        url: `${BACKEND_URL.OPENED_COURSE}/${id}${BACKEND_URL.STUDENTS}`,
        method: API_SERVICE_METHOD.GET,
      }),
      providesTags: (_result, _err, arg) => [{type: Tags.COURSE_STUDENTS}]
    }),
    updateCourse: builder.mutation({
      query: ({ body, id }) => ({
        url: `${BACKEND_URL.COURSE}/${id}`,
        method: API_SERVICE_METHOD.PUT,
        data: { body },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: Tags.COURSE_EVENTS, id: arg.id },
      ],
    }),
    changeCourseSelectionStatus: builder.mutation({
      query: ({ body, id }) => ({
        url: `${BACKEND_URL.COURSE_SELECTION}/${id}/${BACKEND_URL.CHANGE_STATUS}`,
        method: API_SERVICE_METHOD.PUT,
        data: { body },
      }),
      invalidatesTags: (result, error, arg) => [{type: Tags.STUDENT_ACADEMIC_INFO}]
    }),
    getCourseComments: builder.query({
      query: ({ id }) => ({
        url: `${BACKEND_URL.COURSE}/${id}${BACKEND_URL.EVENTS}`,
        method: API_SERVICE_METHOD.GET,
      }),
      providesTags: (_result, _err, arg) => [
        { type: Tags.COURSE_EVENTS, id: arg.id },
      ],
    }),
    createCourseComment: builder.mutation({
      query: ({ body, id }) => ({
        url: `${BACKEND_URL.COURSE}/${id}${BACKEND_URL.CREATE_EVENT}`,
        method: API_SERVICE_METHOD.POST,
        data: { body },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: Tags.COURSE_EVENTS, id: arg.id },
      ],
    }),
    getCoursesOfTeacher: builder.query({
      query: ({ id }) => ({
        url: `${BACKEND_URL.COURSE}${BACKEND_URL.TEACHER}/${id}`,
        method: API_SERVICE_METHOD.GET,
      }),
    }),
    getCourseSelectionActivity: builder.query({
      query: () => ({
        url: `${BACKEND_URL.COURSE_SELECTION}${BACKEND_URL.ACTIVITY}`,
        method: API_SERVICE_METHOD.GET,
      }),
      providesTags: (_result, _err, arg) => [{ type: Tags.COURSE_SELECTION_ACTIVITY }],
    }),
    toggleCourseSelectionActivity: builder.mutation({
      query: () => ({
        url: `${BACKEND_URL.COURSE_SELECTION}${BACKEND_URL.ACTIVITY}`,
        method: API_SERVICE_METHOD.PATCH,
      }),
      invalidatesTags: (_, __, arg) => [{ type: Tags.COURSE_SELECTION_ACTIVITY }],    
    }),
  }),
});

export const {
  useCreateCourseMutation,
  useCreateOpenedCourseMutation,
  useUpdateOpenedCourseMutation,
  useUpdateOpenedCourseGradingRulesMutation,
  useGetCourseQuery,
  useGetOpenedCourseDetailQuery,
  useGetOpenedCourseStudentsQuery,
  useUpdateCourseMutation,
  useChangeCourseSelectionStatusMutation,
  useGetCourseCommentsQuery,
  useCreateCourseCommentMutation,
  useGetCoursesOfTeacherQuery,
  useGetCourseSelectionActivityQuery,
  useToggleCourseSelectionActivityMutation,
} = courseApi;
