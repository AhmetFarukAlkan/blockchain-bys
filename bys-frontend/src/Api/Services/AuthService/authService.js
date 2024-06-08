import {API_SERVICE_METHOD} from '../../../common/constants/apiServiceMethods';
import {Tags} from '../../../common/constants/apiServiceTag.constant';
import {BACKEND_URL} from '../../../Constants/backendUrlConstants';
import {baseApi} from '../apiService';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: ({body}) => ({
        url: `${BACKEND_URL.REGISTER}`,
        method: API_SERVICE_METHOD.POST,
        data: {body}
      }),
    }),
  })
});

export const {
  useRegisterMutation,
} = authApi;
