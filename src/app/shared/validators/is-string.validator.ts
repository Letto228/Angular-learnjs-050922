import { AbstractControl, ValidationErrors } from '@angular/forms';

// const isStringValdator: ValidatorFn;
export function isStringValdator(control: AbstractControl): ValidationErrors | null {
	console.log('Called');
	return Number(control.value) ? { isStringValdator: 'Input is not string' } : null;
}
