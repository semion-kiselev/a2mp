import { Component, Input } from '@angular/core';

@Component({
	selector: 'town-weather',
	template: `
		<div>Town Weather</div>
		<div><input type="text" #town/></div>
		<div><button (click)="onGetWeather(town.value)">Get Weather</button></div>
		<div *ngIf="townName">{{ townName | townWeather | json }}</div>
	`
})
export class TownWeatherComponent {
	private townName: string = '';

	private onGetWeather(townName: string): void {
		this.townName = townName;
	}
};