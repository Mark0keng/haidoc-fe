import { takeLatest, call, put } from 'redux-saga/effects';
import { setLoading } from '@containers/App/actions';
import { register } from '@domain/api';
import { REGISTER } from './constants';

function* doRegister({ payload, cbSuccess, cbFailed }) {
  yield put(setLoading(true));
  try {
    yield call(register, payload);
    cbSuccess && cbSuccess();
  } catch (error) {
    if (error?.response?.data?.output?.payload) {
      cbFailed && cbFailed(error.response.data.output.payload);
    }
  }
  yield put(setLoading(false));
}

export default function* registerSaga() {
  yield takeLatest(REGISTER, doRegister);
}
