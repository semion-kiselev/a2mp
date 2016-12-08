import { Pipe, PipeTransform } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/Rx';

interface TownWeatherCacheData {
	temp: string,
	timestamp: number;
}

@Pipe({
	name: 'townWeather',
	pure: false
})
export class TownWeatherPipe implements PipeTransform {
	private apiKey: string = '0585be187827a4d56040a8a992d654ab';
	private urlTmp: string = 'http://api.openweathermap.org/data/2.5/weather?q=${townName}';
	private cacheData = {}; 

	constructor(private http: Http) {}

	transform(townName: string): number {
		if (!this.cacheData[townName]) {
			this.cacheData[townName] = {};

			let url: string = this.urlTmp.replace(/\$\{townName\}/, townName);
			url = `${url}&appid=${this.apiKey}`;

			this.http.get(url)
				.map(result => result.json())
				.subscribe(result => {
					this.cacheData[townName].temp = result;
					this.cacheData[townName].timestamp = Date.now();
				});

		}

		console.log(this.cacheData[townName].temp);

		return this.cacheData[townName].temp;
	}
}