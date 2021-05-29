import { Observable, Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { coursesSelector } from './../../store/selectors/courses.selectors';
import { Course } from 'src/app/interfaces/course.interface';
import { CourseService } from 'src/app/services/course-service/course.service';
import { getCoursesAction } from '../../store/actions/courses.actions';

@Component({
	selector: 'app-custom-course-list',
	templateUrl: './custom-course-list.component.html',
	styleUrls: ['./custom-course-list.component.scss'],
})
export class CustomCourseListComponent implements OnInit, OnDestroy{

	constructor(public courseService: CourseService, protected store: Store) { }

	public courses: Observable<Course[]>;

	protected trackers: Subscription[] = [];

	public isShowLoadMoreBtn: boolean;

	ngOnInit(): void{
		this.isShowLoadMoreBtn = true;
		this.store.dispatch(getCoursesAction());
		this.courses = this.store.select(coursesSelector);

		const showLoadMoreSubscription = this.courseService.showLoadMoreTracker.subscribe((isShow) =>
			this.isShowLoadMoreBtn = isShow
		);
		this.trackers.push(showLoadMoreSubscription);
	}

	onCoursesList(id: number): void {
		this.courseService.courseForDeletionTracker.next(id);
	}

	onLoadMore(): void {
		this.courseService.loadMoreTracker.next();
	}

	ngOnDestroy(): void{
		this.trackers.forEach((subscription) => subscription.unsubscribe());
	}

}


