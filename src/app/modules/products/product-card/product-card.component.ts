import { ChangeDetectionStrategy, Component, OnInit,  Input, Output , EventEmitter} from '@angular/core';
import { IProduct } from '../../../shared/products/product.interface';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCardComponent {
	@Input() product: IProduct | undefined;
	@Output() ClickBay = new EventEmitter<IProduct['_id']>();

  onClickBay(){
    console.log('Bay');
	this.ClickBay.emit(this.product?._id)
  }

}
