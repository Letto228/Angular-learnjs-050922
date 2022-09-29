import { Inject, Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { BASE_URL } from '../base-url/base-url.token';
import { IProduct } from './product.interface';
import { productsMock } from './products.mock';

@Injectable({
	providedIn: 'root',
})
export class ProductsApiService {
	constructor(@Inject(BASE_URL) private readonly baseUrl: string) {
		console.log(this.baseUrl);
	}

	getProducts$(): Observable<IProduct[]> {
		return of({ data: { items: productsMock } }).pipe(map(({ data }) => data.items));
	}
}
