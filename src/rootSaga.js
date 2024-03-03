import { all } from 'redux-saga/effects';

import appSaga from '@containers/App/saga';
import registerSaga from '@pages/Register/saga';
import loginSaga from '@pages/Login/saga';
import productDashboardSaga from '@pages/ProductDashboard/saga';
import productDetailSaga from '@pages/ProductDetail/saga';
import cartSaga from '@pages/Cart/saga';
import addressSaga from '@pages/Address/saga';
import orderSaga from '@pages/Order/saga';
import doctorSaga from '@pages/Doctor/saga';
import chatSaga from '@pages/Chat/saga';
import chatOrderSaga from '@pages/ChatOrder/saga';
import forgotPasswordSaga from '@pages/ForgotPassword/saga';
import changePasswordSaga from '@pages/ChangePassword/saga';

export default function* rootSaga() {
  yield all([
    appSaga(),
    registerSaga(),
    loginSaga(),
    forgotPasswordSaga(),
    changePasswordSaga(),
    productDashboardSaga(),
    productDetailSaga(),
    addressSaga(),
    cartSaga(),
    orderSaga(),
    doctorSaga(),
    chatSaga(),
    chatOrderSaga(),
  ]);
}
