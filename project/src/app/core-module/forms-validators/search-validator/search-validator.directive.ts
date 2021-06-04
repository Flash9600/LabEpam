import { Directive } from '@angular/core';
import { AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';

@Directive({
	selector: '[appSearchValidator]',
	providers: [{
		provide: NG_ASYNC_VALIDATORS,
		useExisting: SearchValidatorDirective,
		multi: true
	}]
})
export class SearchValidatorDirective implements AsyncValidator{

	validate(control: AbstractControl): Observable<ValidationErrors | null> {
		const searchValue = control.value;
		let streamValue: ValidationErrors | null;
		if (this.isValidateValue(searchValue)) {
			streamValue = null;
		} else {
			streamValue = {invalidValue: true};
		}
		return of(streamValue);
	}

	isValidateValue(value: string): boolean{
		if (!value) {
			return true;
		}
	 const length = value.length;
	 const minLength = 2;
	 const maxLength = 20;
	 return !!(length >= minLength && length <= maxLength && value.match(/[a-zA-Z0-9 \-]*/));
	}

}
