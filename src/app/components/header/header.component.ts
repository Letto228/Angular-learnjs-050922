import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IApplicationConfig } from '../../shared/application-config/application-config.interface';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.less'],
})
export class HeaderComponent {
	// readonly title = 'Angular-learnjs-050922';
	// readonly shopIconSrc = '../../../favicon.ico';
	// @Input('applicationConfig') config: IApplicationConfig | undefined;
	@Input() applicationConfig: IApplicationConfig | undefined;

	@Output() menuClick = new EventEmitter<void>();

	onMenuClick(event: Event) {
		event.stopPropagation();
		this.menuClick.emit();
	}

	onShare() {
		console.log('Share');
	}
}
