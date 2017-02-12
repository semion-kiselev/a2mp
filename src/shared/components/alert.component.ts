import './alert.component.scss';
import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'alert',
	template: `
		<div [ngClass]="rootClasses">
			{{ message }}
		</div>
	`
})
export class AlertComponent {
	@Input() private type: string;
	@Input() private message: string;

	get rootClasses() {
		return {
			'b-alert': true, 
			'--danger': this.type === 'danger', 
			'--info': this.type === 'info', 
			'--warn': this.type === 'warn'
		}
	}
};