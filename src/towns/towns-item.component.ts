import './towns-item.component.scss';
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'towns-item',
	template: `
		<li class="b-towns-item">
			<div class="row">
				<div class="towns-item__name-wrapper col">
					<div class="towns-item__name">{{ name }}</div>
				</div>
				<div class="towns-item__info-wrapper col pull-right">
					<div class="row">
						<div class="towns-item__icon col">
							<i class="weather-icon {{ icon }}"></i>
						</div>
						<div class="towns-item__temp col">
							{{ temp }}<sup class="towns-item__sup">°C</sup>
						</div>
						<div class="towns-item__description col">{{ description }}</div>
					</div>
				</div>
			</div>
			<i class="towns-item__delete-icon" (click)="onDestroyTown()"></i>
			<i 
				[ngClass]="{'towns-item__favorite-icon': true, '--active': favorite}" 
				(click)="onClickOnFavoriteIcon()"
			></i>
		</li>
	`
})
export class TownsItemComponent {
	@Input() private id: number;
	@Input() private name: string;
	@Input() private icon: string;
	@Input() private temp: string;
	@Input() private description: string;
	@Input() private favorite: boolean;
	@Output() private onToggleFavorite = new EventEmitter<number>();
	@Output() private onDeleteTown = new EventEmitter<number>();

	onClickOnFavoriteIcon() {
		this.onToggleFavorite.emit(this.id);
	}

	onDestroyTown() {
		this.onDeleteTown.emit(this.id);
	}
};