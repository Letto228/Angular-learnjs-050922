import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { EMPTY, map, NEVER, Observable, of, switchMap, tap } from 'rxjs';
import { ProductsApiService } from '../../shared/products/products-api.service';
import { IState } from '../reducer';
import { addProducts, loadProducts } from './products.actions';

@Injectable()
export class ProductsEffects {
	constructor(
		private readonly actions$: Actions,
		private readonly store$: Store<IState>,
		private readonly productsApiService: ProductsApiService,
	) {}

	loadProducts$ = createEffect(() =>
		this.actions$.pipe(
			ofType(loadProducts),
			switchMap(({ subCategoryId }) =>
				this.productsApiService.getProducts$(subCategoryId).pipe(
					// tap(products => {
					//     this.store$.dispatch(addProducts(products));
					// }),
					map((products) => addProducts(products)),
				),
			),
		),
	);

	addProducts$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(addProducts),
				map(({ products }) => products.length),
				tap((len) => {
					console.log(len);
				}),
			),
		{ dispatch: false },
	);
}
