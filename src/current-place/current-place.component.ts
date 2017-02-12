
import { Component, OnInit } from '@angular/core';
import { GeoPositionService } from '../core/services/geo-position.service';
import { OpenWeatherService } from '../core/services/open-weather.service';
import { TownWeather } from '../shared/interfaces/TownWeather';
import { Geoposition } from '../shared/interfaces/Geoposition';

@Component({
	template: `
		<div class="b-current-place">
			<h3 class="current-place__title">My current place</h3>

			<div *ngIf="!hasError && currentPlaceData" class="current-place__towns-item">
				<div class="b-towns-item">
					<div class="row">
						<div class="towns-item__name-wrapper col">
							<div class="towns-item__name">{{ currentPlaceData.name }}</div>
						</div>
						<div class="towns-item__info-wrapper col pull-right">
							<div class="row">
								<div class="towns-item__icon col">
									<weather-icon [icon]="currentPlaceData.icon"></weather-icon>
								</div>
								<div class="towns-item__temp col">
									{{ currentPlaceData.temp }}<sup class="towns-item__sup">°C</sup>
								</div>
								<div class="towns-item__wind col">
									<weather-wind
										[speed]="currentPlaceData.windSpeed" 
										[deg]="currentPlaceData.windDeg"
									></weather-wind>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>			

			<div *ngIf="hasError">
				<alert 
					type="danger" 
					message="Whoops, something went wrong :("
				></alert>
			</div>
		</div>
	`
})
export class CurrentPlaceComponent implements OnInit {
	private currentPlaceData: TownWeather;
	private isLoading: boolean = false;
	private hasError: boolean = false;

	constructor(
		private geoPosition: GeoPositionService,
		private OWS: OpenWeatherService
	) {}

	ngOnInit() {
		this.getPositionAndCurrentPlaceData();
	}

	getPositionAndCurrentPlaceData() {
		this.geoPosition.getPosition()
			.then((position: Geoposition) => {
				const latitude: number = position.coords.latitude;
				const longitude: number = position.coords.longitude;

				this.isLoading = true;
				this.OWS.getTownWeatherByCoords(latitude, longitude).subscribe(
					(data: TownWeather) => {
						this.isLoading = false;
						this.currentPlaceData = data;
					},
					() => {
						this.isLoading = false;
						this.hasError = true;	
					}
				)		
			});
	}
}