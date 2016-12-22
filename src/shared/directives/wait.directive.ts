import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
	selector: '[dWait]'
})
export class WaitDirective {
	constructor(
		private templateRef: TemplateRef<string>,
		private viewContainerRef: ViewContainerRef
	) {}

	@Input() set dWait(time: number) {
		setTimeout(() => {
			this.viewContainerRef.createEmbeddedView(this.templateRef)
		}, time);
	}
}