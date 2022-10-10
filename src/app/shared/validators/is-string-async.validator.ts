import { AbstractControl, ValidationErrors } from '@angular/forms';
import { map, Observable, tap, timer } from 'rxjs';
import { isStringValdator } from './is-string.validator';

// const isStringAsyncValdator: AsyncValidatorFn;
export function isStringAsyncValdator(control: AbstractControl): Observable<ValidationErrors | null> {
	return timer(1000).pipe(
		map(() => isStringValdator(control)),
		tap(console.log),
	);
}
