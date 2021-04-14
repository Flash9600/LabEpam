import { Injectable } from '@angular/core';

import { ICourse } from 'src/app/interfaces/course.interface';
import { OrderByPipe } from 'src/app/pipes/orderBy-pipe/order-by.pipe';

@Injectable()
export class CourseService {

	constructor(protected orderBy: OrderByPipe) {}

	protected courses: ICourse[] = [
		{
			id: 1,
			title: 'intro',
			duration: 25,
			date: new Date(2021, 2, 20),
			description: 'about course',
			topRated: true
		}, {
			id: 3,
			title: 'directives',
			duration: 80,
			date: new Date(2021, 3, 27),
			description: 'about course',
			topRated: true
		}, {
			id: 2,
			title: 'component',
			duration: 65,
			date: new Date(2021, 2, 22),
			description: 'about course',
			topRated: false
		}, {
			id: 4,
			title: 'service',
			duration: 235,
			date: new Date(2021, 1, 15),
			description: 'about course',
			topRated: false
		}
	];

	public getCourseList(way: string = 'date'): ICourse[] {
		const newCourses = this.orderBy.transform<ICourse>(this.courses, way);
		return [...newCourses];
	}

	public createCourse(): void {
		const newCourse: ICourse = {
			id: this.courses.length++,
			title: 'new course',
			duration: Math.floor(Math.random() * 300),
			date: new Date(),
			description: 'about course',
			topRated: false
		};

		this.courses.push(newCourse);
	}


	public getItemById(id: number): ICourse {
		return this.courses.find((course) => {
			return course.id === id;
		});
	}

	public deleteCourse(id: number): void {
		this.courses = this.courses.filter(item => item.id !== id);
	}

	public updateCourse(newCourse: ICourse): void {
		this.deleteCourse(newCourse.id);
		this.courses.push(newCourse);
	}
}

