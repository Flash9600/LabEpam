import { CourseService } from 'src/app/services/course-service/course.service';
import {Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ICourse } from 'src/app/interfaces/course.interface';

@Component({
	selector: 'app-add-course-page',
	templateUrl: './add-course-page.component.html',
	styleUrls: ['./add-course-page.component.scss']
})
export class AddCoursePageComponent implements OnInit{

	public newCourse: ICourse;
	public authors: string;
	public id: string | undefined;

	constructor(
		protected activatedRoute: ActivatedRoute,
		protected router: Router,
		protected courseService: CourseService
		 ) {}

	ngOnInit(): void{
		this.id = this.activatedRoute.snapshot.params.id;
		this.newCourse = this.courseService.getNewCourse(this.id);
	}

	checkNewCourse(): void{
		this.courseService.updateCourse(this.newCourse);
		this.router.navigateByUrl('/courses');
	}

	hideAddCoursePage(): void{
		this.router.navigateByUrl('/courses');
	}
}
