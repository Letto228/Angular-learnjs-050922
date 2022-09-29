import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	Host,
	Inject,
	OnInit,
	Optional,
	Self,
	SkipSelf,
} from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from '../../shared/base-url/base-url.token';
import { IProduct } from '../../shared/products/product.interface';
import { ProductsStoreService } from '../../shared/products/products-store.service';
import { productsMock } from '../../shared/products/products.mock';

@Component({
	selector: 'app-products-list',
	templateUrl: './products-list.component.html',
	styleUrls: ['./products-list.component.less'],
	providers: [
		{
			provide: 'name',
			useValue: 'ProductsListComponent',
		},
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsListComponent implements OnInit {
	products$!: Observable<IProduct[] | null>;

	// private readonly productsStoreService = new ProductsStoreService(
	// 	new ProductsApiService(

	// 	),
	// 	httpService
	// );

	constructor(
		// @Inject(ChangeDetectorRef) private readonly changeDetectorRef: ChangeDetectorRef,
		// private readonly changeDetectorRef: ChangeDetectorRef,
		private readonly productsStoreService: ProductsStoreService,
		// @Inject('ProductsStoreService') private readonly productsStoreServiceStr: ProductsStoreService,
		// @Inject('products$') readonly products$: Observable<IProduct[] | null>,
		@Optional() @Self() @Inject('name') private readonly name: string,
		@Optional() @Host() @SkipSelf() @Inject('name') private readonly parentName: string,
	) // @SkipSelf() @Inject('name') private readonly parentName: string,
	// @Optional() @Inject('tokenFirst') private readonly token: string,
	{
		// console.log(this.productsStoreService === this.productsStoreServiceStr);
		console.log(this.name);
		console.log(this.parentName);
		// console.log(this.token);
	}

	ngOnInit() {
		this.products$ = this.productsStoreService.products$;

		this.productsStoreService.loadProducts();
		// setTimeout(() => {
		// 	this.products = productsMock;
		// 	this.changeDetectorRef.markForCheck();
		// }, 2000);
	}

	trackBy(_index: number, item: IProduct) {
		return item._id;
	}
}
