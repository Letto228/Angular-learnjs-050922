import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {map, Observable} from 'rxjs';
import { IProduct } from '../../shared/products/product.interface';
import { ProductsStoreService } from '../../shared/products/products-store.service';

@Component({
	selector: 'app-products-list',
	templateUrl: './products-list.component.html',
	styleUrls: ['./products-list.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsListComponent implements OnInit {
	products$!: Observable<IProduct[] | null>;
  subCategoryId$: Observable<string | null>;

	constructor(private readonly productsStoreService: ProductsStoreService, private readonly router: Router, private readonly activatedRoute: ActivatedRoute) {
    this.subCategoryId$ = this.activatedRoute.paramMap.pipe(
      map((params) => params.get('subCategoryId')),
    );
  }

	ngOnInit() {
		this.products$ = this.productsStoreService.products$;
    this.subCategoryId$.subscribe((id) => {
      console.log('Sub Category Id', id);
    })

		this.productsStoreService.loadProducts();
	}

	trackBy(_index: number, item: IProduct) {
		return item._id;
	}

	navigate() {
		// this.router.navigate(['/product', 'id']);
		this.router.navigate(['/product/id']);
		// this.router.navigateByUrl('/product/id');
	}
}
