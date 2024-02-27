import { takeLatest, call, put } from 'redux-saga/effects';
import { setLoading } from '@containers/App/actions';
import { getDoctor } from '@domain/api';
import { GET_DOCTOR } from './constants';

function* doGetDoctor({ query, cbSuccess, cbFailed }) {
  yield put(setLoading(true));
  try {
    const doctor = yield call(getDoctor, query);

    cbSuccess && cbSuccess(doctor?.data);
  } catch (error) {
    if (error?.response?.data?.output?.payload) {
      cbFailed && cbFailed(error.response.data.output.payload);
    }
  }
  yield put(setLoading(false));
}

export default function* doctorSaga() {
  yield takeLatest(GET_DOCTOR, doGetDoctor);
}
