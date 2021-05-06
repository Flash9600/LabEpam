import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';

import { Course } from 'src/app/interfaces/course.interface';



@Component({
	selector: 'app-course-list',
	templateUrl: './course-list.component.html',
	styleUrls: ['./course-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseListComponent {

	@Input() public coursesList: Course[];

	@Output() coursesListEvent =  new EventEmitter<number>();

	onCourseItem(id: number): void {
		this.coursesListEvent.emit(id);
	}

	get coursesLength(): number | boolean{
		if (this.coursesList) {
			return this.coursesList.length;
		} else {
			return false;
		}
	}
}
