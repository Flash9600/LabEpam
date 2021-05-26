import { Component, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';

import { CourseService } from 'src/app/services/course-service/course.service';

@Component({
	selector: 'app-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.scss']
})
export class SearchComponent {

	public inputText: string;

	constructor(public courseService: CourseService) {}

	@ViewChild('search') searchForm: NgModel;

	findCoursesByInput(event: string): void{
		if (this.searchForm.valid) {
			this.courseService.getCoursesListByTextTracker.next(event);
		}
	}

}
