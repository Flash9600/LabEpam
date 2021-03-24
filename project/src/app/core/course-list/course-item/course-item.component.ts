import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { CourseInterface } from '../course.interface';

@Component({
	selector: 'app-course-item',
	templateUrl: './course-item.component.html',
	styleUrls: ['./course-item.component.scss']
})
export class CourseItemComponent implements OnInit, OnChanges {
	@Input() course: CourseInterface;

	@Output() delCourse = new EventEmitter<number>();

	ngOnInit(): void {
		console.log('OnInit');
	}
	ngOnChanges(): void {
		console.log('OnChanges');
	}
	handleDeleteCourse(): void {
		this.delCourse.emit(this.course.id);
		console.log(this.course.id);
	}

}
