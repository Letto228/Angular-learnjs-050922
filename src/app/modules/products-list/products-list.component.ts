import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject, map, Observable, Subject, takeUntil } from 'rxjs';
import { BrandsService } from '../../shared/brands/brands.service';
import { IProduct } from '../../shared/products/product.interface';
import { loadProducts } from '../../store/products/products.actions';
import { products } from '../../store/products/products.selectors';
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
	readonly products$ = this.store$.pipe(select(products));

	private readonly _searchText$ = new BehaviorSubject<string>('');
	private readonly destroy$ = new Subject<void>();

	constructor(
		private readonly activatedRoute: ActivatedRoute,
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
		this._searchText$.next(filter.name);
	}

	private listenSubCategoryIdFromUrl() {
		this.activatedRoute.paramMap
			.pipe(
				map((paramMap) => paramMap.get('subCategoryId')),
				takeUntil(this.destroy$),
			)
			.subscribe((subCategoryId) => {
				this.store$.dispatch(loadProducts(subCategoryId));
				this.brandsService.loadBrands(subCategoryId);
			});
	}
}
