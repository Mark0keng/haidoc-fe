import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectAdressState = (state) => state.address || initialState;

export const selectProvince = createSelector(selectAdressState, (state) => state.province);
