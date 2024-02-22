import { produce } from 'immer';
import { SET_PROVINCE } from './constants';

export const initialState = {
  provinces: [],
};

export const storedKey = ['provinces'];

const addressReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_PROVINCE:
        draft.provinces = action.provinces;
        break;
    }
  });

export default addressReducer;
