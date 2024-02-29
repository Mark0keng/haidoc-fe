import { takeLatest, call, put } from 'redux-saga/effects';
import { setLoading } from '@containers/App/actions';
import { createProduct, deleteProduct, getProduct, updateProduct } from '@domain/api';
import { CREATE_PRODUCT, DELETE_PRODUCT, GET_ALL_PRODUCT, UPDATE_PRODUCT } from './constants';
import { setAllProduct } from './actions';

function* doGetAllProduct({ query, cbSuccess, cbFailed }) {
  yield put(setLoading(true));
  try {
    const products = yield call(getProduct, query);
    yield put(setAllProduct(products.data));
    cbSuccess && cbSuccess(products.data);
  } catch (error) {
    if (error?.response?.data?.output?.payload) {
      cbFailed && cbFailed(error.response.data.output.payload);
    }
  }
  yield put(setLoading(false));
}

function* doCreateProduct({ payload, cbSuccess, cbFailed }) {
  yield put(setLoading(true));
  try {
    yield call(createProduct, payload);

    // const products = yield call(getProduct);
    // yield put(setAllProduct(products.data));
    cbSuccess && cbSuccess();
  } catch (error) {
    if (error?.response?.data?.output?.payload) {
      cbFailed && cbFailed(error.response.data.output.payload);
    }
  }
  yield put(setLoading(false));
}

function* doUpdateProduct({ payload, productId, cbSuccess, cbFailed }) {
  yield put(setLoading(true));
  try {
    yield call(updateProduct, payload, productId);

    const products = yield call(getProduct);
    yield put(setAllProduct(products.data));
    cbSuccess && cbSuccess();
  } catch (error) {
    if (error?.response?.data?.output?.payload) {
      cbFailed && cbFailed(error.response.data.output.payload);
    }
  }
  yield put(setLoading(false));
}

function* doDeleteProduct({ productId, cbSuccess }) {
  yield put(setLoading(true));
  try {
    yield call(deleteProduct, productId);

    const products = yield call(getProduct);
    yield put(setAllProduct(products.data));
    cbSuccess && cbSuccess();
  } catch (error) {
    if (error?.response?.data?.output?.payload) {
      cbFailed && cbFailed(error.response.data.output.payload);
    }
  }
  yield put(setLoading(false));
}

export default function* productDashboardSaga() {
  yield takeLatest(GET_ALL_PRODUCT, doGetAllProduct);
  yield takeLatest(CREATE_PRODUCT, doCreateProduct);
  yield takeLatest(UPDATE_PRODUCT, doUpdateProduct);
  yield takeLatest(DELETE_PRODUCT, doDeleteProduct);
}
