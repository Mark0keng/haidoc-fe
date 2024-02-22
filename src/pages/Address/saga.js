import { takeLatest, call, put } from 'redux-saga/effects';
import { setLoading } from '@containers/App/actions';
import { createAddress, getCity, getProvince } from '@domain/api';
import { CREATE_ADDRESS, GET_CITY, GET_PROVINCE } from './constants';

function* doGetProvince({ query, cbSuccess, cbFailed }) {
  yield put(setLoading(true));
  try {
    const provinces = yield call(getProvince, query);
    cbSuccess && cbSuccess(provinces.data);
  } catch (error) {
    if (error?.response?.data?.output?.payload) {
      cbFailed && cbFailed(error.response.data.output.payload);
    }
  }
  yield put(setLoading(false));
}

function* doGetCity({ query, cbSuccess, cbFailed }) {
  yield put(setLoading(true));
  try {
    const cities = yield call(getCity, query);
    cbSuccess && cbSuccess(cities.data);
  } catch (error) {
    if (error?.response?.data?.output?.payload) {
      cbFailed && cbFailed(error.response.data.output.payload);
    }
  }
  yield put(setLoading(false));
}

function* doCreateAddress({ payload, cbSuccess, cbFailed }) {
  yield put(setLoading(true));
  try {
    yield call(createAddress, payload);
    cbSuccess && cbSuccess();
  } catch (error) {
    if (error?.response?.data?.output?.payload) {
      cbFailed && cbFailed(error.response.data.output.payload);
    }
  }
  yield put(setLoading(false));
}

export default function* addressSaga() {
  yield takeLatest(GET_PROVINCE, doGetProvince);
  yield takeLatest(GET_CITY, doGetCity);
  yield takeLatest(CREATE_ADDRESS, doCreateAddress);
}
