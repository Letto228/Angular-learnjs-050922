import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './modules/not-found/not-found.component';
import { NotFoundModule } from './modules/not-found/not-found.module';
import { DescriptionComponent } from './modules/product/description/description.component';
import { ProductComponent } from './modules/product/product.component';
import { TypeComponent } from './modules/product/type/type.component';
import { ProductsListComponent } from './modules/products-list/products-list.component';

// http://localhost:4200/[(products-list | product/id)]   '/'
// (http://localhost:4200/) products-list    /123/http
// (http://localhost:4200/) product/id
// (http://localhost:4200/) ''

const routes: Routes = [
	// (http://localhost:4200/)products-list/123/http
	// {
	// 	path: 'products-list/123/http',
	// 	component: ProductsListComponent,
	// },
	{
		path: 'products-list',
		component: ProductsListComponent,
	},
	{
		path: 'product', // product/id
		children: [
			{
				path: 'root/:id',
				component: TypeComponent,
			},
			{
				path: ':id/root', // старый путь
				redirectTo: 'root/:id',
				pathMatch: 'full',
			},
			{
				path: ':id',
				component: ProductComponent,
				children: [
					{
						path: 'type', // product/id/type
						component: TypeComponent,
					},
					{
						path: 'description', // product/id/description
						component: DescriptionComponent,
					},
					{
						path: '',
						// redirectTo: 'description',
						redirectTo: '/products-list',
						pathMatch: 'full',
					},
					{
						path: 'root',
						component: DescriptionComponent,
					},
				],
			},
			{
				path: 'about',
				component: TypeComponent,
			},
			// {
			// 	path: 'type', // product/id/type
			// 	component: TypeComponent,
			// },
			// {
			// 	path: 'description', // product/id/description
			// 	component: DescriptionComponent,
			// },
			// {
			// 	path: '',
			// 	redirectTo: 'description',
			// 	// redirectTo: '../../products-list',
			// 	pathMatch: 'full',
			// }
		],
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
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
