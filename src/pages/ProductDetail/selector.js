import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectProductDetailState = (state) => state.productDetail || initialState;

export const selectProduct = createSelector(selectProductDetailState, (state) => state.product);
