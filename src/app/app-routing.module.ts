import { NgModule } from '@angular/core';
import { NoPreloading, PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './modules/not-found/not-found.component';
import { CustomPreloading } from './shared/custom-preloading/custom-preloading';
import { QuestionCanActivateGuard } from './shared/guards/question-can-activate.guard';
import { QuestionCanDeactivateGuard } from './shared/guards/question-can-deactivate.guard';
import { QuestionCanLoadGuard } from './shared/guards/question-can-load.guard';
import { ProductsResolver } from './shared/resolvers/products.resolver';

const routes: Routes = [
	{
		path: 'products-list',
		loadChildren: () => import('./modules/products-list/products-list.module').then((m) => m.ProductsListModule),
		// resolve: {
		// 	products: ProductsResolver,
		// } // {products: [...]}
		// canLoad: [QuestionCanLoadGuard],
		// canActivate: [QuestionCanActivateGuard],
		// canLoad: [QuestionCanLoadGuard],
		// data: {
		// 	preloading: true,
		// }
	},
	{
		path: 'product',
		loadChildren: () => import('./modules/product/product.module').then((m) => m.ProductModule),
		canLoad: [QuestionCanLoadGuard],
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
			preloadingStrategy: CustomPreloading,
		}),
	],
	exports: [RouterModule],
})
export class AppRoutingModule {}
