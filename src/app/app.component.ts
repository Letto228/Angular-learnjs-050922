import { Component, ViewEncapsulation } from '@angular/core';
import { productMock } from './shared/products/product.mock';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.less'],
	// encapsulation: ViewEncapsulation.ShadowDom,
	// interpolation: ['{{', '}}'],
})
export class AppComponent {
	title = 'Angular-learnjs-050922';
	product = productMock;

	// readonly window: Window = window;

	// getLocation(): Location {
	// 	return window.location;
	// }
	onHeaderClick() {
		console.log(window.location);
	}
	onKeyDown(event: Event) {
		console.log(event);
	}
}
