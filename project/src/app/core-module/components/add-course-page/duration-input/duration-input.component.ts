import { Subscription } from 'rxjs';
import { Component, forwardRef, OnDestroy, OnInit  } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

import { validateDurationNumber } from 'src/app/core-module/forms-validators/duration-number-validator/validateDurationNumber';

@Component({
	selector: 'app-duration-input',
	templateUrl: './duration-input.component.html',
	styleUrls: ['./duration-input.component.scss'],
	providers: [{
		provide: NG_VALUE_ACCESSOR,
		useExisting: forwardRef(() => DurationInputComponent),
		multi: true
	}]
})
export class DurationInputComponent implements OnInit, OnDestroy, ControlValueAccessor{

	public durationForm: FormControl;
	public warningText: string;
	protected warningMax = 'Max duration must be less than 200 minutes';
	protected warningMin = 'Min duration must be greater than 4 minutes';
	protected subscription: Subscription;

	ngOnInit(): void{
		this.durationForm = new FormControl('', [validateDurationNumber()]);
		this.subscription = this.durationForm.valueChanges.subscribe((duration) => {
			this.onChange(duration);
			this.onTouched();
		});

	}

	get isValidation(): boolean{
		if (this.durationForm.invalid) {
			this.warningText = this.durationForm.errors.max ? this.warningMax : this.warningMin;
			return this.durationForm.touched || this.durationForm.dirty;
		}
		return false;
	}

	onChange(duration: number): void {}

	onTouched(): void {}

	writeValue(value: number): void{
		this.durationForm.setValue(value);
	}

	registerOnChange(fn: () => void): void{
		this.onChange = fn;
	}

	registerOnTouched(fn: () => void): void{
		this.onTouched = fn;
	}

	ngOnDestroy(): void{
		this.subscription.unsubscribe();
	}
}
