import { HttpService } from './../http-service/http.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { StateService } from '../state-service/state.service';
import { Course } from 'src/app/interfaces/course.interface';
import { OrderByPipe } from 'src/app/pipes/orderBy-pipe/order-by.pipe';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable()
export class CourseService {

	protected courseLength: number;

	protected isNewCourse: boolean;

	public courseForDeletionTracker: Subject<number>;

	public coursesListTracker: Subject<Course[]>;

	public setNewCourseTracker: Subject<Course>;

	public getCourseByIdTracker: Subject<Course>;

	public getIdTracker: Subject<string>;

	public moveToCoursesPageTarget: Subject<void>;

	public loadMoreTracker: Subject<void>;

	constructor(
		protected orderBy: OrderByPipe,
		protected stateService: StateService,
		protected router: Router,
		protected network: HttpService,
		) {
		this.courseForDeletionTracker = new Subject<number>();
		this.courseForDeletionTracker.subscribe((id) => this.deleteCourse(id));
		this.coursesListTracker = new Subject<Course[]>();
		this.getIdTracker = new Subject<string>();
		this.getIdTracker.subscribe((id) => this.getCourseById(id));
		this.getCourseByIdTracker = new BehaviorSubject<Course>(null);
		this.setNewCourseTracker = new Subject<Course>();
		this.setNewCourseTracker.subscribe((newCourse) => {
				this.setNewCourse(newCourse);
		});
		this.moveToCoursesPageTarget = new Subject<void>();
		this.moveToCoursesPageTarget.subscribe(() => {
			this.router.navigateByUrl('/courses');
		});
		let pageNumber = 1;
		this.loadMoreTracker = new Subject<void>();
		this.loadMoreTracker.subscribe(() => {
			pageNumber ++;
			this.getCoursesList(pageNumber);
		}, null,
		() => pageNumber = 1
		);
	}

	protected sortCoursesList(courses: Course[]): Course[] {
		const sortWay = this.stateService.sortWay;
		const newCourses = courses.map((course: Course) => new Course(course));
		this.courseLength = newCourses.length;
		return this.orderBy.transform<Course>(newCourses, sortWay);
	}

	public getCoursesList(pageNumber: number = 1): Subject<Course[]> {
		this.network.getCoursesList(pageNumber).pipe(
			map((courses) => this.sortCoursesList(courses))
		).subscribe((coursesList) => {
			this.coursesListTracker.next(coursesList);
		});
		return this.coursesListTracker;
	}

	public getCourseById(id: string | undefined): void{
		const numbId = +id;

		if (isNaN(numbId)) {
			this.isNewCourse = true;
			this.createNewCourse();
		} else if (numbId >= 0){
			this.isNewCourse = false;
			this.findCourseById(numbId);
		} else if (id !== undefined){
			this.router.navigate(['error']);
		}
	}

	protected createNewCourse(): void{
		const newCourse = new Course({
			title: '',
			date: new Date(),
			duration: 0,
			description: '',
			isTopRated: false,
		});
		this.getCourseByIdTracker.next(newCourse);
	}

	protected findCourseById(id: number): void{
		this.network.getCourse(id).subscribe((course) => {
			this.getCourseByIdTracker.next(...course);
		});
	}

	protected deleteCourse(id: number): void {
		this.network.deleteCourse(id).subscribe(() => {
			this.getCoursesList();
		});
	}

	public setNewCourse(newCourse: Course): void {
		const subscribeCB = () => this.moveToCoursesPageTarget.next();

		if (this.isNewCourse) {
			this.network.addCourse(newCourse).subscribe(subscribeCB);
		} else {
			this.network.updateCourse(newCourse).subscribe(subscribeCB);
		}
	}

}

