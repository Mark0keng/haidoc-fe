import { CREATE_CHAT, CREATE_MESSAGE, GET_CHAT, GET_LATEST_MESSAGE, GET_MESSAGE } from './constants';

export const createChat = (payload, cbSuccess, cbFailed) => ({
  type: CREATE_CHAT,
  payload,
  cbSuccess,
  cbFailed,
});

export const getChat = (query, cbSuccess, cbFailed) => ({
  type: GET_CHAT,
  query,
  cbSuccess,
  cbFailed,
});

export const createMessage = (payload, cbSuccess, cbFailed) => ({
  type: CREATE_MESSAGE,
  payload,
  cbSuccess,
  cbFailed,
});

export const getMessage = (query, cbSuccess, cbFailed) => ({
  type: GET_MESSAGE,
  query,
  cbSuccess,
  cbFailed,
});

export const getLatestMessage = (query, cbSuccess, cbFailed) => ({
  type: GET_LATEST_MESSAGE,
  query,
  cbSuccess,
  cbFailed,
});
