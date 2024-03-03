import { takeLatest, call, put } from 'redux-saga/effects';
import { setLoading } from '@containers/App/actions';
import { changePassword } from '@domain/api';
import { CHANGE_PASSWORD } from './constants';

function* doChangePassword({ payload, cbSuccess, cbFailed }) {
  yield put(setLoading(true));
  try {
    const { message } = yield call(changePassword, payload);

    cbSuccess && cbSuccess(message);
  } catch (error) {
    if (error?.response?.data?.output?.payload) {
      cbFailed && cbFailed(error.response.data.output.payload);
    }
  }
  yield put(setLoading(false));
}

export default function* changePasswordSaga() {
  yield takeLatest(CHANGE_PASSWORD, doChangePassword);
}
