import { doSubmitNewCourseAction } from './../../store/actions/newCourse.actions';
import { Store } from '@ngrx/store';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { CourseService } from 'src/app/services/course-service/course.service';
import { Course } from 'src/app/interfaces/course.interface';
import { routerSelector } from '../../store/selectors/router.selector';
import { newCourseSelector } from '../../store/selectors/newCourse.selector';

@Component({
	selector: 'app-add-course-page',
	templateUrl: './add-course-page.component.html',
	styleUrls: ['./add-course-page.component.scss']
})
export class AddCoursePageComponent implements OnInit, OnDestroy{

	public newCourse: Course;
	public authorsList: string[];
	public title: string;
	public courseParamsControl: FormGroup;
	protected subscriptionsList: Subscription[] = [];

	constructor(
		protected router: Router,
		protected courseService: CourseService,
		protected activatedRoute: ActivatedRoute,
		protected formBuilder: FormBuilder,
		protected store: Store
		 ) {}

	ngOnInit(): void{
		const getCourseByIdSubscription = this.store.select(newCourseSelector).subscribe((course) => {
			if (course) {
				this.newCourse = course;
				this.title = `Course ${course.title || 'New'}`;
				this.setCourse();
			}
		});
		const authorsSubscription = this.courseService.getAuthorListTracker.subscribe((authorsList) => this.authorsList = authorsList);
		this.subscriptionsList.push( getCourseByIdSubscription, authorsSubscription);
	}

	setCourse(): void {
		this.courseParamsControl = this.formBuilder.group({
			title: [this.newCourse.title, [...this.getValidatorsArray(50), Validators.pattern('[a-zA-Z0-9 \-]*')]],
			description: [this.newCourse.description, this.getValidatorsArray(500)],
			date: [this.newCourse.date],
			duration: [this.newCourse.duration, [Validators.required, Validators.min(5), Validators.max(200)]],
			authors: [this.newCourse.authors.join('/')]
		});
	}

	getValidatorsArray(maxLength: number): Validators[]{
		return [Validators.required, Validators.minLength(4), Validators.maxLength(maxLength)];
	}

	isValidateValue(controlName: string): boolean {
		const control = (this.courseParamsControl.controls[controlName] as FormControl);

		return control.invalid && (control.dirty || control.touched);
	}

	submitNewCourse(): void{
		const newCourse = new Course({
			...this.courseParamsControl.value,
			id: this.newCourse.id,
			isTopRated: this.newCourse.isTopRated
		});
		this.store.dispatch(doSubmitNewCourseAction({newCourse}));
	}

	moveToCoursesPage(): void{
		this.courseService.moveToCoursesPageTarget.next();
	}

	ngOnDestroy(): void{
		this.subscriptionsList.forEach((subscriber) => subscriber.unsubscribe());
	}

}
