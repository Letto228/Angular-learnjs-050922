import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { filter, Observable, of, switchMap, timer } from 'rxjs';
import { IProduct } from '../products/product.interface';
import { ProductsStoreService } from '../products/products-store.service';

@Injectable({
	providedIn: 'root',
})
export class ProductsResolver implements Resolve<IProduct[]> {
	constructor(private readonly productsStoreService: ProductsStoreService) {}

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProduct[]> {
		this.productsStoreService.loadProducts(route.paramMap.get('subCategoryId'));

		return timer(3000).pipe(switchMap(() => this.productsStoreService.products$.pipe(filter(Boolean))));
	}
}
