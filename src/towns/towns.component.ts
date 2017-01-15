import './towns.component.scss';
import { Component, OnInit } from '@angular/core';

import { TownWeather } from '../shared/interfaces/TownWeather';
import { OpenWeatherService } from '../core/services/open-weather.service';

@Component({
	selector: 'towns',
	template: `
		<div class="b-towns">
			<div *ngIf="isLoadingTownsWeather" class="towns__loading">
				<spinner></spinner>
			</div>

			<div *ngIf="getTownsWeatherError" class="towns__error">
				<alert 
					type="danger" 
					[message]="getTownsWeatherError"
				></alert>
			</div>

			<div *ngIf="!getTownsWeatherError && !isLoadingTownsWeather" class="towns__paginator row">
				<div class="col pull-right">
					<paginator *ngIf="pageQty > 1" 
						[pageQty]="pageQty" 
						[currentPageIndex]="currentPageIndex" 
						(onPageChange)="onPageChange($event)"
					>
					</paginator>
				</div>
			</div>

			<div *ngIf="!getTownsWeatherError && !isLoadingTownsWeather && data.length === 0" class="towns__empty-list">
				<alert 
					type="info" 
					message="There is no towns, which weather to observe. 
								Please, add at least one, but no more then twenty"
				></alert>
			</div>			

			<div *ngIf="!getTownsWeatherError && !isLoadingTownsWeather && data.length > 0" class="towns__list">
				<towns-list 
					[data]="data | slice:from:to"
					(onToggleFavorite)="onToggleFavorite($event)"
					(onDeleteTown)="onDeleteTown($event)"
				></towns-list>
			</div>

			<div *ngIf="townsOverloadError" class="towns__error">
				<alert 
					type="danger" 
					message="You were told - no more then twenty, remember?"
				></alert>
			</div>

			<div class="towns__add">
				<add-town 
					[getTownWeatherError]="getTownWeatherError"
					[duplicateTownWeatherError]="duplicateTownWeatherError"
					[isLoadingTownWeather]="isLoadingTownWeather"
					(onAddTown)="onAddTown($event)"
				></add-town>
			</div>
		</div>
	`
})
export class TownsComponent implements OnInit {
	private data: TownWeather[] = [];

	private rowsPerPage: number = 10;
	private currentPageIndex: number = 0;

	private getTownsWeatherError: string = '';
	private getTownWeatherError: string = '';
	private duplicateTownWeatherError: string= '';
	private townsOverloadError: boolean = false;
	private isLoadingTownsWeather: boolean = false;
	private isLoadingTownWeather: boolean = false;
	

	constructor(private OWS: OpenWeatherService) {}

	get pageQty(): number {
		return Math.ceil(this.data.length / this.rowsPerPage);
	}

	get from() {
		return this.rowsPerPage * this.currentPageIndex;
	}

	get to() {
		return this.from + this.rowsPerPage;
	}	

	ngOnInit(): void {
		this.OWS.data.subscribe((data: TownWeather[]) => {
			if (this.data.length % this.rowsPerPage === 0 && 
				data.length % this.rowsPerPage === 1 && 
				this.data.length !== 0) {

				this.currentPageIndex += 1;
			} else if (this.data.length % this.rowsPerPage === 1 && 
				data.length % this.rowsPerPage === 0 && 
				this.rowsPerPage !== 0) {

				this.currentPageIndex -= 1;
			}

			this.data = data;	
		});
		this.OWS.getTownsWeatherError.subscribe((value: string) => this.getTownsWeatherError = value);
		this.OWS.getTownWeatherError.subscribe((value: string) => this.getTownWeatherError = value);
		this.OWS.duplicateTownWeatherError.subscribe((value: string) => this.duplicateTownWeatherError = value);
		this.OWS.isLoadingTownsWeather.subscribe((value: boolean) => this.isLoadingTownsWeather = value);
		this.OWS.isLoadingTownWeather.subscribe((value: boolean) => this.isLoadingTownWeather = value);

		this.OWS.getTownsWeather();
		// this.OWS.startTownsWeatherPeriodicUpdate();
	}

	onPageChange(pageIndex: number): void {
		this.currentPageIndex = pageIndex;
	}

	onAddTown(townName: string): void {
		if (this.data.length < 20) {
			this.OWS.addTown(townName);
		} else {
			this.townsOverloadError = true;
			setTimeout(() => this.townsOverloadError = false, 2000);
		}
	}

	onDeleteTown(townId: number): void {
		this.OWS.deleteTown(townId);
	}

	onToggleFavorite(townId: number): void {
		this.OWS.toggleFavorite(townId);
	}
}