import { Component, EventEmitter, HostListener, Input, OnDestroy, Output } from '@angular/core';
import { CourseInterface } from '../../../interfaces/course.interface';

@Component({
	selector: 'app-course-item',
	templateUrl: './course-item.component.html',
	styleUrls: ['./course-item.component.scss']
})
export class CourseItemComponent implements OnDestroy{

	public isOpenConfirmation = false;

	@Input() course: CourseInterface;

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

	OnDeleteCourse(): void {
		this.isOpenConfirmation = false;
		this.deleteCourse.emit(this.course.id);
	}

	ngOnDestroy(): void{
		this.closeConfirmation = (): void => {};
	}
}
