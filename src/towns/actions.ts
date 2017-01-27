import { Action } from '@ngrx/store';
import { TownWeather } from '../shared/interfaces/TownWeather';

export const ActionTypes = {
    FETCH_TOWNS: 'FETCH_TOWNS',
    FETCH_TOWNS_SUCCESS: 'FETCH_TOWNS_SUCCESS',
    FETCH_TOWNS_FAILURE: 'FETCH_TOWNS_FAILURE',

    ADD_TOWN: 'ADD_TOWN',
    ADD_TOWN_SUCCESS: 'ADD_TOWN_SUCCESS',
    ADD_TOWN_FAILURE: 'ADD_TOWN_FAILURE',
    ADD_TOWN_DUPLICATE_FAILURE: 'ADD_TOWN_DUPLICATE_FAILURE',

    TOGGLE_FAVORITE: 'TOGGLE_FAVORITE',
    TOGGLE_FAVORITE_SUCCESS: 'TOGGLE_FAVORITE_SUCCESS',

    DELETE_TOWN: 'DELETE_TOWN',
    DELETE_TOWN_SUCCESS: 'DELETE_TOWN_SUCCESS'
};

export class FetchTowns implements Action  {
	type = ActionTypes.FETCH_TOWNS;
}

export class FetchTownsSuccess implements Action  {
	type = ActionTypes.FETCH_TOWNS_SUCCESS;

	constructor(public payload: TownWeather[]) {}
}

export class FetchTownsFailure implements Action  {
	type = ActionTypes.FETCH_TOWNS_FAILURE;

	constructor(public payload: string) {}
}


export class AddTown implements Action  {
	type = ActionTypes.ADD_TOWN;

	constructor(public payload: string) {}
}

export class AddTownSuccess implements Action  {
	type = ActionTypes.ADD_TOWN_SUCCESS;

	constructor(public payload: TownWeather) {}
}

export class AddTownFailure implements Action  {
	type = ActionTypes.ADD_TOWN_FAILURE;

	constructor(public payload: string) {}
}

export class AddTownDuplicateFailure implements Action  {
	type = ActionTypes.ADD_TOWN_DUPLICATE_FAILURE;

	constructor(public payload: string) {}
}


export class ToggleFavorite implements Action  {
	type = ActionTypes.TOGGLE_FAVORITE;

	constructor(public payload: number) {}
}

export class ToggleFavoriteSuccess implements Action  {
	type = ActionTypes.TOGGLE_FAVORITE_SUCCESS;

	constructor(public payload: number) {}
}


export class DeleteTown implements Action  {
	type = ActionTypes.DELETE_TOWN;

	constructor(public payload: number) {}
}

export class DeleteTownSuccess implements Action  {
	type = ActionTypes.DELETE_TOWN_SUCCESS;

	constructor(public payload: number) {}
}