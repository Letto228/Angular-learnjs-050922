import { createAction } from '@ngrx/store';
import { IProduct } from '../../shared/products/product.interface';

export enum ProductsActionTypes {
	LoadProducts = '[Products] Load products',
	AddProducts = '[Products] Add products',
}

export const loadProducts = createAction(ProductsActionTypes.LoadProducts, (subCategoryId: string | null) => ({
	subCategoryId,
}));
export const addProducts = createAction(ProductsActionTypes.AddProducts, (products: IProduct[]) => ({ products }));
// addProducts([...]) => {type: '[Products] Add products', products: [...]}

// Как было раньше

// export class AddProducts {
//     type: ProductsActionTypes.AddProducts

//     constructor(
//         readonly products: IProduct[]
//     ) {}
// }
// new AddProducts([...]) => {type: '[Products] Add products', products: [...]}
