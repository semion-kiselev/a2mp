import { Injectable } from '@angular/core';

import { Geoposition } from '../../shared/interfaces/Geoposition';

@Injectable()
export class GeoPositionService {
	getPosition(): Promise<Geoposition> {
		return new Promise((resolve, reject) => {
			navigator.geolocation.getCurrentPosition(resolve, reject);
		});
	}
};