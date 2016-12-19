import './towns-item.component.scss';
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { TownWeather } from '../shared/interfaces/TownWeather';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'towns-item',
	template: `
		<li class="b-towns-item">
			<div class="row">
				<div class="towns-item__name-wrapper col">
					<div class="towns-item__name">{{ item.name }}</div>
				</div>
				<div class="towns-item__info-wrapper col pull-right">
					<div class="row">
						<div class="towns-item__icon col">
							<i class="weather-icon {{ item.icon }}"></i>
						</div>
						<div class="towns-item__temp col">
							{{ item.temp }}<sup class="towns-item__sup">°C</sup>
						</div>
						<div class="towns-item__description col">{{ item.description }}</div>
					</div>
				</div>
			</div>
			<i class="towns-item__delete-icon" (click)="onDestroyTown()"></i>
			<i 
				[ngClass]="{'towns-item__favorite-icon': true, '--active': item.favorite}" 
				(click)="onClickOnFavoriteIcon()"
			></i>
		</li>
	`
})
export class TownsItemComponent {
	@Input() private item: TownWeather;
	@Output() private onToggleFavorite: EventEmitter<number> = new EventEmitter<number>();
	@Output() private onDeleteTown: EventEmitter<number> = new EventEmitter<number>();

	onClickOnFavoriteIcon() {
		this.onToggleFavorite.emit(this.item.id);
	}

	onDestroyTown() {
		this.onDeleteTown.emit(this.item.id);
	}
};