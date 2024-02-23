import { takeLatest, call, put } from 'redux-saga/effects';
import { setLoading } from '@containers/App/actions';
import { createAddress, getAddress, getCity, getProvince, updateAddress } from '@domain/api';
import { CREATE_ADDRESS, GET_ADDRESS, GET_CITY, GET_PROVINCE, UPDATE_ADDRESS } from './constants';
import { setAddress } from './actions';

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

function* dogetAddress({ query, cbSuccess, cbFailed }) {
  yield put(setLoading(true));
  try {
    const address = yield call(getAddress, query);
    yield put(setAddress(address?.data));
    cbSuccess && cbSuccess();
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

function* doUpdateAddress({ payload, cbSuccess, cbFailed }) {
  yield put(setLoading(true));
  try {
    yield call(updateAddress, payload);
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
  yield takeLatest(GET_ADDRESS, dogetAddress);
  yield takeLatest(CREATE_ADDRESS, doCreateAddress);
  yield takeLatest(UPDATE_ADDRESS, doUpdateAddress);
}
