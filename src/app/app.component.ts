import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.less'],
})
export class AppComponent {
	onHeaderClick() {
		console.log(window.location);
	}

	onKeyDown(event: Event) {
		console.log(event);
	}
}
