import {API_SERVICE_METHOD} from '../../../common/constants/apiServiceMethods';
import {Tags} from '../../../common/constants/apiServiceTag.constant';
import {BACKEND_URL} from '../../../Constants/backendUrlConstants';
import {baseApi} from '../apiService';

export const examApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createExam: builder.mutation({
      query: ({body}) => ({
        url: `${BACKEND_URL.EXAM}${BACKEND_URL.CREATE}`,
        method: API_SERVICE_METHOD.POST,
        data: {body}
      }),
      invalidatesTags: (result, error, arg) => [{type: Tags.EXAMS}]
    }),
    updateExam: builder.mutation({
      query: ({body, id}) => ({
        url: `${BACKEND_URL.EXAM}/${id}`,
        method: API_SERVICE_METHOD.PUT,
        data: {body}
      }),
      invalidatesTags: (result, error, arg) => [{type: Tags.EXAMS}]
    }),
    deleteExam: builder.mutation({
      query: ({id}) => ({
        url: `${BACKEND_URL.EXAM}/${id}`,
        method: API_SERVICE_METHOD.DELETE,
      }),
      invalidatesTags: (result, error, arg) => [{type: Tags.EXAMS}]
    }),
  })
});

export const {
  useCreateExamMutation,
  useUpdateExamMutation,
  useDeleteExamMutation,
} = examApi;
