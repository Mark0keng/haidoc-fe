import { REGISTER } from './constants';

export const register = (payload, cbSuccess, cbFailed) => ({
  type: REGISTER,
  payload,
  cbSuccess,
  cbFailed,
});
