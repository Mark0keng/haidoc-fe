import { produce } from 'immer';
import { SET_CART } from './actions';

export const initialState = {
  cart: [],
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
