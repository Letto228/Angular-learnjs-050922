import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { productMock } from 'src/app/shared/products/product.mock';

@Component({
    selector: 'app-product-card',
    templateUrl: './product-card.component.html',
    styleUrls: ['./product-card.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCardComponent implements OnInit {
    readonly card = productMock;

    readonly priceLabel = 'Цена:';
    readonly rateLabel = 'Рейтинг:';
    readonly feedbackLabel = 'Отзывов:';
    readonly buyMessage = 'Товар добавлен в корзину';

    readonly buyBtnSelector = '.buy-message';
    readonly hiddenClass = 'hidden';

    private timeoutId: any = null;

    constructor() {}

    onBuy() {
        console.log('Buy btn clicked!');

        const msg = document.querySelector(this.buyBtnSelector);
        msg?.classList.remove(this.hiddenClass);

        this.clearBuyTimeout();
        this.setBuyTimeout(msg);
    }

    setBuyTimeout(item: any) {
        this.timeoutId = setTimeout(() => { item.classList.add(this.hiddenClass); }, 2000)
    }

    clearBuyTimeout() {
        if (!this.timeoutId) return;
        clearTimeout(this.timeoutId);
        this.timeoutId = null;
    }

    ngOnInit(): void {
    }
}
