import { doRefreshCoursesAction } from './../../core-module/store/actions/courses.actions';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { HttpService } from '../http-service/http.service';
import { Course } from 'src/app/interfaces/course.interface';
import { OrderByPipe } from 'src/app/pipes/orderBy-pipe/order-by.pipe';
import { StorageService } from '../local-storage-service/storage.service';
import { coursesPageNumberSelector } from 'src/app/core-module/store/selectors/courses.selectors';
import { getCoursesAction } from 'src/app/core-module/store/actions/courses.actions';

@Injectable()
export class CourseService {

	protected courseLength: number;
	protected isNewCourse: boolean;
	private coursesNameInStorage = 'courses';
	protected pageNumber = 1;
	public setNewCourseTracker: Subject<Course>;
	public getCourseByIdTracker: Subject<Course>;
	public getIdTracker: Subject<string>;
	public moveToCoursesPageTarget: Subject<void>;
	public getAuthorListTracker: BehaviorSubject<string[]>;

	constructor(
		protected orderBy: OrderByPipe,
		protected router: Router,
		protected network: HttpService,
		private storageService: StorageService,
		private store: Store
	) {
		this.store.select(coursesPageNumberSelector).subscribe(pageNumber => this.pageNumber = pageNumber);
		this.getIdTracker = new Subject<string>();
		this.getIdTracker.subscribe((id) => this.getCourseById(id));
		this.getCourseByIdTracker = new BehaviorSubject<Course>(null);
		this.setNewCourseTracker = new Subject<Course>();
		this.setNewCourseTracker.subscribe((newCourse) => this.setNewCourse(newCourse));
		this.moveToCoursesPageTarget = new Subject<void>();
		this.moveToCoursesPageTarget.subscribe(() => this.router.navigateByUrl('/courses'));
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

	protected createTypeForCoursesList(coursesList: Course[] | undefined): Course[]{
		if (!coursesList || coursesList.length === 0 || coursesList[0].date instanceof Date) {
			return coursesList;
		}
		return coursesList.map((course: Course) => new Course(course));
	}

	public get refreshCoursesList(): Observable<Course[]>{
		return this.network.getCoursesList(this.pageNumber).pipe(
			map(coursesList => this.createTypeForCoursesList(coursesList)),
			tap((coursesList: Course[]) => this.storageService.setValue<Course[]>(this.coursesNameInStorage, coursesList)));
	}

	public get getCoursesListFromStorage(): Observable<Course[]> {
		const courses = this.storageService.getValue<Course[]>(this.coursesNameInStorage);
		return of(courses).pipe(
			map(coursesList => this.createTypeForCoursesList(coursesList))
		);
	}

	public getCoursesBySearch(text: string): Observable<Course[]>{
		return this.network.getCoursesListByText(text).pipe(
		map((coursesList) => this.createTypeForCoursesList(coursesList)));
	}

	public deleteCourse(id: number): Observable<string> {
		return this.network.deleteCourse(id);
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
		const coursesList = this.storageService.getValue<Course[]>(this.coursesNameInStorage);

		if (coursesList) {
			const course = coursesList.find((courseItem) => courseItem.id === id);
			if (course) {
				this.getCourseByIdTracker.next(course);
				return;
			}
		}
		this.network.getCourseById(id).subscribe((courseItem: Course[]) => {
			this.getCourseByIdTracker.next(...courseItem);
		});
	}


	public setNewCourse(newCourse: Course): void {
		const subscribeCB = () => {
			this.moveToCoursesPageTarget.next();
			this.store.dispatch(doRefreshCoursesAction());
		};
		if (this.isNewCourse) {
			this.network.addCourse(newCourse).subscribe(subscribeCB);
		} else {
			this.network.updateCourse(newCourse).subscribe(subscribeCB);
		}
	}

}

