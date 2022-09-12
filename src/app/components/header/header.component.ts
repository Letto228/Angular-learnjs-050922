import { Component } from '@angular/core';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.less'],
})
export class HeaderComponent {
	readonly title = 'Angular-learnjs-050922';
	// readonly faviconSrc = '../../../favicon.ico';
	readonly shopIconSrc = 'https://funart.pro/uploads/posts/2021-03/1617051856_43-p-oboi-gornoe-ozero-45.jpg';

	// isDisabled = false;
	// iconSize = 100;

	constructor() {
		// setTimeout(() => {
		//   this.isDisabled = true;
		// }, 3000)
	}

	onClick() {
		console.log('Clicked');
	}

	onShare() {
		console.log('Share');
	}
}
