import './paginator.component.scss';
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'paginator',
	template: `
		<div class="b-paginator">
			<div *ngFor="let index of pageIndexesAr"
				[ngClass]="{'paginator__item': true, '--selected': currentPageIndex === index}"
				(click)="onClickPageNumber(index)"
			>{{ index + 1 }}</div>
		</div>
	`
})
export class PaginatorComponent {
	@Input() private pageQty: number;
	@Input() private currentPageIndex: number;
	@Output() private onPageChange: EventEmitter<number> = new EventEmitter<number>();

	get pageIndexesAr(): number[] {
		let ar: number[] = [];
		for (let i: number = 0; i < this.pageQty; i++) { ar.push(i); }
		return ar;
	}

	onClickPageNumber(pageIndex: number) {
		this.onPageChange.emit(pageIndex);
	}
}