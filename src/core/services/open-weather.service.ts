import * as _ from 'lodash';
import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Subscription } from 'rxjs/Subscription';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { TownWeather } from '../../shared/interfaces/TownWeather';
import { SavedTown } from '../../shared/interfaces/SavedTown';
import { OpenWeatherResponseItem, OpenWeatherResponse } from '../../shared/interfaces/OpenWeatherResponse';
import { openWeatherApiKey } from '../../app.config';

import { Store } from '@ngrx/store';
import { State } from '../../towns/reducers';
import { FetchTownsSuccess } from '../../towns/actions';

Injectable()
export class OpenWeatherService {
	private apiKey: string = openWeatherApiKey;
	private weatherByTownNameUrl: string = 'http://api.openweathermap.org/data/2.5/weather?q={{townName}}&units=metric';
	private weatherByTownsIds: string = 'http://api.openweathermap.org/data/2.5/group?id={{townsIds}}&units=metric';
	private freshTimeInMs: number = 60*1000;
	private localStorageAccessKey: string = 'savedTowns';

	private updateSubscription: Subscription;
	private updateInProgress: boolean = false;
	private isLoadingTownsWeather: boolean = false;
	private isLoadingTownWeather: boolean = false;

	constructor(
		@Inject(Http) private http: Http,
		@Inject(Store) private store: Store<State>,
	) {
		this.store.select('data').subscribe((data: TownWeather[]) => this.saveTownsToStorage(data));
		this.store.select('isLoadingTownsWeather').subscribe((value: boolean) => this.isLoadingTownsWeather = value);
		this.store.select('isLoadingTownWeather').subscribe((value: boolean) => this.isLoadingTownWeather = value);
	}

	public getTownsWeather(savedTowns: SavedTown[]): Observable<TownWeather[]> {
		const townsIds: string = _.map(savedTowns, 'id').join(',');
		const url: string = this.getUrlForTownsWeather(townsIds);

		return this.http.get(url)
			.map(result => result.json())
			.map(parsedResult => this.formatFetchedTownsWeatherData(parsedResult))
			.map(formatedData => this.setFavoriteTown(formatedData, savedTowns));
	}
 
	public startTownsWeatherPeriodicUpdate(): void	{
		this.deferUpdate();
	}

	private deferUpdate(): void {
		setTimeout(() => this.updateWeather(), this.freshTimeInMs);
	}

	private updateWeather(): void {
		if (this.isLoadingTownsWeather || this.isLoadingTownWeather || this.updateInProgress) {
			this.deferUpdate();
			return;
		}

		const savedTowns: SavedTown[] = this.getTownsFromStorage();

		if (!savedTowns) {
			this.deferUpdate();
			return;
		}

		this.updateInProgress = true;

		this.updateSubscription = this.getTownsWeather(savedTowns)
			.subscribe(
				formatedData => {
					this.store.dispatch(new FetchTownsSuccess(formatedData));

					this.updateInProgress = false;
					this.deferUpdate();
				},
				error => {
					this.updateInProgress = false;
					this.deferUpdate();	
				}
			);
	}

	public addTown(townName: string): Observable<TownWeather> {
		this.cancelAndDeferUpdateIfInProgress();

		const url = this.getUrlForTownWeather(townName);

		return this.http.get(url)
			.map(result => result.json())
			.map(parsedResult => this.formatFetchedTownWeatherData(parsedResult));
	}

	private getUrlForTownsWeather(townsIds: string): string {
		return `${this.weatherByTownsIds.replace(/\{\{townsIds\}\}/, townsIds)}&appid=${this.apiKey}`;
	}

	private getUrlForTownWeather(townName: string): string {
		return `${this.weatherByTownNameUrl.replace(/\{\{townName\}\}/, townName)}&appid=${this.apiKey}`;
	}	

	public formatFetchedTownsWeatherData(data: OpenWeatherResponse): TownWeather[] {
		return data.list.map(this.formatFetchedTownWeatherData);
	}

	private formatFetchedTownWeatherData(data: OpenWeatherResponseItem): TownWeather {
		return {
			id: data.id,
			name: data.name,
			description: data.weather[0].description,
			icon: 'wi' + data.weather[0].icon,
			temp: Math.round(data.main.temp),
			favorite: false,
			windSpeed: Math.round(data.wind.speed),
			windDeg: data.wind.deg
		};
	}

	public setFavoriteTown(formatedData: TownWeather[], savedTowns: SavedTown[]): TownWeather[] {
		for (let town of formatedData) {
			for (let savedTown of savedTowns) {
				if (town.id === savedTown.id) {
					town.favorite = savedTown.favorite;
				}
			}
		}

		return formatedData;
	}

	public isThisTownAlreadyExists(townId: number): boolean {
		const savedTowns: SavedTown[] = this.getTownsFromStorage();

		if (!savedTowns) {
			return false;
		}

		for (let town of savedTowns) {
			if (town.id === townId) {
				return true;
			}
		}
		return false;
	}

	public cancelAndDeferUpdateIfInProgress(): void {
		if (this.updateInProgress) {
			this.updateSubscription.unsubscribe();
			this.updateInProgress = false;
			this.deferUpdate();
		}
	}

	private saveTownsToStorage(data: TownWeather[]): void {
		if (data.length !== 0) {
			const dataToSave: SavedTown[] = data.map(item => { 
				return {
					id: item.id,
					favorite: item.favorite
				};
			});

			localStorage.setItem(this.localStorageAccessKey, JSON.stringify(dataToSave));
		}
	}

	public getTownsFromStorage(): SavedTown[] {
		const savedTowns: string = localStorage.getItem(this.localStorageAccessKey);
		let parsedSavedTowns: SavedTown[];

		if ( savedTowns ) {
			parsedSavedTowns = JSON.parse(savedTowns);
		}
		return parsedSavedTowns && parsedSavedTowns.length > 0 ?  parsedSavedTowns : null;
	}
}