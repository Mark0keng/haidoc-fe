import { takeLatest, call, put } from 'redux-saga/effects';
import { setLoading } from '@containers/App/actions';
import { createOrder, createOrderItem, getOrderItem, getPayment, getUserOrder, updateOrder } from '@domain/api';
import {
  CREATE_ORDER,
  CREATE_ORDER_ITEM,
  GET_ORDER_ITEM,
  GET_PAYMENT,
  GET_USER_ORDER,
  UPDATE_ORDER,
} from './constants';

function* doGetUserOrder({ query, cbSuccess, cbFailed }) {
  yield put(setLoading(true));
  try {
    const order = yield call(getUserOrder, query);

    cbSuccess && cbSuccess(order?.data);
  } catch (error) {
    if (error?.response?.data?.output?.payload) {
      cbFailed && cbFailed(error.response.data.output.payload);
    }
  }
  yield put(setLoading(false));
}

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

function* doUpdateOrder({ payload, orderId, cbSuccess, cbFailed }) {
  yield put(setLoading(true));
  try {
    yield call(updateOrder, payload, orderId);

    cbSuccess && cbSuccess();
  } catch (error) {
    if (error?.response?.data?.output?.payload) {
      cbFailed && cbFailed(error.response.data.output.payload);
    }
  }
  yield put(setLoading(false));
}

function* doGetOrderItem({ query, cbSuccess, cbFailed }) {
  yield put(setLoading(true));
  try {
    const orderItem = yield call(getOrderItem, query);

    cbSuccess && cbSuccess(orderItem?.data);
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

function* doGetPayment({ query, cbSuccess, cbFailed }) {
  yield put(setLoading(true));
  try {
    const payment = yield call(getPayment, query);

    cbSuccess && cbSuccess(payment?.token);
  } catch (error) {
    if (error?.response?.data?.output?.payload) {
      cbFailed && cbFailed(error.response.data.output.payload);
    }
  }
  yield put(setLoading(false));
}

export default function* orderSaga() {
  yield takeLatest(GET_USER_ORDER, doGetUserOrder);
  yield takeLatest(CREATE_ORDER, doCreateOrder);
  yield takeLatest(UPDATE_ORDER, doUpdateOrder);
  yield takeLatest(GET_ORDER_ITEM, doGetOrderItem);
  yield takeLatest(CREATE_ORDER_ITEM, doCreateOrderItem);
  yield takeLatest(GET_PAYMENT, doGetPayment);
}
