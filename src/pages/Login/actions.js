import { LOGIN } from './constants';

export const login = (payload, cbSuccess, cbFailed) => ({
  type: LOGIN,
  payload,
  cbSuccess,
  cbFailed,
});
