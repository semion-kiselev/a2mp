import { NgModule } from '@angular/core';
import { RouterModule, Routes, Route, PreloadingStrategy } from '@angular/router';
import { Observable } from 'rxjs';

import { PageNotFoundComponent } from './shared/components/page-not-found.component';
import { CurrentPlaceComponent } from './current-place/current-place.component';

const appRoutes: Routes = [
	{ path: 'map', loadChildren: './map/map.module#MapModule', data: {preload: true} },
	{ path: 'current-place', component: CurrentPlaceComponent, outlet: 'current-place'},
	{ path: '', redirectTo: '/towns', pathMatch: 'full' },
	{ path: '**', component: PageNotFoundComponent }
];

export class CustomPreloadingStrategy implements PreloadingStrategy {
    preload(route: Route, load: () => Observable<any>): Observable<any> {
    	return (route.data && route.data['preload']) ? load() : Observable.of(null);
    }
}

@NgModule({
	imports: [
		RouterModule.forRoot(appRoutes, { preloadingStrategy: CustomPreloadingStrategy, enableTracing: true })
	],
	exports: [
		RouterModule
	]
})
export class AppRoutingModule {}