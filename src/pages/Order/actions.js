import { CREATE_ORDER, CREATE_ORDER_ITEM, GET_ORDER, GET_ORDER_ITEM } from './constants';

export const getOrder = (orderId, cbSuccess, cbFailed) => ({
  type: GET_ORDER,
  orderId,
  cbSuccess,
  cbFailed,
});

export const createOrder = (payload, cbSuccess, cbFailed) => ({
  type: CREATE_ORDER,
  payload,
  cbSuccess,
  cbFailed,
});

export const getOrderItem = (orderId, cbSuccess, cbFailed) => ({
  type: GET_ORDER_ITEM,
  orderId,
  cbSuccess,
  cbFailed,
});

export const createOrderItem = (payload, cbSuccess, cbFailed) => ({
  type: CREATE_ORDER_ITEM,
  payload,
  cbSuccess,
  cbFailed,
});
