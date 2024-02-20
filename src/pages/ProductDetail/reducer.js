import { produce } from 'immer';
import { SET_ONE_PRODUCT } from './constants';

export const initialState = {
  product: {},
};

export const storedKey = ['product'];

const productDetailReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_ONE_PRODUCT:
        draft.product = action.product;
        break;
    }
  });

export default productDetailReducer;
