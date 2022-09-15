import { Component } from '@angular/core';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.less'],
})
export class HeaderComponent {
	readonly title = 'Angular-learnjs-050922';
	readonly shopIconSrc = '../../../favicon.ico';

	onClick() {
		console.log('Clicked');
	}

	onShare() {
		console.log('Share');
	}
}
