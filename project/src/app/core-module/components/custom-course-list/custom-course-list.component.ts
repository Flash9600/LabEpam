import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from 'src/app/interfaces/course.interface';

import { CourseService } from 'src/app/services/course-service/course.service';

@Component({
	selector: 'app-custom-course-list',
	templateUrl: './custom-course-list.component.html',
	styleUrls: ['./custom-course-list.component.scss'],
})
export class CustomCourseListComponent implements OnInit{

	constructor(public courseService: CourseService) { }

	public courses: Observable<Course[]>;

	ngOnInit(): void{
		this.courses = this.courseService.getCoursesList();
	}

	onCoursesList(id: number): void {
		this.courseService.deleteCourse(id);
	}

}
