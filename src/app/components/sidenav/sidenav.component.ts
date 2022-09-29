import {
	AfterContentInit,
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	ContentChild,
	TemplateRef,
	ViewChild,
	ViewContainerRef,
} from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
	selector: 'app-sidenav',
	templateUrl: './sidenav.component.html',
	styleUrls: ['./sidenav.component.less'],
	providers: [
		// {
		// 	provide: 'name',
		// 	useValue: 'SidenavComponent',
		// },
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavComponent implements AfterContentInit {
	@ViewChild(MatDrawer, { static: true }) private drawer!: MatDrawer;

	@ViewChild('navigationViewPort', { read: ViewContainerRef, static: true })
	private navigationViewPort!: ViewContainerRef;
	@ContentChild('navigationTemplate', { static: false })
	private navigationTemplate!: TemplateRef<unknown>;

	constructor(private readonly changeDetectorRef: ChangeDetectorRef) {}

	ngAfterContentInit() {
		this.insertNavigationTemplate(this.navigationTemplate);
	}

	toggleSidenavOpened() {
		this.drawer.toggle();
		this.changeDetectorRef.markForCheck();
	}

	private insertNavigationTemplate(template: TemplateRef<unknown>) {
		this.navigationViewPort.clear();
		this.navigationViewPort.createEmbeddedView(template);
	}
}
