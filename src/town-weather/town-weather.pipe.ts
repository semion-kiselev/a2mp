import { Pipe, PipeTransform } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/Rx';

import { openWeatherApiKey } from '../app.config';

interface TownWeatherCacheData {
	weather: string,
	timestamp: number;
}

@Pipe({
	name: 'townWeather',
	pure: false
})
export class TownWeatherPipe implements PipeTransform {
	private apiKey: string = openWeatherApiKey;
	private urlTmp: string = 'http://api.openweathermap.org/data/2.5/weather?q=${townName}&units=metric';
	private freshTimeInMs: number = 10*60*1000;
	private isLoading: boolean = false;
	private hasError: boolean = false;
	private errorMsg: string = '';
	private defaultErrorMsg: string = 'Whoops, something goes wrong. Please try again later';
	private cacheData = {}; 

	constructor(private http: Http) {}

	transform(townName: string): string {
		if ( (!this.cacheData[townName] || !this.cachedDataIsFresh(this.cacheData[townName])) &&
			  !this.isLoading	
		 ) {
			this.isLoading = true;
			this.cacheData[townName] = {};

			let url: string = this.urlTmp.replace(/\$\{townName\}/, townName);
			url = `${url}&appid=${this.apiKey}`;

			this.http.get(url)
				.map(result => result.json())
				.subscribe(result => {
					this.cacheData[townName].weather = result;
					this.cacheData[townName].timestamp = Date.now();
					this.isLoading = false;
				}, error => {
					this.hasError = true;
					this.errorMsg = error;
				});

		}

		// if (this.isLoading) return 'Please wait, the weather is loading...';

		if (this.hasError) {
			return (this.errorMsg) ? this.errorMsg : this.defaultErrorMsg;
		}

		const weather = this.cacheData[townName].weather;
		return weather? 
			`The weather in ${weather.name}: ${Math.round(weather.main.temp)}°C, ${weather.weather[0].description}` : 
			'';
	}

	cachedDataIsFresh(dataItem: TownWeatherCacheData): boolean {
		return Date.now() - dataItem.timestamp < this.freshTimeInMs;
	}
}