import { Component, EventEmitter, HostListener, Input, Output, ChangeDetectionStrategy } from '@angular/core';

import { Course } from 'src/app/interfaces/course.interface';


@Component({
	selector: 'app-course-item',
	templateUrl: './course-item.component.html',
	styleUrls: ['./course-item.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseItemComponent {

	public isOpenConfirmation = false;

	@Input() course: Course;

	@Output() deleteCourse = new EventEmitter<number>();

	confirmDeletion(): void {
		this.isOpenConfirmation = true;
	}

	onDeleteCourse(isDeletion: boolean): void {
			this.isOpenConfirmation = false;
		 if (isDeletion) {
			this.deleteCourse.emit(this.course.id);
		}
	}
}
