import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import {
	BehaviorSubject,
	debounceTime,
	distinctUntilChanged,
	map,
	Observable,
	startWith,
	Subject,
	takeUntil,
	tap,
} from 'rxjs';
import { BrandsService } from '../../shared/brands/brands.service';
import { IProduct } from '../../shared/products/product.interface';
import { ProductsStoreService } from '../../shared/products/products-store.service';
import { isStringAsyncValdator } from '../../shared/validators/is-string-async.validator';
import { isStringValdator } from '../../shared/validators/is-string.validator';
import { loadProducts } from '../../store/products/products.actions';
import { products, productsFeatureSelector } from '../../store/products/products.selectors';
import { PRODUCTS_FEATURE } from '../../store/products/products.state';
import { IState } from '../../store/reducer';
import { IProductsFilter } from './products-filter.interface';

@Component({
	selector: 'app-products-list',
	templateUrl: './products-list.component.html',
	styleUrls: ['./products-list.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsListComponent implements OnInit, OnDestroy {
	readonly brands$ = this.brandsService.brands$;
	// readonly products$ = this.productsStoreService.products$;
	readonly products$ = this.store$.pipe(
		// tap<IState>(console.log),
		select(products),
	);

	private readonly _searchText$ = new BehaviorSubject<string>('');
	private readonly destroy$ = new Subject<void>();

	constructor(
		private readonly activatedRoute: ActivatedRoute,
		// private readonly router: Router,
		private readonly brandsService: BrandsService,
		private readonly store$: Store<IState>,
	) {}

	get searchText$(): Observable<string> {
		return this._searchText$.asObservable();
	}

	ngOnInit() {
		this.listenSubCategoryIdFromUrl();
	}

	ngOnDestroy() {
		this.destroy$.next();
		this.destroy$.complete();
	}

	trackBy(_index: number, item: IProduct) {
		return item._id;
	}

	onFilterChange(filter: IProductsFilter) {
		// this.router.navigate(['./'], {
		// 	relativeTo: this.activatedRoute,
		// 	queryParams: filter,
		// });
		this._searchText$.next(filter.name);
	}

	private listenSubCategoryIdFromUrl() {
		this.activatedRoute.paramMap
			.pipe(
				map((paramMap) => paramMap.get('subCategoryId')),
				takeUntil(this.destroy$),
			)
			.subscribe((subCategoryId) => {
				// this.productsStoreService.loadProducts(subCategoryId);
				this.store$.dispatch(loadProducts(subCategoryId));
				this.brandsService.loadBrands(subCategoryId);
			});
	}
}
