import {Directive, ElementRef, EventEmitter, HostListener, Input, Output} from '@angular/core';

const DEFAULT_OFFSET = 100;

@Directive({
  selector: '[appInfiniteScroll]'
})
export class InfiniteScrollDirective {
  @Input() isLoading: boolean = false;
  @Input() offset: number = DEFAULT_OFFSET;

  @Output() onTopExceeded = new EventEmitter();
  @Output() onBottomExceeded = new EventEmitter();

  private scrollTopPrevious = 0;

  constructor(private elementRef: ElementRef) {}

  @HostListener('scroll')
  onScroll() {
    if (this.isLoading) {
      return;
    }

    const { scrollTop, clientHeight, scrollHeight } = this.elementRef.nativeElement;

    if (scrollTop + clientHeight >= scrollHeight - this.offset){
      this.onTopExceeded.emit();
    }

    if (scrollTop < this.offset && scrollTop < this.scrollTopPrevious) {
      this.onBottomExceeded.emit();
    }

    this.scrollTopPrevious = scrollTop;
  }
}
