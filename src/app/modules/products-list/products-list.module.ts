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
import { LetModule } from '../../shared/let/let.module';
import { GetJsonModule } from '../../shared/get-json/get-json.module';
import { FilterByParamModule } from '../../shared/filter-by-param/filter-by-param.module';

@NgModule({
	declarations: [ProductsListComponent, ProductCardComponent],
	imports: [
		CommonModule,
		MatCardModule,
		MatButtonModule,
		MatIconModule,
		MatInputModule,
		MatProgressSpinnerModule,
		CarouselModule,
		PaginationModule,
		LetModule,
		GetJsonModule,
		FilterByParamModule,
	],
	exports: [ProductsListComponent],
})
export class ProductsListModule {}
