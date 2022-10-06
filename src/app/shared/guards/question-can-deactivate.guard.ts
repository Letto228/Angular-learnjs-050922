import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductComponent } from '../../modules/product/product.component';

@Injectable({
	providedIn: 'root',
})
export class QuestionCanDeactivateGuard<T> implements CanDeactivate<unknown> {
	canDeactivate(
		component: T,
		currentRoute: ActivatedRouteSnapshot,
		currentState: RouterStateSnapshot,
		nextState?: RouterStateSnapshot,
	): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		// console.log(component);

		return window.prompt('Хотите уйти со страницы?') === 'Yes';
	}
}
