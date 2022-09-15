import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IProduct } from '../../../shared/products/product.interface';
import { productMock } from '../../../shared/products/product.mock';

@Component({
	selector: 'app-product-card',
	templateUrl: './product-card.component.html',
	styleUrls: ['./product-card.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent {
	product: IProduct = productMock;

	onProductBuy(event: Event) {
		event.stopPropagation();
	}

	isStarActive(starIndex: number): boolean {
		return this.product.rating >= starIndex;
	}
}
