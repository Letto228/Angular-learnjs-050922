import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { IProduct } from '../../shared/products/product.interface';
import { ProductsStoreService } from '../../shared/products/products-store.service';

@Component({
	selector: 'app-products-list',
	templateUrl: './products-list.component.html',
	styleUrls: ['./products-list.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsListComponent implements OnInit {
	readonly products$ = this.productsStoreService.products$;

	private readonly subCategoryId$ = this.activatedRoute.paramMap.pipe(
		map((paramMap) => paramMap.get('subCategoryId')),
	);

	constructor(
		private readonly productsStoreService: ProductsStoreService,
		private readonly activatedRoute: ActivatedRoute,
	) {}

	ngOnInit() {
		this.subCategoryId$.subscribe(console.log);

		this.productsStoreService.loadProducts();
	}

	trackBy(_index: number, item: IProduct) {
		return item._id;
	}
}
