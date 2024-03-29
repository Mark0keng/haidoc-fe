import { DELETE_CART, GET_CART, GET_SHIPPING_COST, GET_USER_CART, SET_CART, UPDATE_CART } from './constants';

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

export const deleteCart = (cartId, cbSuccess, cbFailed) => ({
  type: DELETE_CART,
  cartId,
  cbSuccess,
  cbFailed,
});

export const getShippingCost = (query, cbSuccess, cbFailed) => ({
  type: GET_SHIPPING_COST,
  query,
  cbSuccess,
  cbFailed,
});
