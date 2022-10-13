import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { IProduct } from '../../shared/products/product.interface';

export const PRODUCTS_FEATURE = 'products';

// export interface IProductsState {
//     entities: {[id: IProduct['_id']]: IProduct} | Record<IProduct['_id'], IProduct> | Dictionary<IProduct>,
//     ids: Array<IProduct['_id']>,
// }

export interface IProductsState extends EntityState<IProduct> {}

export const productsAdapter = createEntityAdapter<IProduct>({
	// 'id'
	selectId: (product) => product._id,
	sortComparer: (a, b) => {
		if (a.name > b.name) {
			return 1;
		}

		if (a.name < b.name) {
			return -1;
		}

		return 0;
	},
});

export const productsIntialState: IProductsState = productsAdapter.getInitialState();
