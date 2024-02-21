import { ADD_TO_CART, GET_ONE_PRODUCT, SET_ONE_PRODUCT } from './constants';

export const setOneProduct = (product) => ({
  type: SET_ONE_PRODUCT,
  product,
});

export const getOneProduct = (productId, cbSuccess, cbFailed) => ({
  type: GET_ONE_PRODUCT,
  productId,
  cbSuccess,
  cbFailed,
});

export const addToCart = (payload, cbSuccess, cbFailed) => ({
  type: ADD_TO_CART,
  payload,
  cbSuccess,
  cbFailed,
});
