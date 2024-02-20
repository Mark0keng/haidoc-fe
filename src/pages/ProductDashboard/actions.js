import { CREATE_PRODUCT, GET_ALL_PRODUCT, SET_ALL_PRODUCT } from './constants';

export const setAllProduct = (products) => ({
  type: SET_ALL_PRODUCT,
  products,
});

export const getAllProduct = (query, cbSuccess, cbFailed) => ({
  type: GET_ALL_PRODUCT,
  query,
  cbSuccess,
  cbFailed,
});

export const createProduct = (payload, cbSuccess, cbFailed) => ({
  type: CREATE_PRODUCT,
  payload,
  cbSuccess,
  cbFailed,
});
