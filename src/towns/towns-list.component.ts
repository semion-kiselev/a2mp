import './towns-list.component.scss';
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { TownWeather } from '../shared/interfaces/TownWeather';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'towns-list',
	template: `
		<ul class="b-towns-list">
			<towns-item
				*ngFor="let item of data"
				[item]="item"
				(onToggleFavorite)="onToggleFavoriteFromItem($event)"
				(onDeleteTown)="onDeleteTownFromItem($event)"
			></towns-item>
		</ul>
	`
})
export class TownsListComponent {
	@Input() private data: TownWeather[];
	@Output() private onToggleFavorite: EventEmitter<number> = new EventEmitter<number>();
	@Output() private onDeleteTown: EventEmitter<number> = new EventEmitter<number>();

	onToggleFavoriteFromItem(townId: number) {
		this.onToggleFavorite.emit(townId);
	}	

	onDeleteTownFromItem(townId: number) {
		this.onDeleteTown.emit(townId);
	}
}