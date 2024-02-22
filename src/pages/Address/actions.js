import { GET_PROVINCE, SET_PROVINCE } from './constants';

export const setProvince = (provinces) => ({
  type: SET_PROVINCE,
  provinces,
});

export const getProvince = (query, cbSuccess, cbFailed) => ({
  type: GET_PROVINCE,
  query,
  cbSuccess,
  cbFailed,
});
