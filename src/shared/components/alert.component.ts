import './alert.component.scss';
import { Component, Input } from '@angular/core';

@Component({
	selector: 'alert',
	template: `
		<div [ngClass]="{'b-alert': true, '--danger': type === 'danger'}">
			{{ message }}
		</div>
	`
})
export class AlertComponent {
	@Input() private type: string;
	@Input() private message: string;
};