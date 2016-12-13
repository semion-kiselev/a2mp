import './spinner.component.scss';
import { Component, Input } from '@angular/core';

@Component({
	selector: 'spinner',
	template: `
		<div [ngClass]="{'b-spinner': true, '__small': type === 'small'}">
			<div class="spinner__wBall __wBall_1">
				<div class="spinner__wInnerBall"></div>
			</div>
			<div class="spinner__wBall __wBall_2">
				<div class="spinner__wInnerBall"></div>
			</div>
			<div class="spinner__wBall __wBall_3">
				<div class="spinner__wInnerBall"></div>
			</div>
			<div class="spinner__wBall __wBall_4">
				<div class="spinner__wInnerBall"></div>
			</div>
			<div class="spinner__wBall __wBall_5">
				<div class="spinner__wInnerBall"></div>
			</div>
		</div>
	`
})
export class SpinnerComponent {
	@Input() private type: string;
};