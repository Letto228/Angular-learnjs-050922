import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
	selector: '[appInsertShadow]',
})
export class InsertShadowDirective {
	@HostBinding('style.boxShadow')
	private boxShadow = '';

	@HostListener('click', ['$event.pageX'])
	onClick(pageX: number) {
		console.log(pageX);
		this.boxShadow = this.boxShadow ? '' : 'inset 0 0 10px #000';
	}

	// constructor() {
	//   setTimeout(() => {
	//     this.boxShadow = 'inset 0 0 10px #000';
	//   }, 2000)
	// }
}
