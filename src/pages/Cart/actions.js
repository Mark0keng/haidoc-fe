import { GET_CART, GET_MANY_CART, SET_CART } from './constants';

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

export const getManyCart = (query, cbSuccess, cbFailed) => ({
  type: GET_MANY_CART,
  query,
  cbSuccess,
  cbFailed,
});
