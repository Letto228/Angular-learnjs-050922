import { Dictionary } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IProduct } from '../../shared/products/product.interface';
import { IProductsState, productsAdapter, PRODUCTS_FEATURE } from './products.state';

export const productsFeatureSelector = createFeatureSelector<IProductsState>(PRODUCTS_FEATURE);
// productsFeatureSelector = (state: IState) => state[PRODUCTS_FEATURE]

// export const products = createSelector(
//     productsFeatureSelector,
//     // (productsState: IProductsState) => productsState.ids.map(id => productsState.entities[id]),
//     ({entities, ids}) => ids.map(id => entities[id] as IProduct),
// )
// select((state => state[PRODUCTS_FEATURE].ids.map(id => state[PRODUCTS_FEATURE].entities[id] as IProduct))

// export const productsFilter = createSelector(
//     productsFeatureSelector,
//     ({filter}) => filter,
// )

// const {selectAll} = productsAdapter.getSelectors();

// export const products = createSelector(
//     productsFeatureSelector,
//     // ({entities, ids}) => ids.map(id => entities[id] as IProduct),
//     // state => selectAll(state),
//     selectAll
// )

// const {selectAll} = productsAdapter.getSelectors(productsFeatureSelector);

// export const products = selectAll;

export const { selectAll: products, selectEntities } = productsAdapter.getSelectors(productsFeatureSelector);

// const {selectIds, selectEntities} = productsAdapter.getSelectors(productsFeatureSelector);

// export const products = createSelector(
//     selectIds, // state => state[PRODUCTS_FEATURE].ids
//     selectEntities, // state => state[PRODUCTS_FEATURE].entities
//     // ids -> selectIds(state: IState) | entities -> selectEntities(state: IState)
//     (ids, entities) => ids.map(id => entities[id] as IProduct),
// )

// export const productsById = createSelector(
//     selectEntities,
//     (products: Dictionary<IProduct>, id: string) => products[id],
// )

export const productsById = (id: string) =>
	createSelector(selectEntities, (products: Dictionary<IProduct>) => products[id]);
