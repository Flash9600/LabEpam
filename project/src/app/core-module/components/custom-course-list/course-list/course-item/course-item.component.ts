import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';

import { Course } from 'src/app/interfaces/course.interface';


@Component({
	selector: 'app-course-item',
	templateUrl: './course-item.component.html',
	styleUrls: ['./course-item.component.scss'],
})
export class CourseItemComponent {

	public isOpenConfirmation = false;

	@Input() course: Course;

	@Output() deleteCourse = new EventEmitter<number>();

	@HostListener('click', ['$event.target.id'])
	closeConfirmation(id: string): void {
		if (id === 'close') {
			this.isOpenConfirmation = false;
		}
	}

	confirmDeletion(): void {
		this.isOpenConfirmation = true;
	}

	onDeleteCourse(): void {
		this.isOpenConfirmation = false;
		this.deleteCourse.emit(this.course.id);
	}
}
