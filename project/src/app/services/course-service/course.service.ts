import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { StateService } from './../state/state.service';
import { Course } from 'src/app/interfaces/course.interface';
import { OrderByPipe } from 'src/app/pipes/orderBy-pipe/order-by.pipe';

@Injectable()
export class CourseService {

	constructor(
		protected orderBy: OrderByPipe,
		protected stateService: StateService,
		protected router: Router
		) {}

	protected breadcrumbsTitle: string;

	protected courses: Course[] = [
		new Course({
			id: 1,
			title: 'intro',
			duration: 25,
			date: new Date(2021, 2, 20),
			description: 'about course',
			isTopRated: true
		}), new Course({
			id: 2,
			title: 'directives',
			duration: 80,
			date: new Date(2021, 3, 27),
			description: 'about course',
			isTopRated: true
		}), new Course({
			id: 3,
			title: 'component',
			duration: 65,
			date: new Date(2021, 2, 22),
			description: 'about course',
			isTopRated: false
		}), new Course({
			id: 4,
			title: 'service',
			duration: 235,
			date: new Date(2021, 1, 15),
			description: 'about course',
			isTopRated: false
		}), new Course({
			id: 5,
			title: 'service',
			duration: 235,
			date: new Date(2021, 1, 15),
			description: 'about course',
			isTopRated: false
		}), new Course({
			id: 6,
			title: 'service',
			duration: 235,
			date: new Date(2021, 1, 15),
			description: 'about course',
			isTopRated: false
		}), new Course({
			id: 7,
			title: 'service',
			duration: 235,
			date: new Date(2021, 1, 15),
			description: 'about course',
			isTopRated: false
		}),
	];

	public getCourseList(): Course[] {
		const sortWay = this.stateService.sortWay;
		const newCourses = this.orderBy.transform<Course>(this.courses, sortWay);
		return [...newCourses];
	}

	public get breadcrumbs(): string {
		return this.breadcrumbsTitle;
	}

	public getNewCourse(id: string | undefined): Course{
		let newCourse: Course;
		const numbId = +id;
		if (!isNaN(numbId) && numbId <= this.courses.length) {

			newCourse = {...this.getItemById(numbId)};

		} else {

			newCourse = new Course({
				id: this.courses.length + 1,
				title: '',
				date: new Date(),
				duration: 0,
				description: '',
				isTopRated: false,
			});

			if (id !== undefined) {
				this.router.navigate(['/courses']);
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

