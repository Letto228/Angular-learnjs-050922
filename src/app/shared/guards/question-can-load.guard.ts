import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class QuestionCanLoadGuard implements CanLoad {
	constructor(private readonly router: Router) {}

	canLoad(
		route: Route,
		segments: UrlSegment[],
	): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		return window.prompt('Хотите загрузить чанк?') === 'Yes';

		// this.router.navigate(['/']);
		// return false;

		// return this.router.createUrlTree(['/asd']);
	}
}
