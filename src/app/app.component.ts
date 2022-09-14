import { Component, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.less'],
	// encapsulation: ViewEncapsulation.ShadowDom,
	// interpolation: ['{{', '}}'],
})
export class AppComponent {
	title = 'Angular-learnjs-050922';

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

    onProductCardClick() {
        console.log('Product card clicked!');
    }
}
