import {  Component, Input } from '@angular/core';

import { CourseService } from 'src/app/service/course-service/course.service';
import { ICourse } from '../../interfaces/course.interface';


@Component({
	selector: 'app-course-list',
	templateUrl: './course-list.component.html',
	styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent {

	public courses: ICourse[];
	constructor( public courseService: CourseService) {}

	@Input() public sortWay: string;

	deleteCourse(id: number): void {
		this.courseService.deleteCourse(id);
	}

	get courseList(): ICourse[] {
		return this.courseService.getCourseList(this.sortWay);
	}
}
