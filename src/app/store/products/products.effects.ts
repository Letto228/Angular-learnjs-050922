import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs';
import { ProductsApiService } from '../../shared/products/products-api.service';
import { IState } from '../reducer';
import { addProducts, loadProducts } from './products.actions';

@Injectable()
export class ProductsEffects {
	constructor(private readonly actions$: Actions, private readonly productsApiService: ProductsApiService) {}

	loadProducts$ = createEffect(() =>
		this.actions$.pipe(
			ofType(loadProducts),
			switchMap(({ subCategoryId }) =>
				this.productsApiService.getProducts$(subCategoryId).pipe(map((products) => addProducts(products))),
			),
		),
	);
}
