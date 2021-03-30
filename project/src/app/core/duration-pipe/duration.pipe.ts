import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'duration'
})
export class DurationPipe implements PipeTransform {

	transform(value: number): string {
		if (value < 60) {
			return `${value}m`;
		} else  {
			const minute = value % 60;
			const hour = (value - minute) / 60;
			return value % 60 === 0 ? `${hour}h` : `${hour}h ${minute}m`;
		}
	}
}
