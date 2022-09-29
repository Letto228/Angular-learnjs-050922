import { Pipe, PipeTransform } from '@angular/core';
import { isString } from '../is-string/is-string.utils';

@Pipe({
	name: 'filterByParam',
})
export class FilterByParamPipe implements PipeTransform {
	transform<T, P extends keyof T>(
		items: T[] | undefined | null,
		searchValue: T[P],
		searchingProperty: P,
	): T[] | undefined | null {
		return items?.filter((item) => {
			const propertyValue = item[searchingProperty];

			return isString(propertyValue)
				? propertyValue.includes(searchValue as unknown as string) // or startsWith to search from the starting position
				: propertyValue === searchValue;
		});
	}
}
