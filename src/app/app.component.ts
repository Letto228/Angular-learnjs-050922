import { AfterViewInit, Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatListItem } from '@angular/material/list';
import { applicationConfigMock } from './shared/application-config/application-config.mock';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.less'],
})
export class AppComponent implements AfterViewInit {
	readonly applicationConfig = applicationConfigMock;

	// @ViewChildren('list1,list2,list3', {read: MatListItem})
	@ViewChildren(MatListItem, { read: MatListItem })
	private matListItems!: QueryList<MatListItem>;

	// isSidenavOpened = true;

	ngAfterViewInit() {
		console.log(this.matListItems);
	}

	onHeaderClick() {
		console.log(window.location);
	}

	// onMenuClick() {
	// 	this.isSidenavOpened = !this.isSidenavOpened;
	// }

	// onKeyDown(event: Event) {
	// 	console.log(event);
	// }
}
