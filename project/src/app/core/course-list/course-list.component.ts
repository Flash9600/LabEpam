import { OrderByPipe } from './../orderBy-pipe/order-by.pipe';
import { Component, Input, OnChanges } from '@angular/core';
import { CourseInterface } from './course.interface';

@Component({
	selector: 'app-course-list',
	templateUrl: './course-list.component.html',
	styleUrls: ['./course-list.component.scss']
})

export class CourseListComponent implements OnChanges {
	private orderBy = new OrderByPipe();

	public courses: CourseInterface[] = [
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

	@Input() readonly sortWay: string;

	ngOnChanges(): void {
		this.sortCourses(this.sortWay);
	}

	sortCourses(way: string = 'date'): void {
		this.courses = this.orderBy.transform<CourseInterface>(this.courses, way);
	}

	delCourse(id: number): void {
		this.courses = this.courses.filter(item => item.id !== id);
	}

}
