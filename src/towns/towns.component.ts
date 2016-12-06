import './towns.component.scss';
import { Component, OnInit } from '@angular/core';

import { OpenWeatherService } from '../core/services/open-weather.service';
import { WeatherItem } from '../shared/interfaces/WeatherItem';

@Component({
	selector: 'towns',
	template: `
		<div class="b-towns">
			<div *ngIf="isLoading" class="towns__loading">
				<spinner></spinner>
			</div>

			<div *ngIf="hasError" class="towns__error">
				<alert 
					type="danger" 
					message="Whoops, something goes wrong... Please, try again in 10 minutes."
				></alert>
			</div>

			<div *ngIf="!hasError && !isLoading">
				<div class="row">
					<div class="col pull-right">
						<div class="towns__paginator">
							<paginator *ngIf="pageQty > 1" 
								[pageQty]="pageQty" 
								(onPageChange)="onPageChange($event)"
							>
							</paginator>
						</div>
					</div>
				</div>

				<div class="towns__list-wrapper">
					<ul class="towns__list">
						<towns-item
							*ngFor="let item of dataToDisplay"
							[name]="item.name"
							[icon]="item.icon"
							[temp]="item.temp"
							[description]="item.description"
						></towns-item>
					</ul>
				</div>
			</div>
		</div>
	`
})
export class TownsComponent implements OnInit {
	private isLoading: boolean = true;
	private hasError: boolean = false;

	private data: WeatherItem[] = [];

	private rowsPerPage: number = 10;
	private currentPageIndex: number = 0;

	constructor(private openWeatherService: OpenWeatherService) {}

	get pageQty(): number {
		return Math.ceil(this.data.length / this.rowsPerPage);
	}

	get dataToDisplay(): WeatherItem[] {
		const from = this.rowsPerPage * this.currentPageIndex;
		const to = from + this.rowsPerPage;

		return this.data.slice(from, to);
	}	

	ngOnInit(): void {
		this.openWeatherService.getWeatherForCountries()
			.then((data: WeatherItem[]) => {
				this.isLoading = false;
				this.data = data;
			})
			.catch(() => {
				this.isLoading = false;
				this.hasError = true;
			});
	}

	onPageChange(pageIndex: number): void {
		this.currentPageIndex = pageIndex;
	}
}