import { HttpService } from './../http-service/http.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { StateService } from '../state-service/state.service';
import { Course } from 'src/app/interfaces/course.interface';
import { OrderByPipe } from 'src/app/pipes/orderBy-pipe/order-by.pipe';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable()
export class CourseService {

	protected breadcrumbsTitle: string;

	protected courseLength: number;

	public courseForDeletionTracker: Subject<number>;

	public coursesListTracker: Subject<Course[]>;

	constructor(
		protected orderBy: OrderByPipe,
		protected stateService: StateService,
		protected router: Router,
		protected network: HttpService
		) {
		this.courseForDeletionTracker = new Subject<number>();
		this.courseForDeletionTracker.subscribe((id) => this.deleteCourse(id));
		this.coursesListTracker = new Subject<Course[]>();
	}


	protected courses: Course[] = [
		new Course({
			id: 1,
			title: 'intro',
			duration: 25,
			date: new Date(2021, 2, 20),
			description: 'about course',
			isTopRated: true
		})
	];

	protected createSortedCoursesList(courses: Course[]): Course[] {
		const sortWay = this.stateService.sortWay;
		const newCourses = courses.map((course: Course) => new Course(course));
		this.courseLength = newCourses.length;
		return this.orderBy.transform<Course>(newCourses, sortWay);
	}

	public getCoursesList(pageNumber: number = 1): Subject<Course[]> {
		this.network.getCourses(pageNumber).pipe(
			map((courses) => this.createSortedCoursesList(courses))
		).subscribe((coursesList) => {
			this.coursesListTracker.next(coursesList);
		});
		return this.coursesListTracker;
	}

	public get breadcrumbs(): string {
		return this.breadcrumbsTitle;
	}

	public getNewCourse(id: string | undefined): Course{
		let newCourse: Course;
		const numbId = +id;
		if (!isNaN(numbId) && numbId <= this.courseLength) {

			newCourse = {...this.getItemById(numbId)};

		} else {

			newCourse = new Course({
				id: this.courseLength + 1,
				title: '',
				date: new Date(),
				duration: 0,
				description: '',
				isTopRated: false,
			});

			if (id !== undefined) {
				this.router.navigate(['error']);
			}
		}
		this.breadcrumbsTitle = newCourse.title;
		return newCourse;
	}

	public getItemById(id: number): Course {
		return this.courses.find((course) => {
			return course.id === id;
		});
	}

	protected deleteCourse(id: number): void {
		this.network.deleteCourse(id).subscribe(() => {
			this.getCoursesList();
		});
	}

	public updateCourse(newCourse: Course): void {
		this.deleteCourse(newCourse.id);
		this.courses.push(newCourse);
	}
}

