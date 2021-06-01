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

	public createNewCourse(): Course{
		return new Course({
			title: '',
			date: new Date(),
			duration: 0,
			description: '',
			isTopRated: false,
			authors: ['']
		});
	}

	public getCourseByIdFromNetwork(id: number): Observable<Course>{
		return this.network.getCourseById(id).pipe(
			map((course: Course[]) => this.createTypeForCoursesList(course)[0])
		);
	}

	public addNewCourseToNetwork(newCourse: Course): Observable<Course> {
		return this.network.addCourse(newCourse);
	}

	public updateCourseToNetwork(newCourse: Course): Observable<Course> {
		return this.network.updateCourse(newCourse);
	}

}

