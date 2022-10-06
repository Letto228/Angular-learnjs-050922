import {
  Directive,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import { BehaviorSubject, map, Subject, takeUntil } from 'rxjs';

interface IPaginationContext<T> {
  $implicit: T[] | T;
	appPaginationOf: T[]; // нет необходимости
  activeIndex: number;
  totalPages: number[];
	nextItem: () => void;
	backItem: () => void;
  selectPage: (pageIndex: number) => void;
}

@Directive({
	selector: '[appPagination]',
})
export class PaginationDirective<T> implements OnInit, OnChanges, OnDestroy {
  @Input() appPaginationOf: T[] = [];
  @Input() appPaginationPageSize = 4;

  private chunks: Array<T[]> | T[] = [];

	private readonly currentIndex$ = new BehaviorSubject<number>(0);
	private readonly destroy$ = new Subject<void>();

	constructor(
		private readonly viewContainerRef: ViewContainerRef,
		private readonly templateRef: TemplateRef<IPaginationContext<T>>,
	) {
    this.chunks = this.chunk(this.appPaginationOf, this.appPaginationPageSize);
  }

	ngOnInit() {
		this.listenCurrentIndexChange();
	}

  ngOnChanges(changes: any) {
    if (changes.appPaginationOf || changes.appPaginationPageSize) {
      this.chunks = this.chunk(this.appPaginationOf, this.appPaginationPageSize);
      this.currentIndex$.next(0);
    }
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

	private getCurrentContext(activeIndex: number): IPaginationContext<T> {
		return {
			$implicit: this.chunks[activeIndex],
      activeIndex: activeIndex,
      appPaginationOf: <T[]>this.appPaginationOf,
      totalPages: this.chunks.map((chunk, i) => i ),
			nextItem: () => {
				this.nextItem();
			},
			backItem: this.backItem.bind(this),
			selectPage: (pageIndex) => {
        this.selectPage(pageIndex);
      }
		};
	}

	private nextItem() {
		const nextIndex = this.currentIndex$.value + 1;

    if (this.chunks?.length <= nextIndex) {
			return;
		}

		this.currentIndex$.next(nextIndex < this.appPaginationOf.length ? nextIndex : 0);
	}

	private backItem() {
		const prevIndex = this.currentIndex$.value - 1;

		if (!this.chunks?.length || prevIndex < 0) {
			return;
		}

    this.currentIndex$.next(prevIndex >= 0 ? prevIndex : this.chunks.length - 1);
	}

  private selectPage(pageIndex: number) {
    if (this.appPaginationOf?.length < pageIndex) {
      return;
    }

    this.currentIndex$.next(pageIndex);
  }

  private chunk(items: T[], size: number): Array<T[]> | T[] {
    if (this.appPaginationPageSize <= 1) {
      return items;
    }

    return items.reduce((result: Array<T[]>, item: T, index: number) => {
      const chunkIndex = Math.floor(index/size);

      if (!result[chunkIndex]) {
        result[chunkIndex] = [];
      }

      result[chunkIndex].push(item)

      return result
    }, [])
  }
}
