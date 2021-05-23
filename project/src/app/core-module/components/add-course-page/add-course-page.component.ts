import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { CourseService } from 'src/app/services/course-service/course.service';
import { Course } from 'src/app/interfaces/course.interface';

@Component({
	selector: 'app-add-course-page',
	templateUrl: './add-course-page.component.html',
	styleUrls: ['./add-course-page.component.scss']
})
export class AddCoursePageComponent implements OnInit, OnDestroy{

	public newCourse: Course;
	public authors: string;
	public title: string;
	public courseParamsControl: FormGroup;
	protected trackers: Subscription[] = [];

	constructor(
		protected router: Router,
		protected courseService: CourseService,
		protected activatedRoute: ActivatedRoute,
		protected formBuilder: FormBuilder
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
		this.courseParamsControl = this.formBuilder.group({
			title: [this.newCourse.title, [...this.getValidatorsArray(50), Validators.pattern('[a-zA-Z0-9 \-]*')]],
			description: [this.newCourse.description, this.getValidatorsArray(500)],
			date: [this.newCourse.date],
			duration: [this.newCourse.duration, [Validators.required, Validators.min(5), Validators.max(200)]],
			// TODO add authors
		});
	}

	isValidateValue(controlName: string): boolean {
		const control = (this.courseParamsControl.controls[controlName] as FormControl);

		return control.invalid && (control.dirty || control.touched);
	}

	getValidatorsArray(maxLength: number): Validators[]{
		return [Validators.required, Validators.minLength(4), Validators.maxLength(maxLength)];
	}

	submitNewCourse(): void{
		const newCourse = new Course({
			id: this.newCourse.id,
			isTopRated: this.newCourse.isTopRated,
			title: this.courseParamsControl.value.title,
			date: this.courseParamsControl.value.date,
			duration: this.courseParamsControl.value.duration,
			description: this.courseParamsControl.value.description,
			authors: this.newCourse.authors
		});
		this.courseService.setNewCourseTracker.next(newCourse);
	}

	moveToCoursesPage(): void{
		this.courseService.moveToCoursesPageTarget.next();
	}

	ngOnDestroy(): void{
		this.trackers.forEach((subscriber) => subscriber.unsubscribe());
	}

}
