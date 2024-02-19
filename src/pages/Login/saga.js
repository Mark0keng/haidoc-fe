import { takeLatest, call, put } from 'redux-saga/effects';
import { setLoading } from '@containers/App/actions';
import { login } from '@domain/api';
import { LOGIN } from './constants';
import { setLogin, setToken } from '@containers/Client/actions';

function* doLogin({ payload, cbSuccess, cbFailed }) {
  yield put(setLoading(true));
  try {
    const { token } = yield call(login, payload);
    yield put(setLogin(true));
    yield put(setToken(token));
    cbSuccess && cbSuccess();
  } catch (error) {
    if (error?.response?.data?.output?.payload) {
      cbFailed && cbFailed(error.response.data.output.payload);
    }
  }
  yield put(setLoading(false));
}

export default function* loginSaga() {
  yield takeLatest(LOGIN, doLogin);
}
