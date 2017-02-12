import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
	selector: '[dTempBg]'
})
export class TempBgDirective implements OnInit {
	@Input() dTempBg: number;

	constructor(private el: ElementRef) {}

	ngOnInit() {
		let color = 'transparent';

		if (this.dTempBg < -10) {
			color = 'rgba(118,88,248,.05)';
		} else if (this.dTempBg >= -10 && this.dTempBg < 10) {
			color = 'rgba(0,192,228,.05)';
		} else if (this.dTempBg >= 10 && this.dTempBg < 25) {
			color = 'rgba(91,217,153,.05)';
		} else {
			color = 'rgba(234,193,77,.05)';
		}

		this.el.nativeElement.style.backgroundColor = color;
	}
}