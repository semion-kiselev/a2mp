import * as _ from 'lodash';
import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Subscription } from 'rxjs/Subscription';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { TownWeather } from '../../shared/interfaces/TownWeather';
import { OpenWeatherResponseItem, OpenWeatherResponse } from '../../shared/interfaces/OpenWeatherResponse';
import { openWeatherApiKey } from '../../app.config';

interface SavedTown {
	id: number;
	favorite: boolean;
}

Injectable()
export class OpenWeatherService {
	private apiKey: string = openWeatherApiKey;
	private weatherByTownNameUrl: string = 'http://api.openweathermap.org/data/2.5/weather?q={{townName}}&units=metric';
	private weatherByTownsIds: string = 'http://api.openweathermap.org/data/2.5/group?id={{townsIds}}&units=metric';
	private freshTimeInMs: number = 10*1000;
	private localStorageAccessKey: string = 'savedTowns';

	public data: BehaviorSubject<TownWeather[]> = new BehaviorSubject([]);

	public getTownsWeatherError: BehaviorSubject<string> = new BehaviorSubject('');
	public getTownWeatherError: BehaviorSubject<string> = new BehaviorSubject('');
	public duplicateTownWeatherError: BehaviorSubject<string> = new BehaviorSubject('');
	public isLoadingTownsWeather: BehaviorSubject<boolean> = new BehaviorSubject(false);
	public isLoadingTownWeather: BehaviorSubject<boolean> = new BehaviorSubject(false);

	private updateSubscription: Subscription;
	private updateInProgress: boolean = false;

	constructor(@Inject(Http) private http: Http) {}

	public getTownsWeather(): void {
		const savedTowns: SavedTown[] = this.getTownsFromStorage();

		if ( savedTowns ) {
			const townsIds: string = _.map(savedTowns, 'id').join(',');
			const url: string = this.getUrlForTownsWeather(townsIds);

			this.isLoadingTownsWeather.next(true);
			this.getTownsWeatherError.next('');

			this.http.get(url)
				.map(result => result.json())
				.map(parsedResult => this.formatFetchedTownsWeatherData(parsedResult))
				.map(formatedData => this.setFavoriteTown(formatedData, savedTowns))
				.subscribe(
					formatedData => {
						this.isLoadingTownsWeather.next(false);
						this.data.next(formatedData);
					},
					error => {
						this.isLoadingTownsWeather.next(false);
						this.getTownsWeatherError.next(error + '');
					}
				);
		}
	}

	public startTownsWeatherPeriodicUpdate(): void	{
		this.deferUpdate();
	}

	private deferUpdate(): void {
		setTimeout(() => this.updateWeather(), this.freshTimeInMs);
	}

	private updateWeather(): void {
		if (this.isLoadingTownsWeather.getValue() || this.isLoadingTownWeather.getValue() || this.updateInProgress) {
			this.deferUpdate();
			return;
		}

		const townsWeather: TownWeather[] = this.data.getValue();

		if (townsWeather.length === 0) {
			this.deferUpdate();
			return;
		}

		this.updateInProgress = true;

		const townsIds: string = _.map(townsWeather, 'id').join(',');
		const url: string = this.getUrlForTownsWeather(townsIds);

		this.updateSubscription = this.http.get(url)
				.map(result => result.json())
				.map(parsedResult => this.formatFetchedTownsWeatherData(parsedResult))
				.map(formatedData => this.setFavoriteTown(formatedData, townsWeather))
				.subscribe(
					formatedData => {
						this.data.next(formatedData);

						this.updateInProgress = false;
						this.deferUpdate();
					},
					error => {
						this.updateInProgress = false;
						this.deferUpdate();	
					}
				);
	}

