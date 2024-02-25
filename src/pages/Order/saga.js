import { takeLatest, call, put } from 'redux-saga/effects';
import { setLoading } from '@containers/App/actions';
import { createOrder, createOrderItem } from '@domain/api';
import { CREATE_ORDER, CREATE_ORDER_ITEM } from './constants';

function* doCreateOrder({ payload, cbSuccess, cbFailed }) {
  yield put(setLoading(true));
  try {
    const order = yield call(createOrder, payload);

    cbSuccess && cbSuccess(order?.data);
  } catch (error) {
    if (error?.response?.data?.output?.payload) {
      cbFailed && cbFailed(error.response.data.output.payload);
    }
  }
  yield put(setLoading(false));
}

function* doCreateOrderItem({ payload, cbSuccess, cbFailed }) {
  yield put(setLoading(true));
  try {
    const orderItem = yield call(createOrderItem, payload);

    cbSuccess && cbSuccess(orderItem?.data);
  } catch (error) {
    if (error?.response?.data?.output?.payload) {
      cbFailed && cbFailed(error.response.data.output.payload);
    }
  }
  yield put(setLoading(false));
}

export default function* orderSaga() {
  yield takeLatest(CREATE_ORDER, doCreateOrder);
  yield takeLatest(CREATE_ORDER_ITEM, doCreateOrderItem);
}
