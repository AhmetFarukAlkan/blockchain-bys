import {createApi} from '@reduxjs/toolkit/query/react';
import Toastify from 'toastify-js';
import {Tags} from '../../common/constants/apiServiceTag.constant';
import {ApiErrorUseCase, LIST} from '../../common/constants/common.constants';
import {ACCESS_TOKEN} from '../../common/constants/local.storage.constants';
import {decrease, increase} from '../../redux/slices/loadingSlice';
import {setUser} from '../../redux/slices/mainSlice';
import {BaseAxios} from '../baseAxios';
import {silentServices} from './silentServices';
import {successServices} from './successServices';
import {silentErrorServices} from './silentErrorServices';
import {onlyResultServices} from './onlyResultServices';

const Api = new BaseAxios({});

const apiErrorHandler = (error, dispatch) => {
  const logout = () => {
    dispatch(setUser(undefined));
    localStorage.removeItem(ACCESS_TOKEN);
  };

  const pushError = () => {
    if (error.statusCode === 422) {
      const errorArray = error.errorArray ? Object.values(error.errorArray).flat() : [error.errorLabel];
      errorArray.forEach(msg =>
        Toastify({
          text: `${msg}`,
          duration: 5000,
          newWindow: true,
          close: true,
          gravity: 'top',
          position: 'right',
          backgroundColor: 'linear-gradient(to right, #ff5f6d, #ffc371)',
          stopOnFocus: true
        }).showToast()
      );
    } else {
      Toastify({
        text: `${error.errorLabel}`,
        duration: 5000,
        newWindow: true,
        close: true,
        gravity: 'top',
        position: 'right',
        backgroundColor: 'linear-gradient(to right, #ff5f6d, #ffc371)',
        stopOnFocus: true
      }).showToast();
    }
  };

  if (error) {
    switch (error.useCase) {
      case ApiErrorUseCase.LOGOUT:
        logout();
        pushError();
        break;
      case ApiErrorUseCase.SHOW_MESSAGE:
        pushError();
        break;
      default:
        break;
    }
  }
};

export const apiBaseQuery = () => async ({url, method, data = {}}, {dispatch, endpoint}) => {
  const isSilentService = silentServices.includes(endpoint);
  const isSuccessService = successServices.includes(endpoint);
  const isSilentErrorService = silentErrorServices.includes(endpoint);
  const shouldReturnResult = onlyResultServices.includes(endpoint);

  try {
    !isSilentService && dispatch(increase());

    const result = await Api.start({method, url, body: data?.body, params: data?.params});

    isSuccessService && Toastify({
      text: result.message,
      duration: 5000,
      newWindow: true,
      close: true,
      gravity: 'top',
      position: 'right',
      backgroundColor: 'linear-gradient(to right, #37ecba, #72afd3)',
      stopOnFocus: true
    }).showToast();

    return shouldReturnResult ? {data: result} : {data: result?.data || result};
  } catch (error) {
    const apiError = error;

    !isSilentErrorService && apiErrorHandler(apiError, dispatch);

    return {
      error: apiError
    };
  } finally {
    !isSilentService && dispatch(decrease());
  }
};

export const resetApiState = (dispatch) => dispatch(baseApi.util.resetApiState());

export function listTagsProvider({type}) {
  return [{type, id: LIST}];
}

export const listTagsInvalidate = ({type}) => [{type, id: LIST}];

export const baseApi = createApi({
  baseQuery: apiBaseQuery(),
  endpoints: () => ({}),
  tagTypes: Object.keys(Tags)
});
