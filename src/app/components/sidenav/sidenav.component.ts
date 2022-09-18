import {
	AfterContentChecked,
	AfterContentInit,
	AfterViewChecked,
	AfterViewInit,
	Attribute,
	ChangeDetectionStrategy,
	Component,
	DoCheck,
	ElementRef,
	EventEmitter,
	Input,
	OnChanges,
	OnDestroy,
	OnInit,
	Output,
	SimpleChanges,
	TemplateRef,
	ViewChild,
	ViewContainerRef,
} from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { IProduct } from 'src/app/shared/products/product.interface';
import { productMock } from 'src/app/shared/products/product.mock';

@Component({
	selector: 'app-sidenav',
	templateUrl: './sidenav.component.html',
	styleUrls: ['./sidenav.component.less'],
	// changeDetection: ChangeDetectionStrategy.OnPush
})
/* eslint-disable */
export class SidenavComponent
	implements
		OnChanges,
		OnInit,
		AfterViewInit
{
    readonly productMock = productMock;

    // @Input() isSidenavOpened = true;

	// @Output() isSidenavOpenedChange = new EventEmitter<boolean>(); // prefix = Input name postfix = "Change"

	// @ViewChild('template') private templateRef!: TemplateRef<unknown>;
	@ViewChild(MatDrawer, { static: true }) private drawer!: MatDrawer;
	@ViewChild(MatDrawer, { read: ElementRef, static: false })
	set drawerElementRef(elementRef: ElementRef | undefined) {
		this.drawerElement = elementRef?.nativeElement;
	}

	drawerElement: HTMLElement | undefined;

	constructor(@Attribute('isSidenavOpened') private readonly isSidenavOpenedAttr: boolean) {
		console.log(this.isSidenavOpenedAttr);
		// setTimeout(() => {
		// console.log(this.drawerElement);
		// }, 1000)
	}

	onInput(event: Event) {
		console.log((event.target as HTMLInputElement).value);
	}

	toggleSidenavOpened() {
		this.drawer.toggle();
		// this.isSidenavOpenedChange.emit(this.drawer.opened);
		// this.isSidenavOpenedChange.emit(!this.isSidenavOpened);
	}

	ngOnChanges({ isSidenavOpened }: SimpleChanges) {
		if (isSidenavOpened) {
			// isSidenavOpened.currentValue === this.isSidenavOpened
			// const res = isSidenavOpened.previousValue < this.isSidenavOpened;
			// const res = isSidenavOpened.previousValue < isSidenavOpened.currentValue;
			console.log('isSidenavOpened');
		}
	}

	ngOnInit() {
		// console.log(this.isSidenavOpened);
		// this.drawer.toggle()
		console.log(this.drawerElement);
	}

	ngAfterViewInit() {
		// setTimeout(() => {
		//   this.drawer.toggle();
		// })
		console.log(this.drawerElement);
	}

    public isHidden = true;
    private timeoutId:any = false;

    onProductBuy() {
        this.isHidden = false;
        clearTimeout(this.timeoutId);
        this.timeoutId = setTimeout(() => { this.isHidden = true; }, 2000);
        // P.S. c RXJS пока не успел разобраться

        console.log('Product buy clicked!');
    }

    onProductCardClick() {
        console.log('Product card clicked!');
    }
}
