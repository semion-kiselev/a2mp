import './paginator.component.scss';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'paginator',
	template: `
		<div class="b-paginator">
			<div *ngFor="let index of pageIndexesAr"
				[ngClass]="{'paginator__item': true, '--selected': selected === index}"
				(click)="onClickPageNumber(index)"
			>{{ index + 1 }}</div>
		</div>
	`
})
export class PaginatorComponent {
	private selected: number = 0;
	@Input() private pageQty: number;
	@Output() private onPageChange = new EventEmitter<number>();

	get pageIndexesAr(): number[] {
		let ar: number[] = [];
		for (let i: number = 0; i < this.pageQty; i++) { ar.push(i); }
		return ar;
	}

	onClickPageNumber(pageIndex: number) {
		this.selected = pageIndex;
		this.onPageChange.emit(pageIndex);
	}
}