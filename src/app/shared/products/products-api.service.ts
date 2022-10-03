import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IProduct } from './product.interface';
import { IProductsDto } from './products.dto';

@Injectable({
	providedIn: 'root',
})
export class ProductsApiService {
	constructor(private readonly httpCient: HttpClient) {}

	getProducts$(): Observable<IProduct[]> {
		// return of({ data: { items: productsMock } }).pipe(map(({ data }) => data.items));
		return this.httpCient.get<IProductsDto>(`/products/suggestion`).pipe(map(({ data }) => data.items));
	}

	getProduct$(id: string): Observable<IProduct | undefined> {
		return this.httpCient.get<{ data: IProduct | undefined }>(`/products/${id}`).pipe(map(({ data }) => data));
	}
}
