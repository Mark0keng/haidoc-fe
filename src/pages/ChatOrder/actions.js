import { CREATE_CHAT_ORDER, GET_USER_CHAT_ORDER, UPDATE_CHAT_ORDER } from './constants';

export const createChatOrder = (payload, cbSuccess, cbFailed) => ({
  type: CREATE_CHAT_ORDER,
  payload,
  cbSuccess,
  cbFailed,
});

export const updateChatOrder = (payload, orderId, cbSuccess, cbFailed) => ({
  type: UPDATE_CHAT_ORDER,
  payload,
  orderId,
  cbSuccess,
  cbFailed,
});

export const getUserChatOrder = (query, cbSuccess, cbFailed) => ({
  type: GET_USER_CHAT_ORDER,
  query,
  cbSuccess,
  cbFailed,
});
