import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';

import { Course } from 'src/app/interfaces/course.interface';



@Component({
	selector: 'app-course-list',
	templateUrl: './course-list.component.html',
	styleUrls: ['./course-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseListComponent {

	@Input() public coursesList: Course[];
	@Input() public isShowLoadMore: boolean;

	@Output() courseDeletion =  new EventEmitter<number>();
	@Output() loadMore =  new EventEmitter<void>();

	onCourseItem(id: number): void {
		this.courseDeletion.emit(id);
	}

	onLoadMore(): void{
		this.loadMore.emit();
	}

}
