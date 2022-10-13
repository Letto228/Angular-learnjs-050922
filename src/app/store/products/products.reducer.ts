import { createReducer, on } from '@ngrx/store';
import { addProducts } from './products.actions';
import { productsAdapter, productsIntialState } from './products.state';

export const productsReducer = createReducer(
	productsIntialState,
	on(addProducts, (state, { products }) => productsAdapter.setAll(products, state)),
);
