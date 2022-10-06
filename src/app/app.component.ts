import { ChangeDetectionStrategy, Component } from '@angular/core';
import { applicationConfigMock } from './shared/application-config/application-config.mock';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.less'],
	// providers: [
	// 	{
	// 		provide: 'name',
	// 		useValue: 'AppComponent',
	// 	},
	// ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
	readonly applicationConfig = applicationConfigMock;

	// constructor(
	// 	@Inject('name') private readonly name: string,
	// ) {
	// 	console.log(this.name);
	// }
}
