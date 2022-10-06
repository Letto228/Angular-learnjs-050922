import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductsListComponent } from './products-list.component';
import { MatInputModule } from '@angular/material/input';
import { DumpNgIfModule } from '../../shared/dump-ng-if/dump-ng-if.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CarouselModule } from '../../shared/carousel/carousel.module';
import {PaginationModule} from "../../shared/pagination/pagination.module";

@NgModule({
	declarations: [ProductsListComponent, ProductCardComponent],
    imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        DumpNgIfModule,
        MatProgressSpinnerModule,
        CarouselModule,
        PaginationModule,
    ],
	exports: [ProductsListComponent],
})
export class ProductsListModule {}
