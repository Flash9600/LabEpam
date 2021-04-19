import { ICourse } from 'src/app/interfaces/course.interface';
import { Component, OnInit } from '@angular/core';

import { StateService } from 'src/app/services/state/state.service';

@Component({
	selector: 'app-add-course-page',
	templateUrl: './add-course-page.component.html',
	styleUrls: ['./add-course-page.component.scss']
})
export class AddCoursePageComponent implements OnInit{

	public newCourse: ICourse;
	public authors: string;

	constructor(protected stateService: StateService) {}

	ngOnInit(): void{
		this.newCourse = {
			id: 0,
			title: 'string',
			date: new Date(),
			duration: 55,
			description: 'dsf',
			isTopRated: true,
		};
	}

	checkNewCourse(): void{

	}

	hideAddCoursePage(): void{
		this.stateService.hideAddCoursePage();
		console.log(this.newCourse);
	}
}
