import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CourseInterface } from '../course.interface';

@Component({
	selector: 'app-course-item',
	templateUrl: './course-item.component.html',
	styleUrls: ['./course-item.component.scss']
})
export class CourseItemComponent  {
	@Input() course: CourseInterface;

	@Output() deleteCourse = new EventEmitter<number>();

	OnDeleteCourse(): void {
		this.deleteCourse.emit(this.course.id);
		console.log(this.course.id);
	}

}
