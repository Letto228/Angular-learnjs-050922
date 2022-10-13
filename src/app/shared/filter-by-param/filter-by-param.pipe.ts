import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByParam'
})
export class FilterByParamPipe<T, K extends keyof T> implements PipeTransform {
  transform(items: T[], value: T[K], key: K): T[] {
    return items.filter((item: T) => item && item[key] === value  );
  }
}
