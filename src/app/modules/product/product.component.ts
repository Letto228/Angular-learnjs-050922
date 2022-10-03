import { ChangeDetectionStrategy, Component } from '@angular/core';
import { of, tap } from 'rxjs';
import { productMock } from '../../shared/products/product.mock';

@Component({
	selector: 'app-product',
	templateUrl: './product.component.html',
	styleUrls: ['./product.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent {
	readonly product$ = of(productMock).pipe(tap(console.log));
}
