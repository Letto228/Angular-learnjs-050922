import {
	Directive,
	Input,
	OnChanges,
	OnDestroy,
	OnInit,
	SimpleChanges,
	TemplateRef,
	ViewContainerRef,
} from '@angular/core';
import { BehaviorSubject, map, Subject, takeUntil } from 'rxjs';
import { groupingItemsByElementsSize } from './utils';

interface IPaginationContext<T> {
	$implicit: T | T[];
	appPaginationOf: T[];
	index: number;
	allIndexes: number[];
	nextItem: () => void;
	backItem: () => void;
	selectIndex: (index: number) => void;
}

@Directive({
	selector: '[appPagination]',
})
export class PaginationDirective<T> implements OnInit, OnChanges, OnDestroy {
	@Input() appPaginationElementsSize = 1;
	@Input() appPaginationOf: T[] | undefined | null;

	private groupedItems: Array<T[]> | T[] = [];

	private readonly currentIndex$ = new BehaviorSubject<number>(0);
	private readonly destroy$ = new Subject<void>();

	constructor(private viewContainerRef: ViewContainerRef, private templateRef: TemplateRef<IPaginationContext<T>>) {}

	ngOnChanges({ appPaginationOf, appPaginationElementsSize }: SimpleChanges): void {
		if (appPaginationOf || appPaginationElementsSize) {
			if (!this.appPaginationOf?.length) {
				this.viewContainerRef.clear();

				return;
			}

			this.groupedItems = this.getGroupedItems(this.appPaginationOf);
			this.currentIndex$.next(0);
		}
	}

	ngOnInit() {
		this.listenCurrentIndexChange();
	}

	ngOnDestroy() {
		this.destroy$.next();
		this.destroy$.complete();
	}

	private getGroupedItems(items: T[]): Array<T[]> | T[] {
		return this.appPaginationElementsSize <= 1
			? items
			: groupingItemsByElementsSize(items, this.appPaginationElementsSize);
	}

	private listenCurrentIndexChange() {
		this.currentIndex$
			.pipe(
				map((index) => this.getCurrentContext(index, this.groupedItems)),
				takeUntil(this.destroy$),
			)
			.subscribe((context) => {
				this.viewContainerRef.clear();
				this.viewContainerRef.createEmbeddedView(this.templateRef, context);
			});
	}

	private getCurrentContext(activeIndex: number, items: Array<T[]> | T[]): IPaginationContext<T> {
		return {
			$implicit: items[activeIndex],
			index: activeIndex,
			allIndexes: items.map((_, index) => index),
			appPaginationOf: this.appPaginationOf as T[],
			nextItem: () => {
				this.nextItem();
			},
			backItem: () => {
				this.backItem();
			},
			selectIndex: (index: number) => {
				this.selectIndex(index);
			},
		};
	}

	private nextItem() {
		const nextIndex = this.currentIndex$.value + 1;

		if (!this.groupedItems?.length) {
			return;
		}

		this.currentIndex$.next(nextIndex < this.groupedItems.length ? nextIndex : 0);
	}

	private backItem() {
		const prevIndex = this.currentIndex$.value - 1;

		if (!this.groupedItems?.length) {
			return;
		}

		this.currentIndex$.next(prevIndex >= 0 ? prevIndex : this.groupedItems.length - 1);
	}

	private selectIndex(index: number) {
		this.currentIndex$.next(index);
	}
}
