import { Component } from '@angular/core';
import { applicationConfigMock } from './shared/application-config/application-config.mock';
import {productMock} from "./shared/products/product.mock";
import {IProduct} from "./shared/products/product.interface";

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.less'],
})
export class AppComponent {
	readonly applicationConfig = applicationConfigMock;
	readonly product = productMock;

	// isSidenavOpened = true;

	onHeaderClick() {
		console.log(window.location);
	}

	// onMenuClick() {
	// 	this.isSidenavOpened = !this.isSidenavOpened;
	// }

	// onKeyDown(event: Event) {
	// 	console.log(event);
	// }
	onBuyClick(product: IProduct) {
		console.log('product', product);
	}
}
