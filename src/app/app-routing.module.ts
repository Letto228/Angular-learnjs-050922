import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './modules/not-found/not-found.component';
import { DescriptionComponent } from './modules/product/description/description.component';
import { ProductComponent } from './modules/product/product.component';
import { TypeComponent } from './modules/product/type/type.component';
import { ProductsListComponent } from './modules/products-list/products-list.component';

const routes: Routes = [
	{
		path: 'products-list',
		children: [
			{
				path: '',
				component: ProductsListComponent,
			},
			{
				path: ':subCategoryId',
				component: ProductsListComponent,
			},
		],
	},
	{
		path: 'product',
		children: [
			{
				path: ':id',
				component: ProductComponent,
				children: [
					{
						path: 'type',
						component: TypeComponent,
					},
					{
						path: 'description',
						component: DescriptionComponent,
					},
					{
						path: '',
						redirectTo: 'description',
						pathMatch: 'full',
					},
				],
			},
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
