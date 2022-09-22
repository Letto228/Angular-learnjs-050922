import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
	selector: '[appDumpNgIf]',
})
export class DumpNgIfDirective<T> {
	@Input() set appDumpNgIf(value: T | undefined) {
		this.updateView(value);
	}

	constructor(
		private readonly viewContainerRef: ViewContainerRef,
		private readonly templateRef: TemplateRef<unknown>,
	) {}

	// ngOnChanges({appDumpNgIf}: SimpleChanges): void {
	//   if (appDumpNgIf) {
	//     this.updateView();
	//   }
	// }

	private updateView(value: T | undefined) {
		const isContainerHasView = this.viewContainerRef.length;

		if (isContainerHasView) {
			this.viewContainerRef.clear();
		}

		if (value) {
			this.viewContainerRef.createEmbeddedView(this.templateRef, {
				$implicit: value,
				appDumpNgIf: value,
			});
		}
	}
}