	public addTown(townName: string): void {
		this.cancelAndDeferUpdateIfInProgress();

		const url = this.getUrlForTownWeather(townName);

		this.isLoadingTownWeather.next(true);
		this.getTownWeatherError.next('');

		this.http.get(url)
			.map(result => result.json())
			.map(parsedResult => this.formatFetchedTownWeatherData(parsedResult))
			.subscribe(
				townWeather => {
					this.isLoadingTownWeather.next(false);

					if (this.isThisTownAlreadyExists(townWeather.id)) {
						this.duplicateTownWeatherError.next(
							`This town is already observed. It\'s name ${townWeather.name}`
						);

						setTimeout(() => this.duplicateTownWeatherError.next(''), 3000);

						return false;
					}

					const townsWeather: TownWeather[] = this.data.getValue();
					const newTownsWeather: TownWeather[] = townsWeather.concat([townWeather]);

					this.data.next(newTownsWeather);
					this.saveTownsToStorage(newTownsWeather);
				},
				error => {
					this.isLoadingTownWeather.next(false);
					this.getTownWeatherError.next(error + '');
				}
			);

	}

	public deleteTown(townId: number): void {
		this.cancelAndDeferUpdateIfInProgress();

		let townsWeather: TownWeather[] = this.data.getValue();
		townsWeather = townsWeather.filter(item => item.id !== townId);

		this.data.next(townsWeather);
		this.saveTownsToStorage(townsWeather);
	}

	public toggleFavorite(townId: number): void {
		this.cancelAndDeferUpdateIfInProgress();

		let townsWeather: TownWeather[] = this.data.getValue();
		
		const newtownsWeather = townsWeather.map(item => {
			let newItem: TownWeather = {
				id: null, name: null, description: null, icon: null, temp: null, favorite: null
			};

			for (let key in item ) {
				newItem[key] = item[key];
			}

			if (newItem.id === townId) {
				newItem.favorite = !newItem.favorite;
			} else {
				newItem.favorite = false;
			}

			return newItem;
		});

		this.data.next(newtownsWeather);
		this.saveTownsToStorage(newtownsWeather);
	}

	private getUrlForTownsWeather(townsIds: string): string {
		return `${this.weatherByTownsIds.replace(/\{\{townsIds\}\}/, townsIds)}&appid=${this.apiKey}`;
	}

	private getUrlForTownWeather(townName: string): string {
		return `${this.weatherByTownNameUrl.replace(/\{\{townName\}\}/, townName)}&appid=${this.apiKey}`;
	}	

	private formatFetchedTownsWeatherData(data: OpenWeatherResponse): TownWeather[] {
		return data.list.map(this.formatFetchedTownWeatherData);
	}

	private formatFetchedTownWeatherData(data: OpenWeatherResponseItem): TownWeather {
		return {
			id: data.id,
			name: data.name,
			description: data.weather[0].description,
			icon: 'wi' + data.weather[0].icon,
			temp: Math.round(data.main.temp),
			favorite: false
		};
	}

	private setFavoriteTown(formatedData: TownWeather[], savedTowns: SavedTown[]): TownWeather[] {
		for (let town of formatedData) {
			for (let savedTown of savedTowns) {
				if (town.id === savedTown.id) {
					town.favorite = savedTown.favorite;
				}
			}
		}

		return formatedData;
	}

	private isThisTownAlreadyExists(townId: number): boolean {
		const currentTowns: TownWeather[] = this.data.getValue();
		for (let town of currentTowns) {
			if (town.id === townId) {
				return true;
			}
		}
		return false;
	}

	private cancelAndDeferUpdateIfInProgress(): void {
		if (this.updateInProgress) {
			this.updateSubscription.unsubscribe();
			this.updateInProgress = false;
			this.deferUpdate();
		}
	}

	private saveTownsToStorage(data: TownWeather[]): void {
		const dataToSave: SavedTown[] = data.map(item => { 
			return {
				id: item.id,
				favorite: item.favorite
			};
		});

		localStorage.setItem(this.localStorageAccessKey, JSON.stringify(dataToSave));
	}

	private getTownsFromStorage(): SavedTown[] {
		const savedTowns: string = localStorage.getItem(this.localStorageAccessKey);
		let parsedSavedTowns: SavedTown[];

		if ( savedTowns ) {
			parsedSavedTowns = JSON.parse(savedTowns);
		}
		return parsedSavedTowns && parsedSavedTowns.length > 0 ?  parsedSavedTowns : null;
	}
}