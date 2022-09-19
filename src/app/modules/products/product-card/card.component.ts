import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { productMock } from '../../../shared/products/product.mock';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent implements OnInit {
  readonly card = productMock

  constructor() { }

  ngOnInit(): void {
  }

  onBuy(event: Event) {
    event.stopPropagation();
    console.log('Buy button pressed');
  }
}
