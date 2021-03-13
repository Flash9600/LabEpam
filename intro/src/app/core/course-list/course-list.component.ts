import {Component, OnInit} from '@angular/core';
import {CourseInterface} from './course.interface';

@Component({
	selector: 'app-course-list',
	templateUrl: './course-list.component.html',
	styleUrls: ['./course-list.component.scss']
})

export class CourseListComponent implements OnInit {
	courses: CourseInterface[] = [
		{
			id: 1,
			title: 'Course 1',
			duration: '25min',
			date: new Date(2021, 3, 20),
			description: 'about course'
		}, {
			id: 2,
			title: 'Course 2',
			duration: '35min',
			date: new Date(2021, 3, 26),
			description: 'about course'
		}, {
			id: 3,
			title: 'Course 3',
			duration: '1h 10min',
			date: new Date(2021, 3, 27),
			description: 'about course'
		}, {
			id: 4,
			title: 'Course 4',
			duration: '50min',
			date: new Date(2021, 3, 30),
			description: 'about course'
		}
	];

	constructor() {
	}

	ngOnInit(): void {
	}

}
