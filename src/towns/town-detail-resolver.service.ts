import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { OpenWeatherService } from '../core/services/open-weather.service';
import { TownWeather } from '../shared/interfaces/TownWeather';

@Injectable()
export class TownDetailResolver implements Resolve<TownWeather> {
	constructor(
		private OWS: OpenWeatherService,
		private router: Router
	) {}

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TownWeather> {
		const townId = route.params['id'];

		return this.OWS.getTownWeatherById(townId)
				.catch(error => {
					this.router.navigate(['/towns']);
					return Observable.of(null)
				});
	}
}