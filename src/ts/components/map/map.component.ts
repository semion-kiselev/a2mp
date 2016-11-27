/// <reference path="../../typings/google.maps.d.ts"/>
import './map.component.scss';

import { Geoposition } from '../../interfaces/Geoposition';
import WeatherService from '../../services/weather.service';
import loadGoogleMapsAPI from '../../utils/loadGoogleMapsApi';

class MapsComponent {

	constructor(private el: HTMLElement, private weatherService: WeatherService) {
		loadGoogleMapsAPI({key: 'AIzaSyDUXoXKPqU4Dx1GulPcmbVwfOXYDK7UsBQ'})
			.then(this.getPositionAndRenderMap.bind(this))
			.catch(this.renderError.bind(this));
	}
	
	getPositionAndRenderMap(googleMaps) {
		this.weatherService.getCurrentPosition()
			.then((position: Geoposition) => {
				const latitude: number = position.coords.latitude;
				const longitude: number = position.coords.longitude;

				this.renderMap(googleMaps, latitude, longitude);		
			});
	}

	renderMap(googleMaps, latitude: number, longitude: number) {
		new googleMaps.Map(this.el, {
			center: {lat: latitude, lng: longitude},
			scrollwheel: false,
			zoom: 8
		});
	}

	renderError() {
		this.el.innerHTML = `
			<div class="map__error alert danger">
				Whoops, something goes wrong with Google map...
			</div>
		`;	
	}
}

export default MapsComponent;