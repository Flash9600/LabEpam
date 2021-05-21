import { Subscription } from 'rxjs';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { Component, OnInit, forwardRef, OnDestroy } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
	selector: 'app-date-input',
	templateUrl: './date-input.component.html',
	styleUrls: ['./date-input.component.scss'],
	providers: [{
		provide: NG_VALUE_ACCESSOR,
		useExisting: forwardRef(() => DateInputComponent),
		multi: true
	}]
})
export class DateInputComponent implements OnInit, ControlValueAccessor, OnDestroy{

	public dateForm: FormControl;
	protected subscription: Subscription;

	ngOnInit(): void{
		this.dateForm = new FormControl('', [Validators.required]);
		this.subscription = this.dateForm.valueChanges.subscribe((duration) => {
			this.onChange(duration);
			this.onTouched();
		});
	}

	get isValidation(): boolean{
		return this.dateForm.invalid && (this.dateForm.touched || this.dateForm.dirty);
	}

	onChange(date: number): void {}

	onTouched(): void {}

	writeValue(value: Date): void{
		const datePipe = new DatePipe('en-US');
		this.dateForm.setValue(datePipe.transform(value, 'yyyy-MM-dd'));
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
