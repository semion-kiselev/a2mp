import './alert.component.scss';
import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'alert',
	template: `
		<div [ngClass]="{'b-alert': true, '--danger': type === 'danger', '--info': type === 'info'}">
			{{ message }}
		</div>
	`
})
export class AlertComponent {
	@Input() private type: string;
	@Input() private message: string;
};