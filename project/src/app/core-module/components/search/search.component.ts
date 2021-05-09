import { Component } from '@angular/core';
import { CourseService } from 'src/app/services/course-service/course.service';

@Component({
	selector: 'app-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.scss']
})
export class SearchComponent {

	public inputText: string;

	constructor(public courseService: CourseService) {}

	findCoursesByInput(): void {
			this.courseService.getCoursesListByTextTracker.next(this.inputText);
	}

}
