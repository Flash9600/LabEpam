import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'duration'
})
export class DurationPipe implements PipeTransform {

	transform(value: number): string {
		const minuteInOneHour = 60;
		if (value < minuteInOneHour) {
			return `${value}m`;
		} else  {
			const minutes = value % minuteInOneHour;
			const hours = (value - minutes) / minuteInOneHour;
			return minutes === 0 ? `${hours}h` : `${hours}h ${minutes}m`;
		}
	}
}
