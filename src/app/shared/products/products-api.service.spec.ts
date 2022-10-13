import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { productMock } from './product.mock';
import { ProductsApiService } from './products-api.service';
import { IProductsDto } from './products.dto';
import { productsMock } from './products.mock';

// const httClientMock: HttpClient = {
//     get<T>(_url: string, _options: any) {},
// } as HttpClient;

// describe('ProductsApiService', () => {
//     let service: ProductsApiService;

//     beforeEach(() => {
//         TestBed.configureTestingModule({
//             providers: [
//                 ProductsApiService,
//                 {
//                     provide: HttpClient,
//                     useValue: httClientMock,
//                 }
//             ]
//         })
//     })

//     beforeEach(() => {
//         service = TestBed.inject(ProductsApiService);

//         spyOn(httClientMock, 'get').and.returnValue(of({data: {items: productsMock}} as IProductsDto))
//     })

//     it('Загрузка продуктов', (done) => {
//         service.getProducts$().subscribe(products => {
//             expect(products).toEqual(productsMock);

//             done();
//         });
//     });
// })
describe('ProductsApiService', () => {
	let service: ProductsApiService;
	let httMock: HttpTestingController;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
			providers: [ProductsApiService],
		});
	});

	beforeEach(() => {
		service = TestBed.inject(ProductsApiService);
		httMock = TestBed.inject(HttpTestingController);
	});

	it('Загрузка продуктов', (done) => {
		service.getProducts$().subscribe((products) => {
			expect(products).toEqual(productsMock);

			done();
		});

		httMock.expectOne('/products').flush({ data: { items: productsMock } } as IProductsDto);
	});
});
