import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import * as TownWeatherActions from './actions';
import { OpenWeatherService } from '../core/services/open-weather.service';

import { SavedTown } from '../shared/interfaces/SavedTown';

@Injectable()
export class TownWeatherEffects {
	constructor(
		private actions$: Actions, 
		private OWS: OpenWeatherService
	) {}

	@Effect()
	fetchTowns$: Observable<Action> = this.actions$
		.ofType(TownWeatherActions.ActionTypes.FETCH_TOWNS)
		.switchMap(() => {
			const savedTowns: SavedTown[] = this.OWS.getTownsFromStorage();

			if (!savedTowns) {
				return Observable.of({
					type: TownWeatherActions.ActionTypes.FETCH_TOWNS_SUCCESS,
					payload: []
				})
			}

			this.OWS.startTownsWeatherPeriodicUpdate();

			return this.OWS.getTownsWeather(savedTowns)
				.map(formatedData => ({
						type: TownWeatherActions.ActionTypes.FETCH_TOWNS_SUCCESS,
						payload: formatedData
					}))
				.catch(error => (
					Observable.of({
						type: TownWeatherActions.ActionTypes.FETCH_TOWNS_FAILURE,
						payload: error
					})
				));
		});

	@Effect()
	addTown$: Observable<Action> = this.actions$
		.ofType(TownWeatherActions.ActionTypes.ADD_TOWN)
		.switchMap(action => {
			return this.OWS.addTown(action.payload)
					.map(townWeather => {
						if (this.OWS.isThisTownAlreadyExists(townWeather.id)) {
							return {
								type: TownWeatherActions.ActionTypes.ADD_TOWN_DUPLICATE_FAILURE,
								payload: `This town is already observed. It\'s name ${townWeather.name}`
							}
						}

						return {
							type: TownWeatherActions.ActionTypes.ADD_TOWN_SUCCESS,
							payload: townWeather
						} 
					})
					.catch(error => (
						Observable.of({
							type: TownWeatherActions.ActionTypes.ADD_TOWN_FAILURE,
							payload: error
						})
					));
		});

	@Effect()
	deleteTown$: Observable<Action> = this.actions$
		.ofType(TownWeatherActions.ActionTypes.DELETE_TOWN)
		.switchMap(action => {
			this.OWS.cancelAndDeferUpdateIfInProgress();

			return Observable.of({
					type: TownWeatherActions.ActionTypes.DELETE_TOWN_SUCCESS,
					payload: action.payload
				})
		});

	@Effect()
	toggleFavorite$: Observable<Action> = this.actions$
		.ofType(TownWeatherActions.ActionTypes.TOGGLE_FAVORITE)
		.switchMap(action => {
			this.OWS.cancelAndDeferUpdateIfInProgress();

			return Observable.of({
					type: TownWeatherActions.ActionTypes.TOGGLE_FAVORITE_SUCCESS,
					payload: action.payload
				})
		});
}