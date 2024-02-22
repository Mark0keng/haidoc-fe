import { GET_CART, GET_USER_CART, SET_CART, UPDATE_CART } from './constants';

export const setCart = (cart) => ({
  type: SET_CART,
  cart,
});

export const getCart = (query, cbSuccess, cbFailed) => ({
  type: GET_CART,
  query,
  cbSuccess,
  cbFailed,
});

export const getUserCart = (query, cbSuccess, cbFailed) => ({
  type: GET_USER_CART,
  query,
  cbSuccess,
  cbFailed,
});

export const updateCart = (payload, cartId, cbSuccess, cbFailed) => ({
  type: UPDATE_CART,
  payload,
  cartId,
  cbSuccess,
  cbFailed,
});
