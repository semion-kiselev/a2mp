import WeatherItem from '../interfaces/WeatherItem';
import { Geoposition } from '../interfaces/Geoposition';
import getJson from '../utils/getJson';
import { OpenWeatherResponseItem, OpenWeatherResponse } from '../interfaces/OpenWeatherResponse';

class WeatherService {
	private apiKey: string = '0585be187827a4d56040a8a992d654ab';
	private urlTmp: string = 'http://api.openweathermap.org/data/2.5/find?lat=${lat}&lon=${lon}&cnt=50&units=metric';
	private tenMinInMs: number = 10*60*1000;
	private localDataKey: string = 'weatherForCountries';
	private localSaveDateKey: string = 'weatherSaveDate';

	public getWeatherForCountries(): Promise<WeatherItem[]> {
		const localWeatherForCountries: string = localStorage.getItem(this.localDataKey);

		if ( localWeatherForCountries && this.localDataIsFresh() ) {
			return Promise.resolve(JSON.parse(localWeatherForCountries));
		}

		return this.getCurrentPosition().then(this.fetchWeather.bind(this));
	}

	public getCurrentPosition(): Promise<Geoposition> {
		return new Promise((resolve, reject) => {
			navigator.geolocation.getCurrentPosition(resolve, reject);
		});
	}

	private fetchWeather(position: Geoposition): Promise<WeatherItem[]> {
		const lat: number = position.coords.latitude;
		const lon: number = position.coords.longitude;
		let url: string = this.urlTmp.replace(/\$\{lat\}/, '' + lat).replace(/\$\{lon\}/, '' + lon);
		url = `${url}&appid=${this.apiKey}`;

		return getJson(url)
				.then(JSON.parse)
				.then(this.formatFetchedData.bind(this))
				.then(this.saveFormatedDataToLocalStorage.bind(this));
	}

	private formatFetchedData(data: OpenWeatherResponse): WeatherItem[] {
		return data.list.map((item: OpenWeatherResponseItem): WeatherItem => {
			return {
				name: item.name,
				temp: Math.round(item.main.temp),
				description: item.weather[0].description,
				icon: 'wi' + item.weather[0].icon
			};		
		});
	}

	private saveFormatedDataToLocalStorage(data: WeatherItem[]): WeatherItem[] {
		localStorage.setItem(this.localDataKey, JSON.stringify(data));
		localStorage.setItem(this.localSaveDateKey, '' + Date.now());

		return data;
	}

	private localDataIsFresh(): boolean {
		const currentDateMs: number = Date.now();
		const dataSaveDateMs: number = +localStorage.getItem(this.localSaveDateKey);

		return currentDateMs - dataSaveDateMs < this.tenMinInMs
	}
}

export default WeatherService;