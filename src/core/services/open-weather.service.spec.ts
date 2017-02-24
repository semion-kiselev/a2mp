import { TestBed, inject } from '@angular/core/testing';
import {
  HttpModule,
  Http,
  Response,
  ResponseOptions,
  XHRBackend
} from '@angular/http';
import { StoreModule } from '@ngrx/store';
import { townWeatherReducer } from '../../towns/reducers';
import { MockBackend } from '@angular/http/testing';
import { OpenWeatherService } from './open-weather.service';

const mockedResponse = {
	cod: '',
	count: 1,
	list: [
		{
			clouds: {
				all: 0 
			},
			coord: {
				lat: 0,
				lon: 0
			},
			dt: 0,
			id: 1,
			main: {
				humidity: 0,
				pressure: 0,
				temp: 0,
				temp_max: 0,
				temp_min: 0
			},
			name: '',
			sys: {
				country: '',
				sunrise: 0,
				sunset: 0
			},
			weather: [
				{
					description: '',
					icon: '',
					id: 1,
					main: ''
				}
			],
			wind: {
				deg: 0,
				gust: 0,
				speed: 0,
				var_beg: 0,
				var_end: 0
			}
		}
	],
	message: 'string'
};

const sunriseDate = new Date(0);
const sunsetDate = new Date(0);
const getHours = (d: Date) => d.getHours().toString().length === 1 ? '0' + d.getHours() : d.getHours();
const getMinutes = (d: Date) => d.getMinutes().toString().length === 1 ? '0' + d.getMinutes() : d.getMinutes();

const expectedTownWeatherItem = {
	id: 1,
	name: '',
	description: '',
	icon: 'wi',
	temp: 0,
	favorite: false,
	windSpeed: 0,
	windDeg: 0,
	humidity: '0%',
	sunrise: getHours(sunriseDate) + ':' + getMinutes(sunriseDate),
	sunset: getHours(sunsetDate) + ':' + getMinutes(sunsetDate)
};

describe('OpenWeatherService', () => {
	beforeEach(() => {

    	TestBed.configureTestingModule({
			imports: [HttpModule, StoreModule.provideStore(townWeatherReducer)],
			providers: [
				OpenWeatherService,
				{ provide: XHRBackend, useClass: MockBackend },
			]
    	});
  	});

  	describe('getTownsWeather()', () => {
  		it('should return an Observable<TownWeather[]>', inject([OpenWeatherService, XHRBackend], (OWS, mockBackend) => {
			mockBackend.connections.subscribe((connection) => {
				connection.mockRespond(new Response(new ResponseOptions({
        			body: JSON.stringify(mockedResponse)
      			})));
			});

			OWS.getTownsWeather([]).subscribe((result) => {
				expect(result.length).toBe(1);
				expect(result[0]).toEqual(expectedTownWeatherItem);
			});
		}));
  	});

  	describe('getTownWeatherById()', () => {
  		it('should return an Observable<TownWeather>', inject([OpenWeatherService, XHRBackend], (OWS, mockBackend) => {
			mockBackend.connections.subscribe((connection) => {
				connection.mockRespond(new Response(new ResponseOptions({
        			body: JSON.stringify(mockedResponse.list[0])
      			})));
			});

			OWS.getTownWeatherById(1).subscribe((result) => {
				expect(result).toEqual(expectedTownWeatherItem);
			});
		}));
  	});

  	describe('getTownWeatherByCoords()', () => {
  		it('should return an Observable<TownWeather>', inject([OpenWeatherService, XHRBackend], (OWS, mockBackend) => {
			mockBackend.connections.subscribe((connection) => {
				connection.mockRespond(new Response(new ResponseOptions({
        			body: JSON.stringify(mockedResponse.list[0])
      			})));
			});

			OWS.getTownWeatherByCoords(0, 0).subscribe((result) => {
				expect(result).toEqual(expectedTownWeatherItem);
			});
		}));
  	});

  	describe('addTown()', () => {
  		it('should return an Observable<TownWeather>', inject([OpenWeatherService, XHRBackend], (OWS, mockBackend) => {
			mockBackend.connections.subscribe((connection) => {
				connection.mockRespond(new Response(new ResponseOptions({
        			body: JSON.stringify(mockedResponse.list[0])
      			})));
			});

			OWS.addTown({townName: ''}).subscribe((result) => {
				expect(result).toEqual(expectedTownWeatherItem);
			});
		}));
  	});
});