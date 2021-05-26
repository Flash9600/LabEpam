import { AbstractControl } from '@angular/forms';

export const validateDurationNumber = () => {

	return (control: AbstractControl): {[key: string]: boolean} | null => {
		const minDuration = 5;
		const maxDuration = 200;
		if (control.value < minDuration){
				return {min: true, max: false};
		} else if (control.value >= maxDuration) {
				return {max: true, min: false};
		}
		return null;
	};
};
