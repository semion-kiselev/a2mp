import { Injectable } from '@angular/core';

import { GoogleMaps } from '../../shared/interfaces/GoogleMaps';
import LoadGoogleMapsApiOptions from '../../shared/interfaces/LoadGoogleMapsApiOptions';

Injectable()
export class GoogleMapsService {
	private apiKey: string = 'AIzaSyDUXoXKPqU4Dx1GulPcmbVwfOXYDK7UsBQ';
	private url: string = 'https://maps.googleapis.com/maps/api/js?';
	private callbackName: string = '__googleMapsApiOnLoadCallback';

	public load(options: LoadGoogleMapsApiOptions = {}): Promise<GoogleMaps> {
		return new Promise((resolve, reject) => {
			const serializedOptions: string = this.serialiseOptions(options);
			this.createScriptTag(this.url, serializedOptions);

			window[this.callbackName] = () => {
      			resolve(window['google'].maps);
      			delete window[this.callbackName];
    }		;
		}); 
	}

	private createScriptTag(url: string, options: string): void {
		const scriptElement = document.createElement('script');
		scriptElement.src = `${url}${options}`;
		document.body.appendChild(scriptElement);
	}

	private serialiseOptions({ client, language }: LoadGoogleMapsApiOptions): string {
		const params: string[] = [
			`key=${this.apiKey}`, 
			`callback=${this.callbackName}`
		];

		if (client) params.push(`client=${client}`);
    	if (language) params.push(`language=${language}`);

    	return params.join('&');
	}
}