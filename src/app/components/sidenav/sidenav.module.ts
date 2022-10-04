import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './sidenav.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { CategoriesSelectComponent } from './categories-select/categories-select.component';

@NgModule({
	declarations: [SidenavComponent, CategoriesSelectComponent],
	imports: [CommonModule, MatSidenavModule, MatButtonModule, MatExpansionModule],
	exports: [SidenavComponent],
})
export class SidenavModule {}
