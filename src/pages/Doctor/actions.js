import { GET_DOCTOR } from './constants';

export const getDoctor = (query, cbSuccess, cbFailed) => ({
  type: GET_DOCTOR,
  query,
  cbSuccess,
  cbFailed,
});
