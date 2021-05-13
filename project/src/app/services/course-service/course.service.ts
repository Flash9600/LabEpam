import { HttpService } from './../http-service/http.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Course } from 'src/app/interfaces/course.interface';
import { OrderByPipe } from 'src/app/pipes/orderBy-pipe/order-by.pipe';
import { map } from 'rxjs/operators';
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';
import { StorageService } from '../local-storage-service/storage.service';

@Injectable()
export class CourseService {

	protected courseLength: number;
	protected isNewCourse: boolean;
	protected pageNumber: number;
	private coursesNameInStorage = 'courses';
	private limitCoursesOnPage = 4;
	public courseForDeletionTracker: Subject<number>;
	public coursesListTracker: ReplaySubject<Course[]>;
	public setNewCourseTracker: Subject<Course>;
	public getCourseByIdTracker: Subject<Course>;
	public getIdTracker: Subject<string>;
	public moveToCoursesPageTarget: Subject<void>;
	public loadMoreTracker: Subject<void>;
	public getCoursesListByTextTracker: Subject<string>;

	constructor(
		protected orderBy: OrderByPipe,
		protected router: Router,
		protected network: HttpService,
		private storageService: StorageService
		) {
		this.courseForDeletionTracker = new Subject<number>();
		this.courseForDeletionTracker.subscribe((id) => this.deleteCourse(id));
		this.coursesListTracker = new ReplaySubject<Course[]>(1);
		this.getIdTracker = new Subject<string>();
		this.getIdTracker.subscribe((id) => this.getCourseById(id));
		this.getCourseByIdTracker = new BehaviorSubject<Course>(null);
		this.setNewCourseTracker = new Subject<Course>();
		this.setNewCourseTracker.subscribe((newCourse) => this.setNewCourse(newCourse));
		this.moveToCoursesPageTarget = new Subject<void>();
		this.moveToCoursesPageTarget.subscribe(() => this.router.navigateByUrl('/courses'));
		this.loadMoreTracker = new Subject<void>();
		this.loadMoreTracker.subscribe(() => {
			this.pageNumber ++;
			this.getCoursesList(this.pageNumber);
		});
		this.getCoursesListByTextTracker = new Subject<string>();
		this.getCoursesListByTextTracker.subscribe((text) => {
			if (text) {
				this.getCoursesListByText(text);
			}
		});
	}

	protected createTypeForCoursesList(coursesList: Course[]): Course[]{
		if (coursesList[0].date instanceof Date) {
			return coursesList;
		}
		return coursesList.map((course: Course) => new Course(course));
	}

	protected refreshCoursesList(): void{
		this.network.getCoursesList(this.pageNumber).pipe(
			map((coursesList) => this.createTypeForCoursesList(coursesList)))
			.subscribe((coursesList) => {
			this.storageService.setValue(this.coursesNameInStorage, coursesList);
			this.coursesListTracker.next(coursesList);
			});
	}

	public getCoursesList(pageNumber: number = 1): ReplaySubject<Course[]> {
		this.pageNumber = pageNumber;
		const coursesNumber = pageNumber * this.limitCoursesOnPage;
		let courses = this.storageService.getValue<Course[]>(this.coursesNameInStorage);
		if (courses) {
			courses = courses.filter((course, index) => {
				return index + 1 <= coursesNumber;
			}).map(course => new Course(course));
			this.coursesListTracker.next(courses);
		} else {
			this.refreshCoursesList();
		}
		return this.coursesListTracker;
	}

	public getCoursesListByText(text: string): void{
		this.network.getCoursesListByText(text).pipe(
			map((coursesList) => this.createTypeForCoursesList(coursesList))
		).subscribe((coursesList) => {
			this.coursesListTracker.next(coursesList);
		});
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
		const course = this.storageService.getValue<Course[]>(this.coursesNameInStorage)
		.find((courseItem) => courseItem.id === id);
		if (course) {
			this.getCourseByIdTracker.next(course);
		} else {
			this.network.getCourseById(id).subscribe((courseItem) => {
				this.getCourseByIdTracker.next(...courseItem);
			});
		}
	}

	protected deleteCourse(id: number): void {
		this.network.deleteCourse(id).subscribe(() => {
			this.refreshCoursesList();
		});
	}

	public setNewCourse(newCourse: Course): void {
		const subscribeCB = () => {
			this.moveToCoursesPageTarget.next();
			this.refreshCoursesList();
		};
		if (this.isNewCourse) {
			this.network.addCourse(newCourse).subscribe(subscribeCB);
		} else {
			this.network.updateCourse(newCourse).subscribe(subscribeCB);
		}
	}

}

