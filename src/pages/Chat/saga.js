import { takeLatest, call, put } from 'redux-saga/effects';
import { setLoading } from '@containers/App/actions';
import { createChat, getChat } from '@domain/api';
import { CREATE_CHAT, GET_CHAT } from './constants';

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

export default function* chatSaga() {
  yield takeLatest(CREATE_CHAT, doCreateChat);
  yield takeLatest(GET_CHAT, doGetChat);
}
