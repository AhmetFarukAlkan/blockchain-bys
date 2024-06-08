import {API_SERVICE_METHOD} from '../../../common/constants/apiServiceMethods';
import {Tags} from '../../../common/constants/apiServiceTag.constant';
import {BACKEND_URL} from '../../../Constants/backendUrlConstants';
import {baseApi} from '../apiService';

export const departmentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createDepartment: builder.mutation({
      query: ({body}) => ({
        url: `${BACKEND_URL.DEPARTMENT}${BACKEND_URL.CREATE}`,
        method: API_SERVICE_METHOD.POST,
        data: {body}
      }),
      invalidatesTags: (result, error, arg) => [{type: Tags.DEPARTMENT}]
    }),
    getDepartments: builder.query({
      query: () => ({
        url: `${BACKEND_URL.DEPARTMENTS}`,
        method: API_SERVICE_METHOD.GET
      }),
      providesTags: (_result, _err, arg) => [{type: Tags.DEPARTMENT}]
    }),
    getDepartment: builder.query({
      query: ({id}) => ({
        url: `${BACKEND_URL.DEPARTMENT}/${id}`,
        method: API_SERVICE_METHOD.GET
      }),
      providesTags: (_result, _err, arg) => [{type: Tags.DEPARTMENT}]
    }),
    getDepartmentCourses: builder.query({
      query: ({query, id}) => ({
        url: `${BACKEND_URL.DEPARTMENT}/${id}/${BACKEND_URL.COURSES}`,
        method: API_SERVICE_METHOD.GET,
        data: {params: query}
      }),
    }),
    getDepartmentOpenedCourses: builder.query({
      query: ({query, id}) => ({
        url: `${BACKEND_URL.DEPARTMENT}/${id}/${BACKEND_URL.OPENED_COURSE}`,
        method: API_SERVICE_METHOD.GET,
        data: {params: query}
      }),
      providesTags: (_result, _err, arg) => [{type: Tags.OPENED_COURSE}]
    }),
    getDepartmentTeachers: builder.query({
      query: ({query, id}) => ({
        url: `${BACKEND_URL.DEPARTMENT}/${id}${BACKEND_URL.TEACHERS}`,
        method: API_SERVICE_METHOD.GET,
        data: {params: query}
      }),
      providesTags: (_result, _err, arg) => [{type: Tags.DEPARTMENT_TEACHERS}]
    }),
    getDepartmentStudents: builder.query({
      query: ({query, id}) => ({
        url: `${BACKEND_URL.DEPARTMENT}/${id}${BACKEND_URL.STUDENTS}`,
        method: API_SERVICE_METHOD.GET,
        data: {params: query}
      }),
      providesTags: (_result, _err, arg) => [{type: Tags.DEPARTMENT_STUDENTS}]
    }),
    getDepartmentExams: builder.query({
      query: ({query, id}) => ({
        url: `${BACKEND_URL.DEPARTMENT}/${id}/${BACKEND_URL.EXAMS}`,
        method: API_SERVICE_METHOD.GET,
        data: {params: query}
      }),
      providesTags: (_result, _err, arg) => [{type: Tags.EXAMS}]
    }),
    updateDepartment: builder.mutation({
      query: ({body, id}) => ({
        url: `${BACKEND_URL.DEPARTMENT}/${id}`,
        method: API_SERVICE_METHOD.PUT,
        data: {body}
      }),
    }),
  })
});

export const {
  useCreateDepartmentMutation,
  useGetDepartmentsQuery,
  useGetDepartmentQuery,
  useGetDepartmentCoursesQuery,
  useGetDepartmentOpenedCoursesQuery,
  useGetDepartmentTeachersQuery,
  useGetDepartmentStudentsQuery,
  useLazyGetDepartmentStudentsQuery,
  useGetDepartmentExamsQuery,
  useUpdateDepartmentMutation,
} = departmentApi;
