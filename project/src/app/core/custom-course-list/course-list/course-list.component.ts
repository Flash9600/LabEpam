import {  ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { ICourse } from '../../../interfaces/course.interface';


@Component({
	selector: 'app-course-list',
	templateUrl: './course-list.component.html',
	styleUrls: ['./course-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseListComponent {


	@Input() public courseList: ICourse[];

	@Output() courseListEvent =  new EventEmitter<number>();

	onCourseItem(id: number): void {
		this.courseListEvent.emit(id);
	}
}
