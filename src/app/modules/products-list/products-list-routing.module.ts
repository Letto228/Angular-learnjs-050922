import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionCanActivateGuard } from '../../shared/guards/question-can-activate.guard';
import { QuestionCanLoadGuard } from '../../shared/guards/question-can-load.guard';
import { ProductsListComponent } from './products-list.component';

const routes: Routes = [
	{
		path: '',
		component: ProductsListComponent,
		// canDeactivate: [QuestionCanDeactivateGuard],
		// data: {
		//     flag: false,
		//     roles: []
		// }
	},
	{
		path: ':subCategoryId',
		component: ProductsListComponent,
		// canDeactivate: [QuestionCanDeactivateGuard],
		// data: {
		//     flag: false,
		// }
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ProductsListRoutingModule {}
