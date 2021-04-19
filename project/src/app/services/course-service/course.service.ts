import { Injectable } from '@angular/core';

import { Course } from 'src/app/interfaces/course.interface';
import { OrderByPipe } from 'src/app/pipes/orderBy-pipe/order-by.pipe';

@Injectable()
export class CourseService {

	constructor(protected orderBy: OrderByPipe) {}

	protected courses: Course[] = [
		new Course({
			id: 1,
			title: 'intro',
			duration: 25,
			date: new Date(2021, 2, 20),
			description: 'about course',
			isTopRated: true
		}), new Course({
			id: 3,
			title: 'directives',
			duration: 80,
			date: new Date(2021, 3, 27),
			description: 'about course',
			isTopRated: true
		}), new Course({
			id: 2,
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

	public getCourseList(way: string = 'date'): Course[] {
		const newCourses = this.orderBy.transform<Course>(this.courses, way);
		return [...newCourses];
	}

	public createCourse(): void {
		const newCourse: Course = new Course({
			id: this.courses.length++,
			title: 'new course',
			duration: Math.floor(Math.random() * 300),
			date: new Date(),
			description: 'about course',
			isTopRated: false
		});

		this.courses.push(newCourse);
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

