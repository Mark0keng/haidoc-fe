import { produce } from 'immer';
import { SET_CART } from './constants';

export const initialState = {
  cart: null,
};

export const storedKey = ['cart'];

const cartReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_CART:
        draft.cart = action.cart;
        break;
    }
  });

export default cartReducer;
