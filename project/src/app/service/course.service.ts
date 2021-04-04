import { Injectable } from '@angular/core';
import { CourseInterface } from '../interfaces/course.interface';
import { OrderByPipe } from '../pipes/orderBy-pipe/order-by.pipe';

@Injectable()
export class CourseService {

	constructor(private orderBy: OrderByPipe) { }

	private courses: CourseInterface[] = [
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

	get corseLength(): number {
		return this.courses.length;
	}

	getCourseList(way: string = 'date'): CourseInterface[] {
		return this.orderBy.transform<CourseInterface>(this.courses, way);
	}

	createCourse(): void {
		const newCourse: CourseInterface = {
			id: this.courses.length++,
			title: 'new course',
			duration: Math.floor(Math.random() * 300),
			date: new Date(),
			description: 'about course',
			topRated: false
		};

		this.courses.push(newCourse);
	}


	getItemById(id: number): CourseInterface {
		return this.courses.find((course) => {
			return course.id === id;
		});
	}

	deleteCourse(id: number): void {
		this.courses = this.courses.filter(item => item.id !== id);
	}

	updateCourse(newCourse: CourseInterface): void {
		this.deleteCourse(newCourse.id);
		this.courses.push(newCourse);
	}
}

