import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

interface ILetContext<T> {
	appLet: T;
}

@Directive({
	selector: '[appLet]',
})
export class LetDirective<T> {
	@Input() set appLet(value: T) {
		this.viewContainerRef.clear();
		this.viewContainerRef.createEmbeddedView(this.templateRef, { appLet: value });
	}

	constructor(
		private readonly templateRef: TemplateRef<ILetContext<T>>,
		private readonly viewContainerRef: ViewContainerRef,
	) {}
}
