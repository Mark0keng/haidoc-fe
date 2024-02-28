import { takeLatest, call, put } from 'redux-saga/effects';
import { setLoading } from '@containers/App/actions';
import { createChat, createMessage, getChat, getLatestMessage, getMessage } from '@domain/api';
import { CREATE_CHAT, CREATE_MESSAGE, GET_CHAT, GET_LATEST_MESSAGE, GET_MESSAGE } from './constants';

function* doGetChat({ query, cbSuccess, cbFailed }) {
  yield put(setLoading(true));
  try {
    const chat = yield call(getChat, query);

    cbSuccess && cbSuccess(chat?.data);
  } catch (error) {
    if (error?.response?.data?.output?.payload) {
      cbFailed && cbFailed(error.response.data.output.payload);
    }
  }
  yield put(setLoading(false));
}

function* doCreateChat({ payload, cbSuccess, cbFailed }) {
  yield put(setLoading(true));
  try {
    const chat = yield call(createChat, payload);

    cbSuccess && cbSuccess(chat?.data);
  } catch (error) {
    if (error?.response?.data?.output?.payload) {
      cbFailed && cbFailed(error.response.data.output.payload);
    }
  }
  yield put(setLoading(false));
}

function* doGetMessage({ query, cbSuccess, cbFailed }) {
  yield put(setLoading(true));
  try {
    const message = yield call(getMessage, query);

    cbSuccess && cbSuccess(message?.data);
  } catch (error) {
    if (error?.response?.data?.output?.payload) {
      cbFailed && cbFailed(error.response.data.output.payload);
    }
  }
  yield put(setLoading(false));
}

function* doGetLatestMessage({ query, cbSuccess, cbFailed }) {
  yield put(setLoading(true));
  try {
    const message = yield call(getLatestMessage, query);

    cbSuccess && cbSuccess(message?.data);
  } catch (error) {
    if (error?.response?.data?.output?.payload) {
      cbFailed && cbFailed(error.response.data.output.payload);
    }
  }
  yield put(setLoading(false));
}

function* doCreateMessage({ payload, cbSuccess, cbFailed }) {
  yield put(setLoading(true));
  try {
    const message = yield call(createMessage, payload);

    cbSuccess && cbSuccess(message?.data);
  } catch (error) {
    if (error?.response?.data?.output?.payload) {
      cbFailed && cbFailed(error.response.data.output.payload);
    }
  }
  yield put(setLoading(false));
}

export default function* chatSaga() {
  yield takeLatest(GET_CHAT, doGetChat);
  yield takeLatest(CREATE_CHAT, doCreateChat);
  yield takeLatest(GET_MESSAGE, doGetMessage);
  yield takeLatest(GET_LATEST_MESSAGE, doGetLatestMessage);
  yield takeLatest(CREATE_MESSAGE, doCreateMessage);
}
