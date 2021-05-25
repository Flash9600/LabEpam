import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CourseService } from 'src/app/services/course-service/course.service';
import { Course } from 'src/app/interfaces/course.interface';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-add-course-page',
	templateUrl: './add-course-page.component.html',
	styleUrls: ['./add-course-page.component.scss']
})
export class AddCoursePageComponent implements OnInit, OnDestroy{

	public newCourse: Course;
	public authors: string;
	public title: string;
	protected trackers: Subscription[] = [];

	constructor(
		protected router: Router,
		protected courseService: CourseService,
		protected activatedRoute: ActivatedRoute
		 ) {}

	ngOnInit(): void{
		const id = this.activatedRoute.snapshot.params.id;
		this.courseService.getIdTracker.next(id);
		const getCourseByIdSubscription = this.courseService.getCourseByIdTracker.subscribe((course) => {
			if (course) {
				this.newCourse = course;
				this.title = `Course ${course.title || 'New'}`;
			}
		});
		this.trackers.push(getCourseByIdSubscription);
	}

	checkNewCourse(): void{
		this.courseService.setNewCourseTracker.next(this.newCourse);
	}

	moveToCoursesPage(): void{
		this.courseService.moveToCoursesPageTarget.next();
	}

	ngOnDestroy(): void{
		this.trackers.forEach((subscriber) => subscriber.unsubscribe());
	}

}
