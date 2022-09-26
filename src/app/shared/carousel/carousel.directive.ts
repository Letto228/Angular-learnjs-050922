import { Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { BehaviorSubject, map, Subject, takeUntil } from 'rxjs';

interface ICarouselContext<T> {
	$implicit: T;
	appCarouselOf: T[];
	index: number;
	nextItem: () => void;
	backItem: () => void;
}

@Directive({
	selector: '[appCarousel]',
})
export class CarouselDirective<T> implements OnInit, OnDestroy {
	@Input() set appCarouselOf(items: T[] | undefined) {
		if (!items?.length) {
			this.viewContainerRef.clear();

			return;
		}

		this.items = items;
		this.currentIndex$.next(0);
	}

	private items: T[] | null = null;

	private readonly currentIndex$ = new BehaviorSubject<number>(0);
	private readonly destroy$ = new Subject<void>();

	constructor(
		private readonly viewContainerRef: ViewContainerRef,
		private readonly templateRef: TemplateRef<ICarouselContext<T>>,
	) {}

	ngOnInit() {
		this.listenCurrentIndexChange();
	}

	ngOnDestroy() {
		this.destroy$.next();
		this.destroy$.complete();
	}

	private listenCurrentIndexChange() {
		this.currentIndex$
			.pipe(
				map((index) => this.getCurrentContext(index)),
				takeUntil(this.destroy$),
			)
			.subscribe((context) => {
				this.viewContainerRef.clear();
				this.viewContainerRef.createEmbeddedView(this.templateRef, context);
			});
	}

	private getCurrentContext(activeIndex: number): ICarouselContext<T> {
		const items = this.items as T[];

		return {
			$implicit: items[activeIndex],
			appCarouselOf: items,
			index: activeIndex,
			nextItem: () => {
				this.nextItem();
			},
			backItem: this.backItem.bind(this),
		};
	}

	private nextItem() {
		const nextIndex = this.currentIndex$.value + 1;

		if (!this.items?.length) {
			return;
		}

		this.currentIndex$.next(nextIndex < this.items.length ? nextIndex : 0);
	}

	private backItem() {
		const prevIndex = this.currentIndex$.value - 1;

		if (!this.items?.length) {
			return;
		}

		this.currentIndex$.next(prevIndex >= 0 ? prevIndex : this.items.length - 1);
	}
}
