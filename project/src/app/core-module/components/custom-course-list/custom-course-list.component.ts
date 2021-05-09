import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Course } from 'src/app/interfaces/course.interface';

import { CourseService } from 'src/app/services/course-service/course.service';

@Component({
	selector: 'app-custom-course-list',
	templateUrl: './custom-course-list.component.html',
	styleUrls: ['./custom-course-list.component.scss'],
})
export class CustomCourseListComponent implements OnInit, OnDestroy{

	constructor(
		public courseService: CourseService,
		) { }

	public courses: Course[];

	protected trackers: Subscription[] = [];

	public isShowLoadMore: boolean;

	ngOnInit(): void{
		this.isShowLoadMore = true;

		const getCourseListSubscription = this.courseService.getCoursesList().subscribe((courses) => {
			this.courses = courses;
		});
		this.trackers.push(getCourseListSubscription);
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


