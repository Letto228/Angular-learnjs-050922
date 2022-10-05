import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { CategoriesStoreService } from '../../shared/categories/categories-store.service';
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
		private readonly router: Router,
		private readonly activatedRoute: ActivatedRoute,
	) {}

	ngOnInit() {
		this.subCategoryId$.subscribe(console.log);

		this.productsStoreService.loadProducts();
	}

	trackBy(_index: number, item: IProduct) {
		return item._id;
	}

	navigate() {
		// this.router.navigate(['/product', 'id']);
		this.router.navigate(['/product/id']);
		// this.router.navigateByUrl('/product/id');
	}
}
