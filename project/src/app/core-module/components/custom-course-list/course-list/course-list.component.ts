import {  ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { Course } from 'src/app/interfaces/course.interface';



@Component({
	selector: 'app-course-list',
	templateUrl: './course-list.component.html',
	styleUrls: ['./course-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseListComponent{

	@Input() public courseList: Course[];

	@Output() courseListEvent =  new EventEmitter<number>();

	onCourseItem(id: number): void {
		this.courseListEvent.emit(id);
	}

}
