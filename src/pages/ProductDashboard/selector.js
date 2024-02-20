import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectProductState = (state) => state.product || initialState;

export const selectProducts = createSelector(selectProductState, (state) => state.products);
