import { Component, Input } from '@angular/core';
import { ICourse } from 'src/app/interfaces/course.interface';

import { CourseService } from 'src/app/services/course-service/course.service';
import { StateService } from 'src/app/services/state/state.service';

@Component({
	selector: 'app-custom-course-list',
	templateUrl: './custom-course-list.component.html',
	styleUrls: ['./custom-course-list.component.scss']
})
export class CustomCourseListComponent {

	constructor(public courseService: CourseService, protected stateService: StateService) { }

	@Input() public sortWay: string;
	 public courses: ICourse[];

	onCourseList(id: number): void {
		this.courseService.deleteCourse(id);
	}

	get courseList(): ICourse[] {
		return this.courseService.getCourseList(this.sortWay);
	}
}
