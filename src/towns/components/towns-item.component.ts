import './towns-item.component.scss';
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { TownWeather } from '../../shared/interfaces/TownWeather';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'towns-item',
	template: `
		<li class="b-towns-item" [dTempBg]="item.temp" (click)="onClickItem()">
			<div class="row">
				<div class="towns-item__name-wrapper col">
					<div class="towns-item__name">{{ item.name }}</div>
				</div>
				<div class="towns-item__info-wrapper col pull-right">
					<div class="row">
						<div class="towns-item__icon col">
							<weather-icon [icon]="item.icon"></weather-icon>
						</div>
						<div class="towns-item__temp col">
							{{ item.temp }}<sup class="towns-item__sup">°C</sup>
						</div>
						<div class="towns-item__wind col">
							<weather-wind
								[speed]="item.windSpeed" 
								[deg]="item.windDeg"
							></weather-wind>
						</div>
					</div>
				</div>
			</div>
			<i class="towns-item__delete-icon" (click)="onDestroyTown()"></i>
			<i 
				[ngClass]="{'towns-item__favorite-icon': true, '--active': item.favorite}" 
				(click)="onClickOnFavoriteIcon(); $event.stopPropagation()"
			></i>
		</li>
	`
})
export class TownsItemComponent {
	@Input() private item: TownWeather;
	@Output() private onToggleFavorite: EventEmitter<number> = new EventEmitter<number>();
	@Output() private onDeleteTown: EventEmitter<number> = new EventEmitter<number>();

	constructor(
		private router: Router
	) {}

	onClickItem() {
		this.router.navigate(['/towns', this.item.id]);
	}

	onClickOnFavoriteIcon() {
		this.onToggleFavorite.emit(this.item.id);
	}

	onDestroyTown() {
		this.onDeleteTown.emit(this.item.id);
	}
};