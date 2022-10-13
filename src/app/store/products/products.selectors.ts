import { Dictionary } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IProduct } from '../../shared/products/product.interface';
import { IProductsState, productsAdapter, PRODUCTS_FEATURE } from './products.state';

export const productsFeatureSelector = createFeatureSelector<IProductsState>(PRODUCTS_FEATURE);

export const { selectAll: products, selectEntities } = productsAdapter.getSelectors(productsFeatureSelector);

export const productsById = (id: string) =>
	createSelector(selectEntities, (products: Dictionary<IProduct>) => products[id]);
