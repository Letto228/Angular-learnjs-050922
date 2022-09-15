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
		DoCheck,
		AfterContentInit,
		AfterContentChecked,
		AfterViewInit,
		AfterViewChecked,
		OnDestroy
{
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

	ngDoCheck() {}

	ngAfterContentInit() {}

	ngAfterContentChecked() {}

	ngAfterViewInit() {
		// setTimeout(() => {
		//   this.drawer.toggle();
		// })
		console.log(this.drawerElement);
	}

	ngAfterViewChecked() {}

	ngOnDestroy() {}
}
