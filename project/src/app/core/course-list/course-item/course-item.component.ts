import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CourseInterface } from '../course.interface';

@Component({
	selector: 'app-course-item',
	templateUrl: './course-item.component.html',
	styleUrls: ['./course-item.component.scss']
})
export class CourseItemComponent  {
	@Input() course: CourseInterface;

	@Output() delCourse = new EventEmitter<number>();

	handleDeleteCourse(): void {
		this.delCourse.emit(this.course.id);
		console.log(this.course.id);
	}

}
