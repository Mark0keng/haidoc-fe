import { takeLatest, call, put } from 'redux-saga/effects';
import { setLoading } from '@containers/App/actions';
import { forgotPassword } from '@domain/api';
import { GET_EMAIL_FORGOT_PASSWORD } from './constants';

function* doGetEmailForgotPassword({ payload, cbSuccess, cbFailed }) {
  yield put(setLoading(true));
  try {
    const { message } = yield call(forgotPassword, payload);

    cbSuccess && cbSuccess(message);
  } catch (error) {
    if (error?.response?.data?.output?.payload) {
      cbFailed && cbFailed(error.response.data.output.payload);
    }
  }
  yield put(setLoading(false));
}

export default function* forgotPasswordSaga() {
  yield takeLatest(GET_EMAIL_FORGOT_PASSWORD, doGetEmailForgotPassword);
}
