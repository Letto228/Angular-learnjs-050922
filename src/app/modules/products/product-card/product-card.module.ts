import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ProductCardComponent } from './product-card.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
	declarations: [ProductCardComponent],
	imports: [CommonModule, MatCardModule, MatButtonModule],
	exports: [ProductCardComponent],
})
export class ProductCardModule {}
