import { HttpService } from './../http-service/http.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { StateService } from '../state-service/state.service';
import { Course } from 'src/app/interfaces/course.interface';
import { OrderByPipe } from 'src/app/pipes/orderBy-pipe/order-by.pipe';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class CourseService {

	constructor(
		protected orderBy: OrderByPipe,
		protected stateService: StateService,
		protected router: Router,
		protected network: HttpService
		) {}

	protected breadcrumbsTitle: string;

	protected courseLength: number;

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

	public getCoursesList(): Observable<Course[]> {
		const sortWay = this.stateService.sortWay;
		return this.network.getCourses(1).pipe(
			map((courses) => {
				const newCourses = courses.map((course: Course) => new Course(course));
				this.courseLength = newCourses.length;
				return this.orderBy.transform<Course>(newCourses, sortWay);
			})
		);
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

	public deleteCourse(id: number): void {
		this.courses = this.courses.filter(item => item.id !== id);
	}

	public updateCourse(newCourse: Course): void {
		this.deleteCourse(newCourse.id);
		this.courses.push(newCourse);
	}
}

