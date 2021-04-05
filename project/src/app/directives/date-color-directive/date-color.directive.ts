import { Directive, HostBinding, Input, OnChanges } from '@angular/core';

import { CourseInterface } from '../../interfaces/course.interface';

@Directive({
	selector: '[appDateColor]'
})
export class DateColorDirective implements OnChanges{
	private currentDate: number = new Date().getTime();

	@Input() course: CourseInterface;

	@HostBinding('class') elementClass: string;

	ngOnChanges(): void {

		const creationDate = this.course.date.getTime();
		if (this.isUpcomingCourse(creationDate)) {
			this.elementClass = 'course-item_upcoming';
		} else if (this.isFreshCourse(creationDate)) {
			this.elementClass = 'course-item_fresh';
		}
	}

	isUpcomingCourse(creationDate: number): boolean {
		return creationDate >= this.currentDate;
	}

	isFreshCourse(creationDate: number): boolean {
		const dayNum = 86400000;
		const daysGap = 14;
		const creationDay: number = creationDate / dayNum;
		const currentDay: number = this.currentDate / dayNum;
		return (creationDay < currentDay) && (creationDay >= (currentDay - daysGap));
	}

}

