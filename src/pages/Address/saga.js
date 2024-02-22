import { takeLatest, call, put } from 'redux-saga/effects';
import { setLoading } from '@containers/App/actions';
import { getProvince } from '@domain/api';
import { setCart } from './actions';
import { GET_PROVINCE } from './constants';

function* doGetProvince({ cbSuccess, cbFailed }) {
  yield put(setLoading(true));
  try {
    const provinces = yield call(getProvince);
    yield put(setCart(provinces?.rajaongkir?.results));
    cbSuccess && cbSuccess();
  } catch (error) {
    if (error?.response?.data?.output?.payload) {
      cbFailed && cbFailed(error.response.data.output.payload);
    }
  }
  yield put(setLoading(false));
}

export default function* cartSaga() {
  yield takeLatest(GET_PROVINCE, doGetProvince);
}
