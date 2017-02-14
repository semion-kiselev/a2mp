import { Component, Input } from '@angular/core';

@Component({
	selector: 'weather-wind',
	template: `
		<div>
			<span class="towns-item__wind-speed">{{ speed }}<sup class="towns-item__sup">m/s</sup></span>
			<span class="towns-item__wind-deg">
				<span class="towns-item__wind-deg-arrow" [dWindDeg]="deg"></span>
			</span>
		</div>
	`
})
export class WeatherWindComponent {
	@Input() public speed: number;
	@Input() public deg: number;
}