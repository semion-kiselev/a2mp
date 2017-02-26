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
import { 
	mockedOpenWeatherServiceResponse as mockedResponse
} from '../../shared/mock-data/mockedOpenWeatherServiceResponse';

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

let OWS: OpenWeatherService;
let mockBackend: MockBackend;

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

  	beforeEach(inject([OpenWeatherService, XHRBackend], (service, backend) => {
  		OWS = service;
  		mockBackend = backend;
  	}));

  	// getTownsWeather()
  	it('should return an Observable<TownWeather[]>', () => {
		mockBackend.connections.subscribe((connection) => {
			connection.mockRespond(new Response(new ResponseOptions({
    			body: JSON.stringify(mockedResponse)
  			})));
		});

		OWS.getTownsWeather([]).subscribe((result) => {
			expect(result.length).toBe(1);
			expect(result[0]).toEqual(expectedTownWeatherItem);
		});
	});

  	describe('getTownWeatherById(), getTownWeatherByCoords(), addTown()', () => {
  		beforeEach(() => {
	    	mockBackend.connections.subscribe((connection) => {
				connection.mockRespond(new Response(new ResponseOptions({
        			body: JSON.stringify(mockedResponse.list[0])
      			})));
			});
	  	});

  		it('should return an Observable<TownWeather>', () => {			
			OWS.getTownWeatherById(1).subscribe((result) => {
				expect(result).toEqual(expectedTownWeatherItem);
			});
		});

		it('should return an Observable<TownWeather>', () => {
			OWS.getTownWeatherByCoords(0, 0).subscribe((result) => {
				expect(result).toEqual(expectedTownWeatherItem);
			});
		});

		it('should return an Observable<TownWeather>', () => {
			OWS.addTown({ townName: '', markTownAsFavorite: false }).subscribe((result) => {
				expect(result).toEqual(expectedTownWeatherItem);
			});
		});
  	});
});