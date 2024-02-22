import { CREATE_ADDRESS, GET_CITY, GET_PROVINCE } from './constants';

export const getProvince = (query, cbSuccess, cbFailed) => ({
  type: GET_PROVINCE,
  query,
  cbSuccess,
  cbFailed,
});

export const getCity = (query, cbSuccess, cbFailed) => ({
  type: GET_CITY,
  query,
  cbSuccess,
  cbFailed,
});

export const createAddress = (payload, cbSuccess, cbFailed) => ({
  type: CREATE_ADDRESS,
  payload,
  cbSuccess,
  cbFailed,
});
