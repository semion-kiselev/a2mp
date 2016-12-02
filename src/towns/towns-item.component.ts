import { Component, Input } from '@angular/core';

@Component({
	selector: 'towns-item',
	template: `
		<li class="towns__list-item">
			<div class="row">
				<div class="towns__list-item-name-wrapper col">
					<div class="towns__list-item-name">{{ name }}</div>
				</div>
				<div class="towns__list-item-info-wrapper col pull-right">
					<div class="row">
						<div class="towns__list-item-icon col">
							<i class="weather-icon {{ icon }}"></i>
						</div>
						<div class="towns__list-item-temp col">
							{{ temp }}<sup class="towns__list-item-sup">°C</sup>
						</div>
						<div class="towns__list-item-description col">{{ description }}</div>
					</div>
				</div>
			</div>
		</li>
	`
})
export class TownsItemComponent {
	@Input() public name: string;
	@Input() public icon: string;
	@Input() public temp: string;
	@Input() public description: string;
};