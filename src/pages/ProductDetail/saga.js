import { takeLatest, call, put } from 'redux-saga/effects';
import { setLoading } from '@containers/App/actions';
import { createCart, getProductById } from '@domain/api';
import { setOneProduct } from './actions';
import { ADD_TO_CART, GET_ONE_PRODUCT } from './constants';

function* doGetOneProduct({ productId, cbSuccess, cbFailed }) {
  yield put(setLoading(true));
  try {
    const product = yield call(getProductById, productId);
    yield put(setOneProduct(product.data));
    cbSuccess && cbSuccess(product.data);
  } catch (error) {
    if (error?.response?.data?.output?.payload) {
      cbFailed && cbFailed(error.response.data.output.payload);
    }
  }
  yield put(setLoading(false));
}

function* doAddToCart({ payload, cbSuccess, cbFailed }) {
  yield put(setLoading(true));
  try {
    yield call(createCart, payload);
    cbSuccess && cbSuccess();
  } catch (error) {
    if (error?.response?.data?.output?.payload) {
      cbFailed && cbFailed(error.response.data.output.payload);
    }
  }
  yield put(setLoading(false));
}

export default function* productDetailSaga() {
  yield takeLatest(GET_ONE_PRODUCT, doGetOneProduct);
  yield takeLatest(ADD_TO_CART, doAddToCart);
}
