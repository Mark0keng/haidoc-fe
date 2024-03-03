import { GET_EMAIL_FORGOT_PASSWORD } from './constants';

export const getEmailForgotPassword = (payload, cbSuccess, cbFailed) => ({
  type: GET_EMAIL_FORGOT_PASSWORD,
  payload,
  cbSuccess,
  cbFailed,
});
