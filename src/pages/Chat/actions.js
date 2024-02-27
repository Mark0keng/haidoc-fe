import { CREATE_CHAT, GET_CHAT } from './constants';

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
