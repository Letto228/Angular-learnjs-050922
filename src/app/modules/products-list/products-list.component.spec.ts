import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MemoizedSelector } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of, take } from 'rxjs';
import { BrandsService } from '../../shared/brands/brands.service';
import { IProduct } from '../../shared/products/product.interface';
import { productsMock } from '../../shared/products/products.mock';
import { loadProducts } from '../../store/products/products.actions';
import { products } from '../../store/products/products.selectors';
import { IState } from '../../store/reducer';

import { ProductsListComponent } from './products-list.component';
import { ProductsListModule } from './products-list.module';

describe('ProductsListComponent', () => {
	let component: ProductsListComponent;
	let fixture: ComponentFixture<ProductsListComponent>;
	let mockStore: MockStore<IState>;
	let dispatchSpy: jasmine.Spy;
	// let productsSelectorMock: any;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ProductsListModule, RouterTestingModule, BrowserAnimationsModule],
			providers: [
				provideMockStore(),
				{
					provide: BrandsService,
					useValue: {
						brands$: of([]),
						loadBrands(_: string | null) {},
					},
				},
			],
		}).compileComponents();

		mockStore = TestBed.inject(MockStore);

		// const productsSelectorMock = mockStore.overrideSelector(
		mockStore.overrideSelector(products as MemoizedSelector<IState, IProduct[]>, productsMock);

		// productsSelectorMock.setResult([]);

		dispatchSpy = spyOn(mockStore, 'dispatch');

		fixture = TestBed.createComponent(ProductsListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('Загрузка продуктов', (done) => {
		expect(dispatchSpy).toHaveBeenCalledWith(loadProducts(null));

		component.products$.pipe(take(1)).subscribe((products) => {
			expect(products).toEqual(productsMock);

			done();
		});
	});
});
