import { CREATE_PRODUCT, DELETE_PRODUCT, GET_ALL_PRODUCT, SET_ALL_PRODUCT, UPDATE_PRODUCT } from './constants';

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

export const updateProduct = (payload, productId, cbSuccess, cbFailed) => ({
  type: UPDATE_PRODUCT,
  payload,
  productId,
  cbSuccess,
  cbFailed,
});

export const deleteProduct = (productId, cbSuccess) => ({
  type: DELETE_PRODUCT,
  productId,
  cbSuccess,
});
