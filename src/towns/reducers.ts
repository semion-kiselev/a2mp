import { Action } from '@ngrx/store';
import { TownWeather } from '../shared/interfaces/TownWeather';
import * as TownWeatherActions from './actions';

interface State {
	data: TownWeather[];
	getTownsWeatherError: string;
	getTownWeatherError: string;
	duplicateTownWeatherError: string;
	isLoadingTownsWeather: boolean;
	isLoadingTownWeather: boolean;
};

const initialState: State = {
	data: [],
	getTownsWeatherError: '',
	getTownWeatherError: '',
	duplicateTownWeatherError: '',
	isLoadingTownsWeather: false,
	isLoadingTownWeather: false
};

export function townWeatherReducer(state = initialState, action: Action): State {
	switch (action.type) {
		case TownWeatherActions.ActionTypes.FETCH_TOWNS:
			return Object.assign({}, state, {
				isLoadingTownsWeather: true,
				getTownsWeatherError: ''
			});

		case TownWeatherActions.ActionTypes.FETCH_TOWNS_SUCCESS:
			return Object.assign({}, state, {
				isLoadingTownsWeather: false,
				data: action.payload
			});

		case TownWeatherActions.ActionTypes.FETCH_TOWNS_FAILURE:
			return Object.assign({}, state, {
				isLoadingTownsWeather: false,
				getTownsWeatherError: action.payload
			});


		case TownWeatherActions.ActionTypes.ADD_TOWN:
			return Object.assign({}, state, {
				duplicateTownWeatherError: '',
				isLoadingTownWeather: true,
				getTownWeatherError: ''
			});

		case TownWeatherActions.ActionTypes.ADD_TOWN_SUCCESS:
			return Object.assign({}, state, {
				isLoadingTownWeather: false,
				data: state.data.concat(action.payload)
			});

		case TownWeatherActions.ActionTypes.ADD_TOWN_FAILURE:
			return Object.assign({}, state, {
				isLoadingTownWeather: false,
				getTownWeatherError: action.payload
			});

		case TownWeatherActions.ActionTypes.ADD_TOWN_DUPLICATE_FAILURE:
			return Object.assign({}, state, {
				isLoadingTownWeather: false,
				duplicateTownWeatherError: action.payload
			});


		case TownWeatherActions.ActionTypes.TOGGLE_FAVORITE_SUCCESS:
			const newData = state.data.map(item => {
				let newItem: TownWeather = <TownWeather>{};

				for (let key in item ) {
					newItem[key] = item[key];
				}

				if (newItem.id === action.payload) {
					newItem.favorite = !newItem.favorite;
				} else {
					newItem.favorite = false;
				}

				return newItem;
			});

			return Object.assign({}, state, {data: newData});


		case TownWeatherActions.ActionTypes.DELETE_TOWN_SUCCESS:
			return Object.assign({}, state, {
				data: state.data.filter(item => item.id !== action.payload)
			});




		default: {
	      	return state;
	    }
	}
}

export {State}