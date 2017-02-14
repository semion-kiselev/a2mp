import './add-town.component.scss';
import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AddTownFormData } from '../../shared/interfaces/AddTownFormData';

@Component({
	selector: 'add-town',
	template: `
		<div class="b-add-town">
			<div class="add-town__title">Add Town For Weather Observe</div>
			<form 
				#addTownForm="ngForm"
				(submit)="onSubmitTown(addTownForm.value); $event.preventDefault();" 
			>
				<div class="add-town__input-wrapper">
					<input
						autofocus
						tabindex="1" 
						name="townName"
						class="add-town__input" 
						type="text" 
						#townName="ngModel"
						ngModel
						required
						minlength="2"
						validateTownName
					/>
					<form-errors *ngIf="townName.dirty && !townName.valid" [errors]="formFieldsErrors['townName']">
					</form-errors>
				</div>

				<div class="add-town__input-wrapper">
					<label class="add-town__label" for="markTownAsFavorite">Mark as favorite</label>
					<switch 
						name="markTownAsFavorite" 
						ngModel
						formtabindex="2"
					></switch>
				</div>

				<div class="row">
					<div class="col">
						<button 
							class="add-town__button" 
							type="submit"
							[disabled]="!addTownForm.form.valid"
						>
							Get Weather
						</button>
					</div>
					<div *ngIf="isLoadingTownWeather" class="add-town__spinner col">
						<spinner type="small"></spinner>
					</div>
					<div *ngIf="getTownWeatherError" class="add-town__error col">
						{{ getTownWeatherError }}
					</div>
					<div *ngIf="duplicateTownWeatherError" class="add-town__error col">
						{{ duplicateTownWeatherError }}
					</div>
				</div>
			</form>
		</div>
	`
})
export class AddTownComponent {
	@ViewChild('addTownForm') addTownForm: NgForm;

	@Input() public getTownWeatherError: string;
	@Input() public duplicateTownWeatherError: string;
	@Input() public isLoadingTownWeather: boolean;
	@Output() public onAddTown: EventEmitter<AddTownFormData> = new EventEmitter<AddTownFormData>();

	ngAfterViewChecked() {
		this.addTownForm.valueChanges.subscribe(() => this.onFormValueChanged());
	}

	onFormValueChanged() {
		if (!this.addTownForm) return;

		const form = this.addTownForm.form;
		for (let field in this.formFieldsErrors) {
			this.formFieldsErrors[field] = {};
			const control = form.get(field);

			if (control && control.dirty && !control.valid) {
				this.formFieldsErrors[field] = control.errors;
			}
		}
	}

	onSubmitTown(townData: AddTownFormData): void {
		this.addTownForm.reset();

		const markTownAsFavoriteControl = this.addTownForm.form.get('markTownAsFavorite');
		if (markTownAsFavoriteControl) {
			markTownAsFavoriteControl.setValue(false);
		}
		
		this.onAddTown.emit(townData);
	}

	formFieldsErrors = {
		townName: {}
	}
}