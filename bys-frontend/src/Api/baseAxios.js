import axios from 'axios';
import {ApiErrorUseCase} from '../common/constants/common.constants';
import {ACCESS_TOKEN} from '../common/constants/local.storage.constants';
import {HTTP_STATUS} from '../common/constants/network.constant';
import {NetworkDefaults} from '../common/constants/network.default.constants';
import {URL} from '../Constants/urlConstants';
import {getHttpCodeErrorLabel, getHttpCodeErrorTitle} from '../Utils/errorUtils';

export class BaseAxios {
  // Variables
  axiosInstance;
  baseURL;
  headers;
  additionalSuffixParams;
  storageAuthKey;

  constructor({
                baseURL,
                headers,
                storageAuthKey,
                additionalSuffixParams
              }) {
    this.axiosInstance = axios.create();
    this.storageAuthKey = storageAuthKey;
    this.setBaseUrl(baseURL);
    this.setHeaders(headers);
    this.setAccessToken();
    this.additionalSuffixParams = additionalSuffixParams;
    this.setResponseInterceptors();
  }

  setBaseUrl(_baseURL) {
    this.baseURL = _baseURL || process.env.REACT_APP_BASE_URL;
  }

  setHeaders(_headers) {
    this.headers = _headers || {
      Accept: 'application/json'
    };
  }

  setAccessToken() {
    const auth = localStorage.getItem(this.storageAuthKey || ACCESS_TOKEN);

    auth && (this.axiosInstance.defaults.headers.common.Authorization = `Bearer ${auth}`);
  }

  setAdditionalSuffixParams() {
    return {
      ...this.additionalSuffixParams
    };
  }

  setResponseInterceptors() {
    this.axiosInstance.interceptors.response.use(
      (response) => response?.data || response,
      async (error) => {
        const errorResponse = error?.response;
        const errorStatusCode = errorResponse?.status;
        const errorMessage = errorResponse?.data?.message;

        const apiError = {
          errorLabel: errorMessage,
          useCase: ApiErrorUseCase.SHOW_MESSAGE,
          statusCode: errorStatusCode
        };

        // Make case Show Message when needed status code
        if (errorStatusCode && Object.keys(HTTP_STATUS)?.includes(errorStatusCode?.toString())) {
          apiError.errorLabel = errorMessage;
          apiError.errorTitle = getHttpCodeErrorTitle(HTTP_STATUS[400].code);
          apiError.useCase = ApiErrorUseCase.SHOW_MESSAGE;
        }

        if (!error || !errorResponse) {
          apiError.errorLabel = getHttpCodeErrorLabel(NetworkDefaults.NETWORK_ERROR);
          apiError.errorTitle = getHttpCodeErrorTitle(NetworkDefaults.NETWORK_ERROR);
          apiError.useCase = ApiErrorUseCase.SHOW_MESSAGE;
        }

        if (errorStatusCode === HTTP_STATUS[400].code) {
          if (HTTP_STATUS[418].errors.includes(errorMessage)) {
            apiError.errorLabel = getHttpCodeErrorLabel(HTTP_STATUS[418].code);
            apiError.errorTitle = getHttpCodeErrorTitle(HTTP_STATUS[418].code);
            apiError.useCase = ApiErrorUseCase.LOGOUT;
          } else {
            apiError.errorTitle = getHttpCodeErrorTitle(HTTP_STATUS[400].code);
          }
        }

        if (errorStatusCode === HTTP_STATUS[401].code) {
          apiError.errorLabel = getHttpCodeErrorLabel(HTTP_STATUS[418].code);
          apiError.errorTitle = getHttpCodeErrorTitle(HTTP_STATUS[418].code);
          apiError.useCase = ApiErrorUseCase.LOGOUT;
        }

        // If the error is HTTP 402 and has not already been retried
        if (errorStatusCode === HTTP_STATUS[402].code) {
          apiError.errorLabel = getHttpCodeErrorLabel(HTTP_STATUS[402].code);
          apiError.errorTitle = getHttpCodeErrorTitle(HTTP_STATUS[402].code);
        }

        // If the error is HTTP 403 and has not already been retried
        if (errorStatusCode === HTTP_STATUS[403].code) {
          apiError.errorLabel = getHttpCodeErrorLabel(HTTP_STATUS[403].code);
          apiError.errorTitle = getHttpCodeErrorTitle(HTTP_STATUS[403].code);

          window.location.href = URL.LOGIN;
        }

        // If the error is HTTP 404 and has not already been retried
        if (errorStatusCode === HTTP_STATUS[404].code) {
          // 404 Flow
          apiError.errorLabel = errorMessage;
          apiError.errorTitle = getHttpCodeErrorTitle(HTTP_STATUS[404].code);
        }

        // If the error is HTTP 405 and has not already been retried
        if (errorStatusCode === HTTP_STATUS[405].code) {
          apiError.errorLabel = getHttpCodeErrorLabel(HTTP_STATUS[405].code);
          apiError.errorTitle = getHttpCodeErrorTitle(HTTP_STATUS[405].code);
        }

        // If the error is HTTP 408 and has not already been retried
        if (errorStatusCode === HTTP_STATUS[408].code) {
          apiError.errorLabel = getHttpCodeErrorLabel(HTTP_STATUS[408].code);
          apiError.errorTitle = getHttpCodeErrorTitle(HTTP_STATUS[408].code);
        }

        if (errorStatusCode === HTTP_STATUS[418].code) {
          apiError.errorLabel = getHttpCodeErrorLabel(HTTP_STATUS[418].code);
          apiError.errorTitle = getHttpCodeErrorTitle(HTTP_STATUS[418].code);
        }

        // If the error is HTTP 420 and has not already been retried
        if (errorStatusCode === HTTP_STATUS[420].code) {
          // Registration Activate Flow
        }

        if (errorStatusCode === HTTP_STATUS[422].code) {
          apiError.errorArray = errorResponse.data.errors;
          apiError.errorTitle = getHttpCodeErrorTitle(HTTP_STATUS[422].code);
        }

        if (errorStatusCode === HTTP_STATUS[429].code) {
          apiError.errorLabel = getHttpCodeErrorLabel(HTTP_STATUS[429].code);
          apiError.errorTitle = getHttpCodeErrorTitle(HTTP_STATUS[429].code);
        }

        // If the error is HTTP 500 and has not already been retried
        if (errorStatusCode === HTTP_STATUS[500].code) {
          apiError.errorTitle = getHttpCodeErrorTitle(HTTP_STATUS[500].code);
        }

        // If the error is HTTP 503 and has not already been retried
        if (errorStatusCode === HTTP_STATUS[503].code) {
          // Page 5xx Flow
          apiError.errorLabel = getHttpCodeErrorLabel(HTTP_STATUS[503].code);
          apiError.errorTitle = getHttpCodeErrorTitle(HTTP_STATUS[503].code);
          apiError.useCase = ApiErrorUseCase.LOGOUT;
        }

        return Promise.reject(apiError);
      }
    );
  }

  async start({
                method,
                url,
                body,
                params,
                rest
              }) {
    await this.setAccessToken();
    const queryParams = typeof params === 'object' ? params : {};

    return await this.axiosInstance({
      method,
      url,
      headers: this.headers,
      baseURL: this.baseURL,
      data: body,
      params: {...(await this.setAdditionalSuffixParams()), ...queryParams},
      ...rest
    });
  }
}
