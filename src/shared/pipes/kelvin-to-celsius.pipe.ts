import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'kelvinToCelcius'
})
export class KelvinToCelciusPipe implements PipeTransform {
	transform(kelvin: string): string {
		return Math.round(parseFloat(kelvin) - 273.15) + '';
	}
}