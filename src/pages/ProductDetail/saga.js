import { takeLatest, call, put } from 'redux-saga/effects';
import { setLoading } from '@containers/App/actions';
import { getProductById } from '@domain/api';
import { setOneProduct } from './actions';
import { GET_ONE_PRODUCT } from './constants';

function* doGetOneProduct({ productId, cbSuccess, cbFailed }) {
  yield put(setLoading(true));
  try {
    const product = yield call(getProductById, productId);
    yield put(setOneProduct(product.data));
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
}
