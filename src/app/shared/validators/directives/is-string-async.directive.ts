import { ChangeDetectorRef, Directive } from '@angular/core';
import { AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors } from '@angular/forms';
import { Observable, tap } from 'rxjs';
import { isStringAsyncValdator } from '../is-string-async.validator';

@Directive({
	selector: '[appIsStringAsync]',
	providers: [
		{
			provide: NG_ASYNC_VALIDATORS,
			multi: true,
			useExisting: IsStringAsyncDirective,
		},
	],
})
export class IsStringAsyncDirective implements AsyncValidator {
	constructor(private readonly changeDetectorRef: ChangeDetectorRef) {}

	validate(control: AbstractControl): Observable<ValidationErrors | null> {
		return isStringAsyncValdator(control).pipe(
			tap(() => {
				this.changeDetectorRef.markForCheck();
			}),
		);
	}
}
