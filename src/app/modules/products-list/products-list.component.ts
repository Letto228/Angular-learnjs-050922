import { ApplicationRef, ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IProduct } from '../../shared/products/product.interface';
import { productsMock } from '../../shared/products/products.mock';

@Component({
	selector: 'app-products-list',
	templateUrl: './products-list.component.html',
	styleUrls: ['./products-list.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsListComponent {
	products: IProduct[] | null = null;

	constructor(
		private readonly changeDetectorRef: ChangeDetectorRef,
		private readonly applicationRef: ApplicationRef,
	) {
		// this.changeDetectorRef.detach();

		setTimeout(() => {
			this.products = productsMock;
			this.changeDetectorRef.markForCheck();

			// this.changeDetectorRef.detectChanges();

			setInterval(() => {
				this.changeDetectorRef.detectChanges();
			}, 1000);

			// setInterval(() => {
			// 	// this.applicationRef.tick();
			// 	console.log('tick');
			// }, 300)
			// this.changeDetectorRef.markForCheck();
		}, 2000);

		// setTimeout(() => {
		// 	this.changeDetectorRef.reattach();
		// }, 5000)

		// setTimeout(() => {
		// 	// this.products = [...productsMock];
		// 	this.products = productsMock.map(item => ({...item}));
		// }, 4000);
	}

	// count = 0

	// ngDoCheck() {
	// 	console.log('ngDoCheck');
	// 	this.count = this.count + 1;

	// 	console.log(this.count);

	// 	if (this.count === 40) {
	// 		this.changeDetectorRef.markForCheck()
	// 	}
	// }

	trackBy(_index: number, item: IProduct) {
		return item._id;
	}

	getJson(product: any): string {
		console.log('getJson Method');

		return JSON.stringify(product);
	}
}
