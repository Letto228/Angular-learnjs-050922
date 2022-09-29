import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderModule } from './components/header/header.module';
import { SidenavModule } from './components/sidenav/sidenav.module';
import { MatListModule } from '@angular/material/list';
import { ProductsListModule } from './modules/products-list/products-list.module';
import { ProductsStoreService } from './shared/products/products-store.service';
import { Observable, of } from 'rxjs';
import { IProduct } from './shared/products/product.interface';
import { productMock } from './shared/products/product.mock';
import { environment } from '../environments/environment';
import { ProductsApiService } from './shared/products/products-api.service';
import { BASE_URL } from './shared/base-url/base-url.token';
import { baseUrl } from './shared/base-url/base-url.const';

// NullInjector - конечная станция ничего не хранит

// |

// PlatformInjector - общий инжектор для нескольких приложений

// |

// RootInjector(AppModuleInjector) - инжектор приложения

// |

// ModulesInjectors(lazy)

// |

// ElementsInjectors

// Пример
// ProductsListElementInjector -> SidenavElementInjector -> AppElementInjector -> PeoductsListModuleInjector -> RootInjector -> PlatformInjector -> NullInjector

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		HeaderModule,
		ProductsListModule,
		SidenavModule,
		MatListModule,
	],
	providers: [
		// ProductsStoreService,
		// ProductsApiService,
		// {
		// 	provide: ProductsStoreService,
		// 	useClass: ProductsStoreService, // инстанс класса
		// },
		// {
		// 	provide: ProductsStoreService,
		// 	useValue: environment.production
		// 		? new ProductsStoreService()
		// 		: {
		// 			get products$(): Observable<IProduct[] | null> {
		// 				return of([productMock]);
		// 			},
		// 			loadProducts() {
		// 				console.log('loadProducts')
		// 			}
		// 		},
		// }
		// {
		// 	provide: 'token',
		// 	useValue: 'first value',
		// 	multi: true,
		// },
		// {
		// 	provide: 'token',
		// 	useValue: 'second value',
		// 	multi: false,
		// },
		// {
		// 	provide: 'tokenName', // псевдоним для токена
		// 	useExisting: 'token', // уже подключенный токен
		// },
		// {
		// 	provide: 'ProductsStoreService', // псевдоним для токена
		// 	useExisting: ProductsStoreService, // уже подключенный токен
		// },
		// {
		// 	provide: ProductsStoreService,
		// 	// useClass: ProductsStoreService,
		// 	useFactory: (productsApiService: ProductsApiService) => new ProductsStoreService(productsApiService), // в DI будет значение useFactory() - результат вызова
		// 	deps: [ProductsApiService],
		// },
		// {
		// 	provide: 'token',
		// 	// useValue: 'value',
		// 	useFactory: () => 'value', // в DI будет значение useFactory() - результат вызова
		// },
		// {
		// 	provide: 'ProductsStoreService',
		// 	// useExisting: ProductsStoreService,
		// 	useFactory: (productsStoreService: ProductsStoreService) => productsStoreService,
		// 	deps: [ProductsStoreService]
		// },
		// {
		// 	provide: 'products$',
		// 	// useExisting: ProductsStoreService,
		// 	useFactory: (productsStoreService: ProductsStoreService, token: string) => {
		// 		console.log(token);
		// 		return productsStoreService.products$
		// 	},
		// 	deps: [ProductsStoreService, 'token']
		// }
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
