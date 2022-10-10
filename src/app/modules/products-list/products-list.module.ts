import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductsListComponent } from './products-list.component';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CarouselModule } from '../../shared/carousel/carousel.module';
import { PaginationModule } from '../../shared/pagination/pagination.module';
import { FilterByParamModule } from '../../shared/filter-by-param/filter-by-param.module';
import { RouterModule } from '@angular/router';
import { ProductsListRoutingModule } from './products-list-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CounterInputModule } from '../../shared/counter-input/counter-input.module';
import { ValidationDirectivesModule } from '../../shared/validators/directives/validation-directives.module';
import { ProductsFilterComponent } from './products-filter/products-filter.component';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
	declarations: [ProductsListComponent, ProductCardComponent, ProductsFilterComponent],
	imports: [
		CommonModule,
		MatCardModule,
		MatButtonModule,
		MatIconModule,
		MatInputModule,
		MatProgressSpinnerModule,
		CarouselModule,
		PaginationModule,
		FilterByParamModule,
		RouterModule,
		ProductsListRoutingModule,
		ReactiveFormsModule,
		FormsModule,
		CounterInputModule,
		ValidationDirectivesModule,
		MatCheckboxModule,
	],
	exports: [ProductsListComponent],
})
export class ProductsListModule {}
