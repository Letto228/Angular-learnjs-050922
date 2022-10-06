import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { mergeMap, Observable, of, Subject } from 'rxjs';

const preloadSubject$ = new Subject<string>();

setTimeout(() => {
	preloadSubject$.next('product');
}, 4000);

@Injectable({
	providedIn: 'root',
})
export class CustomPreloading implements PreloadingStrategy {
	preload(route: Route, load: () => Observable<any>): Observable<any> {
		return preloadSubject$.pipe(mergeMap((product) => (route.path === product ? load() : of(null))));
		// if (route.path === 'product') {
		//     console.log('Preloading', route.path);

		//     return load();
		// }

		// console.log('No preloading', route.path);

		// return of(null);
	}
}
