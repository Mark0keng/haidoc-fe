import { produce } from 'immer';
import { SET_ADDRESS } from './constants';

export const initialState = {
  address: null,
};

export const storedKey = ['address'];

const addressReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_ADDRESS:
        draft.address = action.address;
        break;
    }
  });

export default addressReducer;
