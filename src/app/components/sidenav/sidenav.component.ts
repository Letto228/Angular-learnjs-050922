import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { CategoriesStoreService } from '../../shared/categories/categories-store.service';
import { ISubCategory } from '../../shared/categories/sub-category.interface';

@Component({
	selector: 'app-sidenav',
	templateUrl: './sidenav.component.html',
	styleUrls: ['./sidenav.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavComponent implements OnInit {
	readonly categories$ = this.categoriesStoreService.categories$;

	@ViewChild(MatDrawer, { static: true })
	private readonly drawer!: MatDrawer;

	constructor(
		private readonly changeDetectorRef: ChangeDetectorRef,
		private readonly categoriesStoreService: CategoriesStoreService,
		private readonly router: Router,
	) {}

	ngOnInit() {
		this.categoriesStoreService.loadCategories();
	}

	onSubCategorySelect(subCategory: ISubCategory) {
		this.router.navigate(['/products-list', subCategory._id]);
	}

	toggleSidenavOpened() {
		this.drawer.toggle();
		this.changeDetectorRef.markForCheck();
	}
}
