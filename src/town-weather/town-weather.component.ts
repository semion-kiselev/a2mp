import './town-weather.component.scss';

import { Component, Input } from '@angular/core';

@Component({
	selector: 'town-weather',
	template: `
		<div class="b-town-weather">
			<div class="town-weather__title">Town Weather</div>
			<form (submit)="onGetWeather(town.value); $event.preventDefault(); town.value = ''" >
				<div class="town-weather__input-wrapper">
					<input class="town-weather__input" type="text" #town/>
				</div>
				<div>
					<button class="town-weather__button" type="submit">Get Weather</button>
				</div>
			</form>
			<div class="town-weather__output" *ngIf="townName">{{ townName | townWeather }}</div>
		</div>
	`
})
export class TownWeatherComponent {
	private townName: string = '';

	private onGetWeather(townName: string): void {
		this.townName = townName;
	}
};