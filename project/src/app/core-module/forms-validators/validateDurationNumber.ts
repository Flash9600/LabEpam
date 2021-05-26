import { AbstractControl } from '@angular/forms';

export const validateDurationNumber = () => {

		return (control: AbstractControl): {[key: string]: boolean} | null => {
				if (control.value < 5){
						return {min: true, max: false};
				} else if (control.value >= 200) {
						return {max: true, min: false};
				}
				return null;
		};
};
