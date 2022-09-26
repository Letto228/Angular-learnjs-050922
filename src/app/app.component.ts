import { ApplicationRef, ChangeDetectionStrategy, Component, DoCheck } from '@angular/core';
import { applicationConfigMock } from './shared/application-config/application-config.mock';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
	readonly applicationConfig = applicationConfigMock;

	// constructor(
	// 	private readonly applicationRef: ApplicationRef,
	// ) {
	// 	// setInterval(() => {
	// 	// 	this.applicationRef.tick();
	// 	// }, 100)
	// }

	// ngDoCheck() {
	// 	console.log('CD')
	// }
}
