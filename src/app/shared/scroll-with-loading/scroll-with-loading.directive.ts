import { Directive, ElementRef, EventEmitter, Output, HostListener } from '@angular/core';
import { LoadDirection } from './load-direction.const';
import { borderOffset } from './border-offset.const';

@Directive({
	selector: '[appScrollWithLoading]',
})
export class ScrollWithLoadingDirective {
	@Output() loadData = new EventEmitter<LoadDirection>();

	private element!: HTMLElement;
	private previousScrollTop: number;

	constructor(elementRef: ElementRef) {
		this.element = elementRef.nativeElement;
		this.previousScrollTop = this.element.scrollTop;
	}

	@HostListener('scroll')
	onScroll() {
		const scrollTop = this.element.scrollTop;
		const scrollHeight = this.element.scrollHeight;
		const scrollTopMax = scrollHeight - this.element.clientHeight;

		const direction = this.previousScrollTop - scrollTop;
	
		this.previousScrollTop = scrollTop;

		if (direction > 0 && scrollTop < borderOffset) {
			let direction = new LoadDirection();
			direction.Before = 1;
			this.loadData.emit(direction);
			this.element.insertAdjacentHTML('afterbegin', '<p>Before fish text</p>');
		} else if (direction < 0 && scrollTopMax - scrollTop < borderOffset) {
			let direction = new LoadDirection();
			direction.After = 1;
			this.loadData.emit(direction);
			this.element.insertAdjacentHTML('beforeend', '<p>After fish text</p>');
		}
	}
}
