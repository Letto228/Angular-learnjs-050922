import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, of, switchMap, take, tap } from 'rxjs';
import { productMock } from '../../shared/products/product.mock';
import { ProductsApiService } from '../../shared/products/products-api.service';
import { ProductsStoreService } from '../../shared/products/products-store.service';

@Component({
	selector: 'app-product',
	templateUrl: './product.component.html',
	styleUrls: ['./product.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent {
	readonly product$ = this.activatedRoute.paramMap.pipe(
		map((paramMap) => paramMap.get('id')),
		filter(Boolean),
		tap((id) => {
			this.productsStoreService.loadProduct(id);
		}),
		switchMap((id) => this.productsStoreService.getProduct$(id)),
	);

	constructor(
		private readonly productsStoreService: ProductsStoreService,
		private readonly router: Router,
		readonly activatedRoute: ActivatedRoute,
	) {}

	// ngOnInit() {
	// console.log(this.activatedRoute.snapshot.paramMap.get('id'));
	// setTimeout(() => {
	// 	this.router.navigate(['product', '480-gb-vnesnij-ssd-verbatim-vx500-47443'])
	// }, 3000)
	// }

	navigate(segment: string) {
		this.router.navigate([segment], { relativeTo: this.activatedRoute });
	}

	navigateByUrl(segment: string) {
		this.router.navigateByUrl(this.router.createUrlTree([segment], { relativeTo: this.activatedRoute }));
	}
}
