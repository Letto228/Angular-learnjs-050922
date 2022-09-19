import { Directive, ElementRef, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';

@Directive({
	selector: '[appNgClass]',
})
export class NgClassDirective implements OnChanges {
	@Input() appNgClass: Record<string, any> = {};

	private element!: HTMLElement;

	constructor(elementRef: ElementRef) {
		this.element = elementRef.nativeElement;
	}

	ngOnChanges({ appNgClass }: SimpleChanges): void {
		if (appNgClass) {
			this.aplyClassesToElement(appNgClass);
		}
	}

	private aplyClassesToElement({ previousValue }: SimpleChange) {
		if (!previousValue) {
			Object.entries(this.appNgClass)
				.filter(([_className, value]) => Boolean(value))
				.forEach(([className]) => {
					this.element.classList.add(className);
					// применяем имя класса к элементу - classList.add(className);
				});

			return;
		}

		Object.entries(this.appNgClass)
			.filter(([className, value]) => previousValue[className] !== value)
			.forEach(([className, value]) => {
				if (value) {
					this.element.classList.add(className);
					// применяем имя класса к элементу - classList.add(className);

					return;
				}

				this.element.classList.remove(className);
				// удаляем имя класса - classList.remove(className);
			});
	}
}
