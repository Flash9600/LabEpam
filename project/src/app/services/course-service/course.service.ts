import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { HttpService } from '../http-service/http.service';
import { Course } from 'src/app/interfaces/course.interface';
import { StorageService } from '../local-storage-service/storage.service';
import { coursesPageNumberSelector } from 'src/app/core-module/store/selectors/courses.selectors';

@Injectable()
export class CourseService {

	protected courseLength: number;
	protected isNewCourse: boolean;
	protected coursesStorageName = 'courses';
	protected authorStorageName = 'authors';
	protected pageNumber: number;
	public moveToCoursesPageTarget: Subject<void>;

	constructor(
		protected router: Router,
		protected network: HttpService,
		private storageService: StorageService,
		private store: Store
	) {
		this.store.select(coursesPageNumberSelector).subscribe(pageNumber => this.pageNumber = pageNumber);
		this.moveToCoursesPageTarget = new Subject<void>();
		this.moveToCoursesPageTarget.subscribe(() => this.router.navigateByUrl('/courses'));
	}

	public get getAuthorsListFromStorage(): Observable<string[]>{
		return of(this.storageService.getValue<string[]>(this.authorStorageName));
	}

	public get getAuthorsListFromNetwork(): Observable<string[]>{
		return this.network.getAuthorsList().pipe(
			tap(authorsList => {
				this.storageService.setValue<string[]>(this.authorStorageName, authorsList);
			})
		);
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
			tap((coursesList: Course[]) => this.storageService.setValue<Course[]>(this.coursesStorageName, coursesList)));
	}

	public get getCoursesListFromStorage(): Observable<Course[]> {
		const courses = this.storageService.getValue<Course[]>(this.coursesStorageName);
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

