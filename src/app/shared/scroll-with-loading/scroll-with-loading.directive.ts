import { Directive, EventEmitter, Output } from '@angular/core';
import { LoadDirection } from './load-direction.const';

@Directive({
	selector: '[appScrollWithLoading]',
})
export class ScrollWithLoadingDirective {
	@Output() loadData = new EventEmitter<LoadDirection>();
}
