import { ChangeDetectorRef, Pipe, PipeTransform } from '@angular/core';
import { getJson } from './get-json.utils';

@Pipe({
	name: 'getJson',
	pure: true,
})
export class GetJsonPipe implements PipeTransform {
	// constructor(
	//   private readonly changeDetectorRef: ChangeDetectorRef,
	// ) {}

	// transform(value: any, additionalArggument: any, arg: any): string {
	transform(value: any): string {
		console.log('getJson Pipe');
		// this.changeDetectorRef.markForCheck();

		return getJson(value);
	}
}
