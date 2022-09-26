import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IProduct } from '../../shared/products/product.interface';
import { productsMock } from '../../shared/products/products.mock';

@Component({
	selector: 'app-products-list',
	templateUrl: './products-list.component.html',
	styleUrls: ['./products-list.component.less'],
})
export class ProductsListComponent {
	products: IProduct[] | null = null;

	constructor() {
		setTimeout(() => {
			this.products = productsMock;
		}, 3000);
	}
}
