import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/interfaces/course.interface';

import { CourseService } from 'src/app/services/course-service/course.service';

@Component({
	selector: 'app-custom-course-list',
	templateUrl: './custom-course-list.component.html',
	styleUrls: ['./custom-course-list.component.scss'],
})
export class CustomCourseListComponent implements OnInit{

	constructor(public courseService: CourseService) { }

	public courses: Course[];

	ngOnInit(): void{
		this.courseService.getCoursesList().subscribe((courses) => {
			this.courses = courses;
		});
	}

	onCoursesList(id: number): void {
		this.courseService.courseForDeletionTracker.next(id);
	}

}
