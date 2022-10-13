import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
	selector: 'app-counter-input',
	templateUrl: './counter-input.component.html',
	styleUrls: ['./counter-input.component.less'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			multi: true,
			useExisting: CounterInputComponent,
		},
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CounterInputComponent implements ControlValueAccessor {
	@Input() step = 1;

	counter = 0;
	isDisabled = false;

	private onChange!: (_: any) => void;
	private onTouch!: () => void;

	private touched = false;

	constructor(private readonly changeDetectorRef: ChangeDetectorRef) {}

	writeValue(newCounter: number) {
		this.counter = newCounter;

		this.changeDetectorRef.markForCheck();
	}

	registerOnChange(fn: (_: any) => void) {
		this.onChange = fn;
	}

	registerOnTouched(fn: () => void) {
		this.onTouch = fn;
	}

	setDisabledState(isDisabled: boolean): void {
		this.isDisabled = isDisabled;

		this.changeDetectorRef.markForCheck();
	}

	back() {
		this.counter -= this.step;

		this.onChange(this.counter);
		this.markTouched();
	}

	next() {
		this.counter += this.step;

		this.onChange(this.counter);
		this.markTouched();
	}

	private markTouched() {
		if (this.touched) {
			return;
		}

		this.touched = true;

		this.onTouch();
	}
}
