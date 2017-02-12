import './town-detail.component.scss';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { TownWeather } from '../../shared/interfaces/TownWeather';

@Component({
	template: `
		<div class="b-town-detail">
			<h2 class="town-detail__title">{{weatherData.name}} weather details</h2>
			<ul class="town-detail__list">
				<li class="town-detail__item"> Humidity: {{ weatherData.humidity }}</li>
				<li class="town-detail__item">Sunrise: {{ weatherData.sunrise }}</li>
				<li class="town-detail__item">Sunset: {{ weatherData.sunset }}</li>
			</ul>
			<i class="town-detail__cancel-icon" (click)="onClickCancel()"></i>
		</div>
	`
})
export class TownDetailComponent implements OnInit {
	weatherData: TownWeather;

	constructor(
		private route: ActivatedRoute,
		private router: Router
	) {}

	ngOnInit() {
		this.route.data.subscribe((data: { townWeatherData: TownWeather}) => {
			this.weatherData = data.townWeatherData;
		});
	}

	onClickCancel() {
		this.router.navigate(['/towns']);
	}
}