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
			const minute = value % minuteInOneHour;
			const hour = (value - minute) / minuteInOneHour;
			return value % minuteInOneHour === 0 ? `${hour}h` : `${hour}h ${minute}m`;
		}
	}
}
