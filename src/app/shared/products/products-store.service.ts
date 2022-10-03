import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { IProduct } from './product.interface';
import { ProductsApiService } from './products-api.service';

@Injectable({
	providedIn: 'root',
})
export class ProductsStoreService {
	private readonly productsStore$ = new BehaviorSubject<IProduct[] | null>(null);

	constructor(private readonly productsApiService: ProductsApiService) {}

	get products$(): Observable<IProduct[] | null> {
		return this.productsStore$.asObservable();
	}

	getProduct$(id: string): Observable<IProduct | undefined> {
		return this.products$.pipe(map((products) => products?.find((product) => product._id === id)));
	}

	loadProducts() {
		this.productsApiService.getProducts$().subscribe((products) => {
			this.productsStore$.next(products);
		});
	}

	loadProduct(id: string) {
		this.productsApiService.getProduct$(id).subscribe((product) => {
			if (!product) {
				return;
			}

			this.productsStore$.next([...(this.productsStore$.value || []), product]);
		});
	}
}
