import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { IProduct } from '../../../shared/products/product.interface';
import { productMock } from '../../../shared/products/product.mock';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCardComponent implements OnInit {
  product: IProduct = productMock;
  constructor() { }

  ngOnInit(): void {
  }

  onClickBay(){
    console.log('Bay');
  }

}
