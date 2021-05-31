import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';

import { Course } from 'src/app/interfaces/course.interface';


@Component({
	selector: 'app-course-item',
	templateUrl: './course-item.component.html',
	styleUrls: ['./course-item.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseItemComponent {

	public isShowConfirmation: boolean;

	@Input() course: Course;

	@Output() deleteCourse = new EventEmitter<number>();

	toggleConfirmation(): void{
		this.isShowConfirmation = !this.isShowConfirmation;
	}

	onDeleteCourse(): void {
		this.toggleConfirmation();
		this.deleteCourse.emit(this.course.id);
	}
}

