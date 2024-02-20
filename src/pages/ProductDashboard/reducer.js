import { produce } from 'immer';
import { SET_ALL_PRODUCT } from './constants';

export const initialState = {
  products: [],
};

export const storedKey = ['products'];

const productReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_ALL_PRODUCT:
        draft.products = action.products;
        break;
    }
  });

export default productReducer;
