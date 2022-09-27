import { Pipe, PipeTransform } from '@angular/core';
import { IModel } from '../products/product.interface';


@Pipe({
  name: 'filterByParam'
})
export class FilterByParamPipe implements PipeTransform {

  transform(elements: IModel[], inputValue: string, param: string): IModel[] {
    // to be able to filter by internal object keys with 'key.subkey' param
    const compoundParam = param.split('.');

    return elements.filter(element => {
      const elementValue: string = compoundParam.length > 1
        ? compoundParam.reduce((obj, key) => obj[key], element)
        : element[param];

      return elementValue?.toString().toLowerCase().startsWith(inputValue.toLowerCase())
    });
  }

}
