import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { IProduct } from '../../../shared/products/product.interface';

@Component({
	selector: 'app-product-card',
	templateUrl: './product-card.component.html',
	styleUrls: ['./product-card.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent implements OnInit {
	@Input() product: IProduct | undefined;

	constructor() {}

	ngOnInit(): void {}

	onBuyClick($event: MouseEvent): void {
		$event.stopPropagation();

		console.log('Buy');
	}
}
