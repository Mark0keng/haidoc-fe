import { takeLatest, call, put } from 'redux-saga/effects';
import { setLoading } from '@containers/App/actions';
import { createProduct, getProduct } from '@domain/api';
import { CREATE_PRODUCT, GET_ALL_PRODUCT } from './constants';
import { setAllProduct } from './actions';

function* doGetAllProduct({ query, cbSuccess, cbFailed }) {
  yield put(setLoading(true));
  try {
    const products = yield call(getProduct, query);
    yield put(setAllProduct(products));
    cbSuccess && cbSuccess();
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
}
