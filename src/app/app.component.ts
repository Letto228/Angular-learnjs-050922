import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { applicationConfigMock } from './shared/application-config/application-config.mock';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.less'],
	providers: [
		{
			provide: 'name',
			useValue: 'AppComponent',
		},
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
	readonly applicationConfig = applicationConfigMock;

	// constructor(
	// 	@Inject('token') private readonly token: string,
	// ) {
	// 	console.log(this.token);
	// }
}
