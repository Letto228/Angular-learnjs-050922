import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import { IProduct } from '../../../shared/products/product.interface';

@Component({
	selector: 'app-product-card',
	templateUrl: './product-card.component.html',
	styleUrls: ['./product-card.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent {
	@Input() product: IProduct | undefined;

  @Output() onBuyClick = new EventEmitter<IProduct>()

	onProductBuy(event: Event) {
		event.stopPropagation();
    this.onBuyClick.emit(this.product)
	}

	isStarActive(starIndex: number): boolean {
		return !!(this.product && this.product.rating >= starIndex);
	}
}
