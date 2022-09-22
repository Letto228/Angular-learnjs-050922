import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductsListComponent } from './products-list.component';
import { MatInputModule } from '@angular/material/input';

@NgModule({
	declarations: [ProductsListComponent, ProductCardComponent],
	imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatInputModule],
	exports: [ProductsListComponent],
})
export class ProductsListModule {}
