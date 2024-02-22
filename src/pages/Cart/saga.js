import { takeLatest, call, put } from 'redux-saga/effects';
import { setLoading } from '@containers/App/actions';
import { getCart, getUserCart, updateCart } from '@domain/api';
import { setCart } from './actions';
import { GET_CART, GET_USER_CART, UPDATE_CART } from './constants';

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

    yield put(setCart(cart.data));
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

export default function* cartSaga() {
  yield takeLatest(GET_CART, doGetCart);
  yield takeLatest(GET_USER_CART, doGetUserCart);
  yield takeLatest(UPDATE_CART, doUpdateCart);
}
