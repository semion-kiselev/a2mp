import './map.component.scss';
import { Component, OnInit, ElementRef, ChangeDetectionStrategy } from '@angular/core';

import { Geoposition } from '../shared/interfaces/Geoposition';
import { GoogleMaps } from '../shared/interfaces/GoogleMaps';

import { GeoPositionService } from '../core/services/geo-position.service';
import { GoogleMapsService } from '../core/services/google-maps.service';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'map',
	template: `
		<div class="b-map" [ngStyle]="{'height': hasError ? 'auto' : height + 'px'}">
			<div *ngIf="hasError" class="map__error">
				<alert type="danger" message="Whoops, something goes wrong with Google map..."></alert>
			</div>
		</div>
	`
})
export class MapComponent implements OnInit {
	private height: number = 500;
	private hasError: boolean = false;

	constructor(
		private el: ElementRef,
		private geoPosition: GeoPositionService,
		private googleMapsApi: GoogleMapsService
	) {}

	ngOnInit(): void {
		this.googleMapsApi.load()
			.then(this.getPositionAndRenderMap.bind(this))
			.catch(() => this.hasError = true);
	}
	
	getPositionAndRenderMap(googleMaps: GoogleMaps) {
		this.geoPosition.getPosition()
			.then((position: Geoposition) => {
				const latitude: number = position.coords.latitude;
				const longitude: number = position.coords.longitude;

				this.renderMap(googleMaps, latitude, longitude);		
			});
	}

	renderMap(googleMaps: GoogleMaps, latitude: number, longitude: number) {
		const el = this.el.nativeElement.querySelector('.b-map');
		if (el) {
			new googleMaps.Map(el, {
				center: {lat: latitude, lng: longitude},
				scrollwheel: false,
				zoom: 8
			});
		}
	}
}