import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
	selector: '[dWindDeg]'
})
export class WindDegDirective implements OnInit {
	@Input() dWindDeg: number;

	constructor(private el: ElementRef) {}

	ngOnInit() {
		this.el.nativeElement.style.transform = `rotate(${this.dWindDeg}deg)`;
	}
}