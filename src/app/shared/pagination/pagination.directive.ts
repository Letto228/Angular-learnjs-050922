import { Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { BehaviorSubject, map, Subject, takeUntil } from 'rxjs';

interface IPaginationContext<T> {
	$implicit: T;
	appPaginationOf: T[]; // нет необходимости
	index: number;
	nextItem: () => void;
	backItem: () => void;
}

@Directive({
	selector: '[appPagination]',
})
export class PaginationDirective<T> implements OnInit, OnDestroy {
	@Input() set appPaginationOf(items: T[] | undefined) {
		if (!items?.length) {
			this.viewContainerRef.clear();

			return;
		}

		this.items = items;
		this.currentIndex$.next(0);
	}

	// @Output() emitNext = new EventEmitter<() => void>();
	// @Output() emitBack = new EventEmitter<() => void>();

	private items: T[] | null = null;

	private readonly currentIndex$ = new BehaviorSubject<number>(0);
	// private readonly subscription = new Subscription();
	private readonly destroy$ = new Subject<void>();

	constructor(
		private readonly viewContainerRef: ViewContainerRef,
		private readonly templateRef: TemplateRef<IPaginationContext<T>>,
	) {}

	ngOnInit() {
		this.listenCurrentIndexChange();
		// this.emitNext.emit(
		//   () => {
		//     this.nextItem()
		//   }
		// )
		// this.emitBack.emit(this.backItem.bind(this))
	}

	ngOnDestroy() {
		// this.subscription.unsubscribe();
		this.destroy$.next();
		this.destroy$.complete();
	}

	private listenCurrentIndexChange() {
		// this.subscription.add(
		this.currentIndex$
			.pipe(
				map((index) => this.getCurrentContext(index)),
				takeUntil(this.destroy$),
			)
			.subscribe((context) => {
				this.viewContainerRef.clear();
				this.viewContainerRef.createEmbeddedView(this.templateRef, context);
			});
		// )
	}

	private getCurrentContext(activeIndex: number): IPaginationContext<T> {
		const items = this.items as T[];

		return {
			$implicit: items[activeIndex],
			appPaginationOf: items,
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
// @Directive({
//   selector: '[appPagination]'
// })
// export class PaginationDirective<T> implements OnChanges {
//   @Input() appPaginationOf: T[] | undefined;

//   constructor(
//     private readonly viewContainerRef: ViewContainerRef,
//     private readonly templateRef: TemplateRef<IPaginationContext<T>>,
//   ) {}

//   ngOnChanges({appPaginationOf}: SimpleChanges): void {
//     if (appPaginationOf) {
//       this.resetView()
//     }
//   }

//   private resetView() {
//     if (this.appPaginationOf?.length) {
//       this.updateView(0);

//       return;
//     }

//     this.viewContainerRef.clear();
//   }

//   private updateView(activeIndex: number) {
//     const currentContext = this.getCurrentContext(activeIndex, this.appPaginationOf as T[]);

//     this.viewContainerRef.clear();
//     this.viewContainerRef.createEmbeddedView(this.templateRef, currentContext);
//   }

//   private getCurrentContext(activeIndex: number, items: T[]): IPaginationContext<T> {
//     return {
//       $implicit: items[activeIndex],
//       appPagination: items,
//       index: activeIndex,
//     }
//   }
// }
