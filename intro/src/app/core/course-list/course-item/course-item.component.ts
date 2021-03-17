import {Component, Input, OnInit} from '@angular/core';
import {CourseInterface} from '../course.interface';

@Component({
	selector: 'app-course-item',
	templateUrl: './course-item.component.html',
	styleUrls: ['./course-item.component.scss']
})
export class CourseItemComponent implements OnInit {
	@Input() course: CourseInterface;

	constructor() {
	}

	ngOnInit(): void {
	}
}
