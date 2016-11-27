import WeatherService from '../services/weather.service';
import TownsComponent from '../components/towns/towns.component';
import MapComponent from '../components/map/map.component';

class WeatherModule {
	private weatherService: WeatherService;

	start(): void {
		this.weatherService = new WeatherService();
		this.initTownsComponent();
		this.initMapComponent();
	}

	initTownsComponent(): void {
		const countries = document.querySelectorAll('.b-towns');

		if (countries.length > 0) {
			[].forEach.call(countries, (countryEl: HTMLElement): void => {
				new TownsComponent(countryEl, this.weatherService);
			});
		}
	}

	initMapComponent(): void {
		const maps = document.querySelectorAll('.b-map');
		if (maps.length > 0) {
			[].forEach.call(maps, (mapEl: HTMLElement): void => {
				new MapComponent(mapEl, this.weatherService);
			});
		}
	}
}

export default WeatherModule;