import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
import { IProductsFilter } from './products-filter.interface';

@Component({
	selector: 'app-products-list',
	templateUrl: './products-list.component.html',
	styleUrls: ['./products-list.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsListComponent implements OnInit, OnDestroy {
	readonly products$ = this.productsStoreService.products$;
	readonly brands$ = this.brandsService.brands$;

	private readonly _searchText$ = new BehaviorSubject<string>('');
	private readonly destroy$ = new Subject<void>();

	constructor(
		private readonly productsStoreService: ProductsStoreService,
		private readonly activatedRoute: ActivatedRoute,
		// private readonly router: Router,
		private readonly brandsService: BrandsService,
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
				this.productsStoreService.loadProducts(subCategoryId);
				this.brandsService.loadBrands(subCategoryId);
			});
	}
}
