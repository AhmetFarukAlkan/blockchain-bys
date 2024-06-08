import {API_SERVICE_METHOD} from '../../../common/constants/apiServiceMethods';
import {Tags} from '../../../common/constants/apiServiceTag.constant';
import {BACKEND_URL} from '../../../Constants/backendUrlConstants';
import {baseApi} from '../apiService';

export const facultyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createFaculty: builder.mutation({
      query: ({body}) => ({
        url: `${BACKEND_URL.FACULTY}${BACKEND_URL.CREATE}`,
        method: API_SERVICE_METHOD.POST,
        data: {body}
      }),
    }),
    getFaculties: builder.query({
      query: () => ({
        url: `${BACKEND_URL.FACULTIES}`,
        method: API_SERVICE_METHOD.GET
      }),
    }),
    getFacultyDepartments: builder.query({
      query: ({id}) => ({
        url: `${BACKEND_URL.FACULTY}/${id}/${BACKEND_URL.DEPARTMENTS}`,
        method: API_SERVICE_METHOD.GET
      }),
      providesTags: (_result, _err, arg) => [{type: Tags.DEPARTMENT}]
    }),
    getFaculty: builder.query({
      query: ({id}) => ({
        url: `${BACKEND_URL.FACULTY}/${id}`,
        method: API_SERVICE_METHOD.GET
      }),
    }),
    updateFaculty: builder.mutation({
      query: ({body, id}) => ({
        url: `${BACKEND_URL.FACULTY}/${id}`,
        method: API_SERVICE_METHOD.PUT,
        data: {body}
      }),
    }),
  })
});

export const {
  useCreateFacultyMutation,
  useGetFacultiesQuery,
  useGetFacultyDepartmentsQuery,
  useGetFacultyQuery,
  useUpdateFacultyMutation,
} = facultyApi;
