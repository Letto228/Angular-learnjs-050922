import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { IProduct } from '../../../shared/products/product.interface';
import { ProductsApiService } from '../../../shared/products/products-api.service';

@Component({
	selector: 'app-product-card',
	templateUrl: './product-card.component.html',
	styleUrls: ['./product-card.component.less'],
	// providers: [
	// 	{
	// 		provide: 'random',
	// 		useClass: ProductsApiService,
	// 	}
	// ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent {
	@Input() product: IProduct | undefined;
	@Output() productBuy = new EventEmitter<IProduct['_id']>();

	// constructor(
	// 	@Inject('random') private readonly random: number,
	// ) {
	// 	console.log(this.random);
	// }

	onProductBuy(event: Event) {
		event.stopPropagation();

		this.productBuy.emit(this.product?._id);
	}

	isStarActive(starIndex: number): boolean {
		return Boolean(this.product && this.product.rating >= starIndex);
	}
}
