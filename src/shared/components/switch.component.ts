import './switch.component.scss';

import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
	selector: 'switch',
	template: `
		<div 
			[ngClass]="{'b-switch': true, '--checked': active}" 
			(click)="onSwitch()"
			(keyup.space)="onSwitch()"
			(keydown.space)="$event.preventDefault()"
			tabindex="{{formtabindex}}"
		></div>
	`,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => SwitchComponent),
			multi: true
		}
	]
})
export class SwitchComponent implements ControlValueAccessor {
	@Input() active: boolean = false;
	@Input() formtabindex: string;
	propagateChange = (_: boolean) => {};

	writeValue(value: boolean) {
		if (value === true || value === false) {
			this.active = value;	
		}
		this.propagateChange(this.active);
	}

	onSwitch() {
		this.active = !this.active;
		this.propagateChange(this.active);
	}

	registerOnChange(fn: (_: boolean) => {}) {
		this.propagateChange = fn;
	}

	registerOnTouched() {}

	setDisableState() {}
}