import './town-weather.component.scss';

import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { LoaderService } from '../core/services/loader.service';

@Component({
	selector: 'town-weather',
	template: `
		<div class="b-town-weather">
			<div class="town-weather__title">Town Weather</div>
			<form (submit)="onGetWeather(town.value); $event.preventDefault(); town.value = ''" >
				<div class="town-weather__input-wrapper">
					<input class="town-weather__input" type="text" #town/>
				</div>
				<div class="row">
					<div class="col">
						<button class="town-weather__button" type="submit">Get Weather</button>
					</div>
					<div *ngIf="isLoading" class="town-weather__spinner col">
						<spinner type="small"></spinner>
					</div>
				</div>
			</form>
			<div class="town-weather__output" *ngIf="townName">{{ townName | townWeather }}</div>
		</div>
	`
})
export class TownWeatherComponent {
	private townName: string = '';
	private isLoading = false;

	constructor(private loaderService: LoaderService) {}

	private onGetWeather(townName: string): void {
		this.townName = townName;
	}

	private showLoadingIndicator(value:boolean): void {
		setTimeout(() => {
			this.isLoading = value;
		}, 0);
	}

	ngOnInit() {
		this.loaderService.loading$.subscribe(this.showLoadingIndicator.bind(this));
	}
};