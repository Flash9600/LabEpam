import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs/operators';

import { HttpService } from './../http-service/http.service';
import { Course } from 'src/app/interfaces/course.interface';
import { OrderByPipe } from 'src/app/pipes/orderBy-pipe/order-by.pipe';
import { StorageService } from '../local-storage-service/storage.service';

@Injectable()
export class CourseService {

	protected courseLength: number;
	protected isNewCourse: boolean;
	private coursesNameInStorage = 'courses';
	protected pageNumber = 1;
	private limitCoursesOnPage = 4;
	public courseForDeletionTracker: Subject<number>;
	public coursesListTracker: ReplaySubject<Course[]>;
	public setNewCourseTracker: Subject<Course>;
	public getCourseByIdTracker: Subject<Course>;
	public getIdTracker: Subject<string>;
	public moveToCoursesPageTarget: Subject<void>;
	public loadMoreTracker: Subject<void>;
	public showLoadMoreTracker: Subject<boolean>;
	public getCoursesListByTextTracker: Subject<string>;
	public getAuthorListTracker: BehaviorSubject<string[]>;

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
			this.pageNumber++;
			this.getCoursesList();
		});
		this.showLoadMoreTracker = new Subject<boolean>();
		this.getCoursesListByTextTracker = new Subject<string>();
		this.getCoursesListByTextTracker.pipe(
			distinctUntilChanged(),
			tap(value => {
				if (value === '') {
					this.getCoursesList();
				}
			}),
			debounceTime(2000),
			filter(value => {
				if (value === '') {
					this.getCoursesList();
				}
				return value.length > 3;
			}),
			switchMap(text => this.network.getCoursesListByText(text).pipe(
				filter((coursesList) => !!coursesList),
				map((coursesList) => this.createTypeForCoursesList(coursesList))
			))).subscribe((coursesList) => {
			this.coursesListTracker.next(coursesList);
			this.showLoadMoreTracker.next(false);
		});
		this.getAuthorsList();
	}

	protected getAuthorsList(): void{
		const authorStorageName = 'authors';
		const authors = this.storageService.getValue<string[]>(authorStorageName);
		if (authors) {
			this.getAuthorListTracker = new BehaviorSubject(authors);
		}else {
			this.network.getAuthorsList().subscribe(authorsList => {
				this.storageService.setValue<string[]>('authors', authorsList);
				this.getAuthorListTracker = new BehaviorSubject(authorsList);
			});
		}
	}

	protected createTypeForCoursesList(coursesList: Course[]): Course[]{
		if (coursesList.length === 0 || coursesList[0].date instanceof Date) {
			return coursesList;
		}
		return coursesList.map((course: Course) => new Course(course));
	}

	protected refreshCoursesList(): void{
		this.network.getCoursesList(this.pageNumber).pipe(
			map((coursesList) => this.createTypeForCoursesList(coursesList)))
			.subscribe((coursesList) => {
			this.storageService.setValue<Course[]>(this.coursesNameInStorage, coursesList);
			this.coursesListTracker.next(coursesList);
			});
	}

	protected isFreshCourses(length: number): boolean {
		const coursesNumber = this.pageNumber * this.limitCoursesOnPage;
		return length >= coursesNumber || length > coursesNumber - this.limitCoursesOnPage;
	}

	public getCoursesList(): ReplaySubject<Course[]> {
		let courses = this.storageService.getValue<Course[]>(this.coursesNameInStorage);
		if (courses && this.isFreshCourses(courses.length)) {
			courses = courses.map(course => new Course(course));
			this.coursesListTracker.next(courses);
		} else {
			this.refreshCoursesList();
		}
		this.showLoadMoreTracker.next(true);
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
			authors: ['']
		});
		this.getCourseByIdTracker.next(newCourse);
	}

	protected findCourseById(id: number): void{
		const course = this.storageService.getValue<Course[]>(this.coursesNameInStorage)
		.find((courseItem) => courseItem.id === id);
		if (course) {
			this.getCourseByIdTracker.next(course);
		} else {
			this.network.getCourseById(id).subscribe((courseItem: Course[]) => {
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

