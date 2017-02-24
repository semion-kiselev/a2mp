import * as TownWeatherActions from './actions';
import { TownWeather } from '../shared/interfaces/TownWeather';
import { townWeatherReducer } from './reducers';
import { initialState } from './reducers';

const mockedTownWeather1 = {
	id: 1,
	name: '',
	description: '',
	icon: '',
	temp: 0,
	favorite: true,
	windSpeed: 0,
	windDeg: 0,
	humidity: '',
	sunrise: '',
	sunset: ''
};

const mockedTownWeather2 = Object.assign({}, mockedTownWeather1, { id: 2, favorite: false })

const mockedData = [
	mockedTownWeather1,
	mockedTownWeather2
];

describe('townWeatherReducer', () => {
	it('should return initial state', () => {
		expect(
			townWeatherReducer(initialState, {
				type: undefined
			})
		)
		.toEqual(initialState);
	});

	it('should handle FETCH_TOWNS', () => {
		expect(
			townWeatherReducer(initialState, {
				type: TownWeatherActions.ActionTypes.FETCH_TOWNS
			}))
		.toEqual(
			Object.assign({}, initialState, {
				isLoadingTownsWeather: true,
				getTownsWeatherError: ''
			})
		);
	});

	it('should handle FETCH_TOWNS_SUCCESS', () => {
		let mockedState = Object.assign({}, initialState);
		let expectedState = Object.assign({}, initialState, { data: [mockedTownWeather1, mockedTownWeather2] });

		expect(
			townWeatherReducer(initialState, {
				type: TownWeatherActions.ActionTypes.FETCH_TOWNS_SUCCESS,
				payload: [mockedTownWeather1, mockedTownWeather2]
			}))
		.toEqual(
			expectedState
		);
	});

	it('should handle FETCH_TOWNS_FAILURE', () => {
		expect(
			townWeatherReducer(initialState, {
				type: TownWeatherActions.ActionTypes.FETCH_TOWNS_FAILURE,
				payload: 'error'
			}))
		.toEqual(
			Object.assign({}, initialState, {
				isLoadingTownsWeather: false,
				getTownsWeatherError: 'error'
			})
		);
	});

	it('should handle ADD_TOWN', () => {
		expect(
			townWeatherReducer(initialState, {
				type: TownWeatherActions.ActionTypes.ADD_TOWN
			}))
		.toEqual(
			Object.assign({}, initialState, {
				duplicateTownWeatherError: '',
				isLoadingTownWeather: true,
				getTownWeatherError: ''
			})
		);
	});

	it('should handle ADD_TOWN_SUCCESS', () => {
		let mockedState = Object.assign({}, initialState);
		let expectedState = Object.assign({}, initialState, { data: [mockedTownWeather1] });

		expect(
			townWeatherReducer(initialState, {
				type: TownWeatherActions.ActionTypes.ADD_TOWN_SUCCESS,
				payload: [mockedTownWeather1]
			}))
		.toEqual(
			expectedState
		);
	});

	it('should handle ADD_TOWN_FAILURE', () => {
		expect(
			townWeatherReducer(initialState, {
				type: TownWeatherActions.ActionTypes.ADD_TOWN_FAILURE,
				payload: 'error'
			}))
		.toEqual(
			Object.assign({}, initialState, {
				isLoadingTownsWeather: false,
				getTownWeatherError: 'error'
			})
		);
	});

	it('should handle ADD_TOWN_DUPLICATE_FAILURE', () => { 
		expect(
			townWeatherReducer(initialState, {
				type: TownWeatherActions.ActionTypes.ADD_TOWN_DUPLICATE_FAILURE,
				payload: 'duplicate error'
			}))
		.toEqual(
			Object.assign({}, initialState, {
				isLoadingTownsWeather: false,
				duplicateTownWeatherError: 'duplicate error'
			})
		);
	});

	it('should handle TOGGLE_FAVORITE_SUCCESS', () => {
		let mockedState = Object.assign({}, initialState, { data: mockedData });
		let expectedMockedTownWeather1 = Object.assign({}, mockedTownWeather1, { favorite: false });
		let expectedMockedTownWeather2 = Object.assign({}, mockedTownWeather2, { favorite: true });
		let expectedData = [expectedMockedTownWeather1, expectedMockedTownWeather2];
		let expectedState = Object.assign({}, initialState, { data: expectedData });

		expect(
			townWeatherReducer(mockedState, {
				type: TownWeatherActions.ActionTypes.TOGGLE_FAVORITE_SUCCESS,
				payload: 2
			}))
		.toEqual(
			expectedState
		);
	});

	it('should handle DELETE_TOWN_SUCCESS', () => {
		let mockedState = Object.assign({}, initialState, { data: mockedData });
		let expectedState = Object.assign({}, initialState, { data: [mockedTownWeather1] });

		expect(
			townWeatherReducer(mockedState, {
				type: TownWeatherActions.ActionTypes.DELETE_TOWN_SUCCESS,
				payload: 2
			}))
		.toEqual(
			expectedState
		);
	});
});