import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, map, Observable, startWith, Subject, takeUntil, tap } from 'rxjs';
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

	// counter = 5;

	// readonly counterControl = new FormControl(5);

	serachText = '';

	readonly serachTextControl = new FormControl('', {
		validators: [Validators.minLength(3), isStringValdator],
		// asyncValidators: [this.isStringAsyncValdator.bind(this)],
		// updateOn: 'submit',
	});
	readonly searchedText$ = this.serachTextControl.valueChanges.pipe(
		startWith(this.serachTextControlValue),
		debounceTime(300),
		distinctUntilChanged(),
	);
	readonly errors$ = this.serachTextControl.statusChanges.pipe(
		// tap(console.log),
		map((status) => (status !== 'PENDING' ? this.serachTextControl.errors : null)),
	);

	get serachTextControlValue(): string {
		return (this.serachTextControl.value as string) || '';
	}

	getSerachText(serachText: string | null, defaultText: string): string {
		return serachText || defaultText;
	}

	private readonly destroy$ = new Subject<void>();

	constructor(
		private readonly productsStoreService: ProductsStoreService,
		private readonly activatedRoute: ActivatedRoute,
		private readonly router: Router,
		private readonly changeDetectorRef: ChangeDetectorRef,
		private readonly brandsService: BrandsService,
	) {}

	ngOnInit() {
		this.listenSubCategoryIdFromUrl();
		// this.serachTextControl.disable();
		// this.serachTextControl.enable();

		// console.log(
		// 	this.serachTextControl.valid,
		// 	this.serachTextControl.touched,
		// 	this.serachTextControl.dirty,
		// );

		// setTimeout(() => {
		// 	// this.serachTextControl.setValue(this.serachTextControl.value);
		// 	// this.serachTextControl.updateValueAndValidity();
		// }, 1000)
	}

	ngOnDestroy() {
		this.destroy$.next();
		this.destroy$.complete();
	}

	trackBy(_index: number, item: IProduct) {
		return item._id;
	}

	onFilterChange(filter: IProductsFilter) {
		this.router.navigate(['./'], {
			relativeTo: this.activatedRoute,
			queryParams: filter,
		});
	}

	private isStringAsyncValdator(control: AbstractControl): Observable<ValidationErrors | null> {
		return isStringAsyncValdator(control).pipe(
			tap(() => {
				this.changeDetectorRef.markForCheck();
			}),
		);
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
