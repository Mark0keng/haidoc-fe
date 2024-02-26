import { CREATE_ORDER, CREATE_ORDER_ITEM, GET_ORDER_ITEM, GET_PAYMENT, GET_USER_ORDER } from './constants';

export const getUserOrder = (query, cbSuccess, cbFailed) => ({
  type: GET_USER_ORDER,
  query,
  cbSuccess,
  cbFailed,
});

export const createOrder = (payload, cbSuccess, cbFailed) => ({
  type: CREATE_ORDER,
  payload,
  cbSuccess,
  cbFailed,
});

export const getOrderItem = (query, cbSuccess, cbFailed) => ({
  type: GET_ORDER_ITEM,
  query,
  cbSuccess,
  cbFailed,
});

export const createOrderItem = (payload, cbSuccess, cbFailed) => ({
  type: CREATE_ORDER_ITEM,
  payload,
  cbSuccess,
  cbFailed,
});

export const getPayment = (query, cbSuccess, cbFailed) => ({
  type: GET_PAYMENT,
  query,
  cbSuccess,
  cbFailed,
});
