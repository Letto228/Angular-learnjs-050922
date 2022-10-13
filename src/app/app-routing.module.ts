import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './modules/not-found/not-found.component';
import { ProductsListModule } from './modules/products-list/products-list.module';

const routes: Routes = [
	{
		path: 'products-list',
		loadChildren: () => import('./modules/products-list/products-list.module').then((m) => m.ProductsListModule),
		// component: ProductsListComponent,
	},
	{
		path: 'product',
		loadChildren: () => import('./modules/product/product.module').then((m) => m.ProductModule),
		// component: ProductComponent
	},
	{
		path: '',
		redirectTo: 'products-list',
		pathMatch: 'full',
	},
	{
		path: '**',
		component: NotFoundComponent,
	},
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, {
			preloadingStrategy: PreloadAllModules,
		}),
	],
	exports: [RouterModule],
})
export class AppRoutingModule {}
