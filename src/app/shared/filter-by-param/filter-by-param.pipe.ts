import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'filterByParam',
})
export class FilterByParamPipe<T> implements PipeTransform {
	transform(
		items: T[] | undefined | null,
		searchValue: T[keyof T],
		searchingProperty: keyof T,
	): T[] | undefined | null {
		return items?.filter((item) =>
			typeof item[searchingProperty] === 'string'
				? (item[searchingProperty] as unknown as string).includes(searchValue as unknown as string)
				: item[searchingProperty] === searchValue,
		);
	}
}
