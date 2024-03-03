import { takeLatest, call, put } from 'redux-saga/effects';
import { setLoading } from '@containers/App/actions';
import { createChatOrder, getUserChatOrder, updateChatOrder } from '@domain/api';
import { CREATE_CHAT_ORDER, GET_USER_CHAT_ORDER, UPDATE_CHAT_ORDER } from './constants';

function* doGetUserChatOrder({ query, cbSuccess, cbFailed }) {
  yield put(setLoading(true));
  try {
    const chatOrder = yield call(getUserChatOrder, query);

    cbSuccess && cbSuccess(chatOrder?.data);
  } catch (error) {
    if (error?.response?.data?.output?.payload) {
      cbFailed && cbFailed(error.response.data.output.payload);
    }
  }
  yield put(setLoading(false));
}

function* doCreateChatOrder({ payload, cbSuccess, cbFailed }) {
  yield put(setLoading(true));
  try {
    const chatOrder = yield call(createChatOrder, payload);

    cbSuccess && cbSuccess(chatOrder?.data);
  } catch (error) {
    if (error?.response?.data?.output?.payload) {
      cbFailed && cbFailed(error.response.data.output.payload);
    }
  }
  yield put(setLoading(false));
}

function* doUpdateChatOrder({ payload, orderId, cbSuccess, cbFailed }) {
  yield put(setLoading(true));
  try {
    const chatOrder = yield call(updateChatOrder, payload, orderId);

    cbSuccess && cbSuccess(chatOrder?.data);
  } catch (error) {
    if (error?.response?.data?.output?.payload) {
      cbFailed && cbFailed(error.response.data.output.payload);
    }
  }
  yield put(setLoading(false));
}

export default function* chatOrderSaga() {
  yield takeLatest(CREATE_CHAT_ORDER, doCreateChatOrder);
  yield takeLatest(UPDATE_CHAT_ORDER, doUpdateChatOrder);
  yield takeLatest(GET_USER_CHAT_ORDER, doGetUserChatOrder);
}
