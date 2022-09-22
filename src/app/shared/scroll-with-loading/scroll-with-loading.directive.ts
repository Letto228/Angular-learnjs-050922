import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { LoadDirection } from './load-direction.const';
import { isScrollReachedBottom, isScrollReachedTop } from './utils';

@Directive({
	selector: '[appScrollWithLoading]',
})
export class ScrollWithLoadingDirective {
	@Input() isLoadingData = false;

	@Output() loadData = new EventEmitter<LoadDirection>();

	private readonly scrollElement: HTMLElement = this.elementRef.nativeElement;

	private prevScrollTop = -1;

	@HostListener('scroll')
	onScroll() {
		const prevScrollTop = this.prevScrollTop;

		this.prevScrollTop = this.scrollTop;

		if (this.isLoadingData) {
			return;
		}

		const shouldLoadMessagesDown = isScrollReachedBottom(this.scrollTop, this.lowerScrollPosition, prevScrollTop);

		if (shouldLoadMessagesDown) {
			this.loadData.emit(LoadDirection.After);

			return;
		}

		const shouldLoadMessagesTop = isScrollReachedTop(this.scrollTop, prevScrollTop);

		if (shouldLoadMessagesTop) {
			this.loadData.emit(LoadDirection.Before);

			return;
		}
	}

	private get scrollTop(): number {
		return this.scrollElement.scrollTop;
	}

	private get lowerScrollPosition(): number {
		const { clientHeight, scrollHeight } = this.scrollElement;

		return scrollHeight - clientHeight;
	}

	constructor(private readonly elementRef: ElementRef) {}
}
