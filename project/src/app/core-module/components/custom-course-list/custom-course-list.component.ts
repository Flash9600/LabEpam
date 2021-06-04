import { doDeleteCourseByIdAction, getMoreCoursesAction } from './../../store/actions/courses.actions';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { coursesSelector, isShowLoadMoreBtnSelector } from './../../store/selectors/courses.selectors';
import { Course } from 'src/app/interfaces/course.interface';
import { CourseService } from 'src/app/core-module/services/course-service/course.service';

@Component({
	selector: 'app-custom-course-list',
	templateUrl: './custom-course-list.component.html',
	styleUrls: ['./custom-course-list.component.scss'],
})
export class CustomCourseListComponent implements OnInit{

	constructor(public courseService: CourseService, protected store: Store) { }

	public courses$: Observable<Course[]>;

	public isShowLoadMoreBtn$: Observable<boolean>;

	ngOnInit(): void{
		this.isShowLoadMoreBtn$ = this.store.select(isShowLoadMoreBtnSelector);
		this.courses$ = this.store.select(coursesSelector);

	}

	onDeleteCourse(id: number): void {
		this.store.dispatch(doDeleteCourseByIdAction({courseId: id}));
	}

	onLoadMore(): void {
		this.store.dispatch(getMoreCoursesAction());
	}

}


