import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderModule } from './components/header/header.module';
import { SidenavModule } from './components/sidenav/sidenav.module';
import { MatListModule } from '@angular/material/list';
import { ProductsListModule } from './modules/products-list/products-list.module';
import { ProductModule } from './modules/product/product.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BaseUrlInterceptor } from './shared/base-url/base-url.interceptor';
import { NotFoundModule } from './modules/not-found/not-found.module';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		HeaderModule,
		SidenavModule,
		MatListModule,
		ProductsListModule,
		ProductModule,
		HttpClientModule,
		NotFoundModule,
	],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: BaseUrlInterceptor,
			multi: true,
		},
		// {
		// 	provide: HTTP_INTERCEPTORS,
		// 	useClass: AuthInterceptor,
		// 	multi: true,
		// },
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
