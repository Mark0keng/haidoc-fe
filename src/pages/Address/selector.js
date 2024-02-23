import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectAdressState = (state) => state.address || initialState;

export const selectAddress = createSelector(selectAdressState, (state) => state.address);
