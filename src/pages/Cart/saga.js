import { takeLatest, call, put } from 'redux-saga/effects';
import { setLoading } from '@containers/App/actions';
import { getCart, getManyCart } from '@domain/api';
import { setCart } from './actions';
import { GET_CART, GET_MANY_CART } from './constants';

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

function* doGetManyCart({ query, cbSuccess, cbFailed }) {
  yield put(setLoading(true));
  try {
    const cart = yield call(getManyCart, query);
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
  yield takeLatest(GET_MANY_CART, doGetManyCart);
}
