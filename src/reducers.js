import { combineReducers } from 'redux';

import appReducer, { storedKey as storedAppState } from '@containers/App/reducer';
import clientReducer, { storedKey as storedClientState } from '@containers/Client/reducer';
import productReducer, { storedKey as storedProductState } from '@pages/ProductDashboard/reducer';
import productDetailReducer, { storedKey as storedProductDetailState } from '@pages/ProductDetail/reducer';
import addressReducer, { storedKey as storedAddressState } from '@pages/Address/reducer';
import cartReducer, { storedKey as storedCartState } from '@pages/Cart/reducer';
import languageReducer from '@containers/Language/reducer';

import { mapWithPersistor } from './persistence';

const storedReducers = {
  app: { reducer: appReducer, whitelist: storedAppState },
  client: { reducer: clientReducer, whitelist: storedClientState },
  product: { reducer: productReducer, whitelist: storedProductState },
  productDetail: { reducer: productDetailReducer, whitelist: storedProductDetailState },
  address: { reducer: addressReducer, whitelist: storedAddressState },
  cart: { reducer: cartReducer, whitelist: storedCartState },
};

const temporaryReducers = {
  language: languageReducer,
};

const createReducer = () => {
  const coreReducer = combineReducers({
    ...mapWithPersistor(storedReducers),
    ...temporaryReducers,
  });
  const rootReducer = (state, action) => coreReducer(state, action);
  return rootReducer;
};

export default createReducer;
