import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Data } from '@angular/router';
import { debounceTime, distinctUntilChanged, map, Observable, startWith, Subject, takeUntil, tap } from 'rxjs';
import { IProduct } from '../../shared/products/product.interface';
import { ProductsStoreService } from '../../shared/products/products-store.service';

@Component({
	selector: 'app-products-list',
	templateUrl: './products-list.component.html',
	styleUrls: ['./products-list.component.less'],
	// providers: [
	// 	{
	// 		provide: 'name',
	// 		useValue: 'ProductsListComponent',
	// 	},
	// ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsListComponent implements OnInit, OnDestroy {
	readonly products$ = this.productsStoreService.products$;
	// readonly products$ = this.activatedRoute.data.pipe(
	// 	map<Data, IProduct[]>(({products}) => products)
	// );

	serachText = '';

	readonly serachTextControl = new FormControl('');
	readonly searchedText$ = this.serachTextControl.valueChanges.pipe(
		startWith(this.serachTextControlValue),
		debounceTime(300),
		distinctUntilChanged(),
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
	) // @Inject('name') private readonly name: string,
	{
		// console.log(this.name);
	}

	ngOnInit() {
		this.listenSubCategoryIdFromUrl();

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

	private listenSubCategoryIdFromUrl() {
		this.activatedRoute.paramMap
			.pipe(
				map((paramMap) => paramMap.get('subCategoryId')),
				takeUntil(this.destroy$),
			)
			.subscribe((subCategoryId) => {
				this.productsStoreService.loadProducts(subCategoryId);
			});
	}
}
