import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './modules/not-found/not-found.component';

const routes: Routes = [
	{
		path: 'products-list',
		loadChildren: () => import('./modules/products-list/products-list.module').then((m) => m.ProductsListModule),
	},
	{
		path: 'product',
		loadChildren: () => import('./modules/product/product.module').then((m) => m.ProductModule),
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
