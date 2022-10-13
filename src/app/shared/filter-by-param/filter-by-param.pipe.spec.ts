import { productsMock } from '../products/products.mock';
import { FilterByParamPipe } from './filter-by-param.pipe';

describe('FilterByParamPipe', () => {
	it('create an instance', () => {
		const pipe = new FilterByParamPipe();
		expect(pipe).toBeTruthy();
	});

	it('Фильтрация по имени', () => {
		const pipe = new FilterByParamPipe();
		const result = pipe.transform(productsMock, productsMock[0].name, 'name');

		expect(result).toEqual([productsMock[0]]);
	});

	it('Фильтрация по _id', () => {
		const pipe = new FilterByParamPipe();
		const result = pipe.transform(productsMock, 'not-found-id', '_id');

		expect(result).toEqual([]);
	});
});
