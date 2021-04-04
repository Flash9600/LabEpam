import { CourseService } from './../../service/course.service';
import {  Component, Input } from '@angular/core';
import { CourseInterface } from '../../interfaces/course.interface';


@Component({
	selector: 'app-course-list',
	templateUrl: './course-list.component.html',
	styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent {

	public courses: CourseInterface[];
	constructor( public courseService: CourseService) {}

	@Input() public sortWay: string;

	deleteCourse(id: number): void {
		this.courseService.deleteCourse(id);
	}

}
