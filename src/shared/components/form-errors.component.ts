import './form-errors.component.scss';
import { Component, Input, OnInit, OnChanges } from '@angular/core';

interface FormErrors {
	required?: true | null;
	minlength?: {
		actualLength: number;
		requiredLength: number;
	};
	invalidTownName?: true | null;
}

@Component({
	selector: 'form-errors',
	template: `
		<ul class="b-form-errors">
			<li *ngFor="let errorMessage of errorMessages" class="form-errors__item">{{ errorMessage }}</li>
		</ul>
	`
})	
export class FormErrorsComponent implements OnInit, OnChanges {
	@Input() private errors: FormErrors;
	private errorMessages: string[];

	ngOnInit() {
		this.errorMessages = this.parseErrors(this.errors);
	}

	ngOnChanges() {
		this.errorMessages = this.parseErrors(this.errors);	
	}

	parseErrors(errors: FormErrors): string[] {
		let errorMessagesAr: string[] = [];

		for (let error in errors) {
			const errorTemplate = this.errorsMap[error];
			if (!errorTemplate) {
				console.warn(`There is no parse template for ${error} error type`);
				return;
			}

			let message = '';

			if (error === 'minlength') {
				const actualLength = errors[error]['actualLength'];
				const requiredLength = errors[error]['requiredLength'];

				message = errorTemplate
					.replace(/\{\{actualLength\}\}/, actualLength)
					.replace(/\{\{requiredLength\}\}/, requiredLength);
			} else {
				message = errorTemplate;
			}

			errorMessagesAr.push(message);
		}

		return errorMessagesAr;
	}

	errorsMap = {
		required: 'This field is required',
		minlength: 'The actual length of the field is {{actualLength}}, but required is {{requiredLength}}',
		invalidTownName: 'The town name you entered is not correct'
	}
}