import { borderOffset } from './border-offset.const';

export function isScrollReachedTop(scrollTop: number, prevScrollTop: number): boolean {
	return scrollTop < borderOffset && scrollTop < prevScrollTop;
}

export function isScrollReachedBottom(scrollTop: number, lowerScrollPosition: number, prevScrollTop: number): boolean {
	return lowerScrollPosition - scrollTop < borderOffset && scrollTop > prevScrollTop;
}
