import {Directive, ElementRef, EventEmitter, HostListener, Input, Output} from '@angular/core';

const DEFAULT_OFFSET = 100;

export const SCROLL_OFFSETS = {
  TOP: 'top',
  BOTTOM: 'bottom'
}

@Directive({
  selector: '[appInfiniteScroll]'
})
export class InfiniteScrollDirective {
  @Input() isLoading: boolean = false;
  @Input() offset: number = DEFAULT_OFFSET;

  @Output() onOffsetExceeded = new EventEmitter<string>();

  private scrollTopPrevious = 0;

  constructor(private elementRef: ElementRef) {}

  @HostListener('scroll')
  onScroll() {
    if (this.isLoading) {
      return;
    }

    const { scrollTop, clientHeight, scrollHeight } = this.elementRef.nativeElement;
    const isTopOffsetExceeded = scrollTop + clientHeight >= scrollHeight - this.offset;
    const isBottomOffsetExceeded = scrollTop < this.offset && scrollTop < this.scrollTopPrevious;

    if (isTopOffsetExceeded){
      this.onOffsetExceeded.emit(SCROLL_OFFSETS.TOP);
    }

    if (isBottomOffsetExceeded) {
      this.onOffsetExceeded.emit(SCROLL_OFFSETS.BOTTOM);
    }

    this.scrollTopPrevious = scrollTop;
  }
}
