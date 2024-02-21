import { takeLatest, call, put } from 'redux-saga/effects';
import { setLoading } from '@containers/App/actions';
import { getCart } from '@domain/api';
import { GET_CART } from './actions';

function* doGetCart({ query, cbSuccess, cbFailed }) {
  yield put(setLoading(true));
  try {
    const cart = yield call(getCart, query);
    console.log(cart);
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
}
