import { takeLatest, call, put } from 'redux-saga/effects';
import { setLoading } from '@containers/App/actions';
import { deleteCart, getCart, getShippingCost, getUserCart, updateCart } from '@domain/api';
import { setCart } from './actions';
import { DELETE_CART, GET_CART, GET_SHIPPING_COST, GET_USER_CART, UPDATE_CART } from './constants';

function* doGetCart({ query, cbSuccess, cbFailed }) {
  yield put(setLoading(true));
  try {
    const cart = yield call(getCart, query);
    yield put(setCart(cart.data));
    cbSuccess && cbSuccess();
  } catch (error) {
    if (error?.response?.data?.output?.payload) {
      cbFailed && cbFailed(error.response.data.output.payload);
    }
  }
  yield put(setLoading(false));
}

function* doGetUserCart({ query, cbSuccess, cbFailed }) {
  yield put(setLoading(true));
  try {
    const cart = yield call(getUserCart, query);

    yield put(setCart(cart?.data ? cart.data : []));
    cbSuccess && cbSuccess(cart.data);
  } catch (error) {
    if (error?.response?.data?.output?.payload) {
      cbFailed && cbFailed(error.response.data.output.payload);
    }
  }
  yield put(setLoading(false));
}

function* doUpdateCart({ payload, cartId, cbSuccess, cbFailed }) {
  yield put(setLoading(true));
  try {
    yield call(updateCart, payload, cartId);

    const cart = yield call(getUserCart, {});
    yield put(setCart(cart.data));

    cbSuccess && cbSuccess();
  } catch (error) {
    if (error?.response?.data?.output?.payload) {
      cbFailed && cbFailed(error.response.data.output.payload);
    }
  }
  yield put(setLoading(false));
}

function* doDeleteCart({ cartId, cbSuccess, cbFailed }) {
  yield put(setLoading(true));
  try {
    yield call(deleteCart, cartId);

    cbSuccess && cbSuccess();
  } catch (error) {
    if (error?.response?.data?.output?.payload) {
      cbFailed && cbFailed(error.response.data.output.payload);
    }
  }
  yield put(setLoading(false));
}

function* doGetShippingCost({ query, cbSuccess, cbFailed }) {
  yield put(setLoading(true));
  try {
    const cost = yield call(getShippingCost, query);

    cbSuccess && cbSuccess(cost?.data?.results[0]?.costs[0]?.cost[0]?.value);
  } catch (error) {
    if (error?.response?.data?.output?.payload) {
      cbFailed && cbFailed(error.response.data.output.payload);
    }
  }
  yield put(setLoading(false));
}

export default function* cartSaga() {
  yield takeLatest(GET_CART, doGetCart);
  yield takeLatest(GET_USER_CART, doGetUserCart);
  yield takeLatest(UPDATE_CART, doUpdateCart);
  yield takeLatest(DELETE_CART, doDeleteCart);
  yield takeLatest(GET_SHIPPING_COST, doGetShippingCost);
}
