import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { isStringValdator } from '../is-string.validator';

@Directive({
	selector: '[appIsString]',
	providers: [
		{
			provide: NG_VALIDATORS,
			multi: true,
			useExisting: IsStringDirective,
		},
	],
})
export class IsStringDirective implements Validator {
	validate = isStringValdator;
	// validate(control: AbstractControl): ValidationErrors | null {
	//   return isStringValdator(control);
	// }
}
