import './add-town.component.scss';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'add-town',
	template: `
		<div class="b-add-town">
			<div class="add-town__title">Add Town For Weather Observe</div>
			<form (submit)="onSubmitTown(town.value); $event.preventDefault(); town.value = ''" >
				<div class="add-town__input-wrapper">
					<input class="add-town__input" type="text" #town/>
				</div>
				<div class="row">
					<div class="col">
						<button class="add-town__button" type="submit">Get Weather</button>
					</div>
					<div *ngIf="isLoadingTownWeather" class="add-town__spinner col">
						<spinner type="small"></spinner>
					</div>
					<div *ngIf="getTownWeatherError" class="add-town__error col">
						{{ getTownWeatherError }}
					</div>
					<div *ngIf="duplicateTownWeatherError" class="add-town__error col">
						{{ duplicateTownWeatherError }}
					</div>
				</div>
			</form>
		</div>
	`
})
export class AddTownComponent {
	@Input() private getTownWeatherError: string;
	@Input() private duplicateTownWeatherError: string;
	@Input() private isLoadingTownWeather: boolean;
	@Output() private onAddTown = new EventEmitter<string>();

	onSubmitTown(townName: string): void {
		this.onAddTown.emit(townName);
	}
}