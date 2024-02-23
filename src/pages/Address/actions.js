import { CREATE_ADDRESS, GET_ADDRESS, GET_CITY, GET_PROVINCE, SET_ADDRESS, UPDATE_ADDRESS } from './constants';

export const setAddress = (address) => ({
  type: SET_ADDRESS,
  address,
});

export const getAddress = (query, cbSuccess, cbFailed) => ({
  type: GET_ADDRESS,
  query,
  cbSuccess,
  cbFailed,
});

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

export const updateAddress = (payload, cbSuccess, cbFailed) => ({
  type: UPDATE_ADDRESS,
  payload,
  cbSuccess,
  cbFailed,
});
