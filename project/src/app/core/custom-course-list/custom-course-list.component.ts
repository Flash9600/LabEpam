import { ICourse } from './../../interfaces/course.interface';
import { Component, Input } from '@angular/core';
import { CourseService } from 'src/app/service/course-service/course.service';

@Component({
	selector: 'app-custom-course-list',
	templateUrl: './custom-course-list.component.html',
	styleUrls: ['./custom-course-list.component.scss']
})
export class CustomCourseListComponent {

	constructor(public courseService: CourseService) { }

	@Input() public sortWay: string;
	 public courses: ICourse[];

	onCourseList(id: number): void {
		this.courseService.deleteCourse(id);
	}

	get courseList(): ICourse[] {
		return this.courseService.getCourseList(this.sortWay);
	}

}
