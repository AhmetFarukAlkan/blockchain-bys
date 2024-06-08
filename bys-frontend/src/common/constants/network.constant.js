import {NetworkDefaults} from './network.default.constants';

export const HTTP_STATUS = {
  400: {
    code: 400,
    errors: []
  },
  401: {
    code: 401,
    errors: [
      NetworkDefaults.AUTH_USER_NOT_FOUND,
      NetworkDefaults.AUTH_INVALID_CREDENTIALS,
      NetworkDefaults.AUTH_SSO_TOKEN_TIMEOUT
    ]
  },
  402: {code: 402, errors: []},
  403: {code: 403, errors: []},
  404: {code: 404, errors: []},
  405: {code: 405, errors: []},
  408: {code: 408, errors: []},
  418: {
    code: 418,
    errors: [
      NetworkDefaults.TOKEN_NOT_PROVIDED,
      NetworkDefaults.TOKEN_INVALID,
      NetworkDefaults.AUTH_COMPANY_ID_REQUIRED
    ]
  },
  420: {code: 420, errors: []},
  422: {code: 422, errors: []},
  429: {code: 429, errors: []},
  500: {code: 500, errors: []},
  503: {code: 503, errors: []}
};
