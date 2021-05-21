import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CourseService } from 'src/app/services/course-service/course.service';
import { Course } from 'src/app/interfaces/course.interface';
import { Subscription } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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
			title: [this.newCourse.title, this.getValidatorsArray(50)],
			description: [this.newCourse.description, this.getValidatorsArray(500)],
			date: [this.newCourse.date],
			duration: [this.newCourse.duration],
			authors: this.formBuilder.array([
				'Ivan',
				'Perry',
				'Victor'
			])
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
		this.courseService.setNewCourseTracker.next(this.newCourse);
	}

	moveToCoursesPage(): void{
		this.courseService.moveToCoursesPageTarget.next();
	}

	ngOnDestroy(): void{
		this.trackers.forEach((subscriber) => subscriber.unsubscribe());
	}

}
