import {
	AfterContentChecked,
	AfterContentInit,
	AfterViewChecked,
	AfterViewInit,
	Attribute,
	ChangeDetectionStrategy,
	Component,
	ContentChild,
	ContentChildren,
	DoCheck,
	ElementRef,
	EventEmitter,
	Input,
	OnChanges,
	OnDestroy,
	OnInit,
	Output,
	QueryList,
	SimpleChanges,
	TemplateRef,
	ViewChild,
	ViewContainerRef,
} from '@angular/core';
import { MatListItem } from '@angular/material/list';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
	selector: 'app-sidenav',
	templateUrl: './sidenav.component.html',
	styleUrls: ['./sidenav.component.less'],
	// changeDetection: ChangeDetectionStrategy.OnPush
})
/* eslint-disable */
export class SidenavComponent implements OnInit, AfterContentInit, AfterViewInit {
	// @Input() set navigationTemplate(template: TemplateRef<unknown>) {
	// 	setTimeout(() => {
	// 		this.insertNavigationTemplate(template);
	// 	}, 1000)
	// 	setTimeout(() => {
	// 		this.insertNavigationTemplate(template);
	// 	}, 3000)
	// 	setTimeout(() => {
	// 		this.insertNavigationTemplate(template);
	// 	}, 5000)
	// };

	@ViewChild(MatDrawer, { static: true }) private drawer!: MatDrawer;
	@ViewChild(MatDrawer, { read: ElementRef, static: false })
	set drawerElementRef(elementRef: ElementRef | undefined) {
		this.drawerElement = elementRef?.nativeElement;
	}

	@ViewChild('navigationViewPort', { read: ViewContainerRef, static: true })
	private navigationViewPort!: ViewContainerRef;
	@ContentChild('navigationTemplate', { static: false })
	private navigationTemplate!: TemplateRef<unknown>;

	@ContentChildren(MatListItem, { read: MatListItem, descendants: true })
	private matListItems!: QueryList<MatListItem>;

	drawerElement: HTMLElement | undefined;

	constructor() {}

	ngOnInit() {
		// this.insertNavigationTemplate(this.navigationTemplate);
	}

	ngAfterContentInit() {
		this.insertNavigationTemplate(this.navigationTemplate);
		console.log(this.matListItems);
	}

	ngAfterViewInit() {}

	onInput(event: Event) {
		console.log((event.target as HTMLInputElement).value);
	}

	toggleSidenavOpened() {
		this.drawer.toggle();
	}

	private insertNavigationTemplate(template: TemplateRef<unknown>) {
		this.navigationViewPort.clear();
		this.navigationViewPort.createEmbeddedView(template);
		// console.log(this.navigationViewPort.get(5));
	}
}
