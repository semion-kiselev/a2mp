import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Store } from '@ngrx/store';
import { State } from './reducers';
import {
	ToggleFavoriteSuccess,
	AddTownDuplicateFailure,
	AddTownSuccess,
	AddTownFailure,
	FetchTownsSuccess,
	FetchTownsFailure,
	DeleteTownSuccess
} from './actions';

import * as TownWeatherActions from './actions';
import { OpenWeatherService } from '../core/services/open-weather.service';

import { SavedTown } from '../shared/interfaces/SavedTown';
import { TownWeather } from '../shared/interfaces/TownWeather';
import { AddTownFormData } from '../shared/interfaces/AddTownFormData';

@Injectable()
export class TownWeatherEffects {
	constructor(
		private actions$: Actions, 
		private OWS: OpenWeatherService,
		private store: Store<State>
	) {}

	@Effect()
	fetchTowns$: Observable<Action> = this.actions$
		.ofType(TownWeatherActions.ActionTypes.FETCH_TOWNS)
		.switchMap<Action>(() => {
			const savedTowns: SavedTown[] = this.OWS.getTownsFromStorage();

			if (!savedTowns) {
				return Observable.of(new FetchTownsSuccess([]));
			}

			this.OWS.startTownsWeatherPeriodicUpdate();

			return this.OWS.getTownsWeather(savedTowns)
				.map(formatedData => (new FetchTownsSuccess(formatedData)))
				.catch(error => (
					Observable.of(new FetchTownsFailure(error))
				));
		});

	@Effect()
	addTown$: Observable<Action> = this.actions$
		.ofType(TownWeatherActions.ActionTypes.ADD_TOWN)
		.switchMap(action => { 
			return this.OWS.addTown(action.payload)
				.mergeMap<Action>((townWeather: TownWeather) => {
					if (this.OWS.isThisTownAlreadyExists(townWeather.id)) {
						return Observable.from([
							new AddTownDuplicateFailure(`This town is already observed. It\'s name ${townWeather.name}`)
						]);
					}

					if (action.payload.markTownAsFavorite) {
						return Observable.from([new AddTownSuccess(townWeather), new ToggleFavoriteSuccess(townWeather.id)]);
					}

					return Observable.from([new AddTownSuccess(townWeather)]);
				})
				.catch(error => Observable.of(new AddTownFailure(error.statusText || error)))
		})

	@Effect()
	deleteTown$: Observable<Action> = this.actions$
		.ofType(TownWeatherActions.ActionTypes.DELETE_TOWN)
		.switchMap(action => {
			this.OWS.cancelAndDeferUpdateIfInProgress();

			return Observable.of(new DeleteTownSuccess(action.payload))
		});

	@Effect()
	toggleFavorite$: Observable<Action> = this.actions$
		.ofType(TownWeatherActions.ActionTypes.TOGGLE_FAVORITE)
		.switchMap(action => {
			this.OWS.cancelAndDeferUpdateIfInProgress();

			return Observable.of(new ToggleFavoriteSuccess(action.payload))
		});
}