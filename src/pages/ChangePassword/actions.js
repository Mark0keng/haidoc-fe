import { CHANGE_PASSWORD } from './constants';

export const changePassword = (payload, cbSuccess, cbFailed) => ({
  type: CHANGE_PASSWORD,
  payload,
  cbSuccess,
  cbFailed,
});
