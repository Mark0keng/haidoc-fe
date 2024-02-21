import { GET_CART, SET_CART } from './constants';

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
