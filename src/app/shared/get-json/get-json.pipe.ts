import { Pipe, PipeTransform } from '@angular/core';
import { getJson } from './get-json.utils';

@Pipe({
	name: 'getJson',
	pure: true,
})
export class GetJsonPipe implements PipeTransform {
	transform(value: any): string {
		return getJson(value);
	}
}
