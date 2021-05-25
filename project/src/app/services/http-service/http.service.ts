import { StorageService } from 'src/app/services/local-storage-service/storage.service';
import { Observable, ReplaySubject, throwError } from 'rxjs';
import { catchError, map, retryWhen, switchMap, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';

import { Course } from 'src/app/interfaces/course.interface';
import { User } from 'src/app/interfaces/userEntity.interface';

@Injectable()
export class HttpService {

	private mainLink = 'https://lab-be-courses.herokuapp.com/';

	private headers: HttpHeaders;

	private token: string;

	private errorUnauthorized = 401;

	private limitCoursesOnPage = 4;

	constructor(private httpClient: HttpClient) {}

	private setNewUser(user: User): Observable<object>{
		return this.httpClient.post(`${this.mainLink}sign-in`, user);
	}

	public makeAuthorization(user: User): Observable<boolean>{
		const setNewUser = this.setNewUser(user);
		return this.httpClient.post(`${this.mainLink}login`, user).pipe(
			retryWhen((error) => {
				return error.pipe(
					tap((errorResponse: HttpErrorResponse) => {
						if (errorResponse.status !== this.errorUnauthorized) {
							throw errorResponse;
						}
					}),
					switchMap(() => setNewUser)
				);

			}),
			tap((value: string) => {
				this.headers = new HttpHeaders({token: value});
				console.log(value);
				this.token = value;
			}),
			map((value) => !!value));
	}

	public get getToken(): string{
		return this.token;
	}

	public getCoursesList(pageNumber: number): Observable<Course[]>{
		const params = new HttpParams().appendAll({
			_limit: `${this.limitCoursesOnPage * pageNumber}`,
			_sort: 'title',
		});
		return this.httpClient.get<Course[]>(`${this.mainLink}courses`, {params});
	}

	public deleteCourse(id: number): Observable<string> {
		const headers = this.headers;
		return this.httpClient.delete<string>(`${this.mainLink}courses/${id}`, {headers}).pipe(
			catchError((err) => throwError(id + err.message))
		);
	}

	public getCourseById(id: number): Observable<Course[]>{
		const params = new HttpParams().set('id', `${id}`);
		return this.httpClient.get<Course[]>(`${this.mainLink}courses/`, {params}).pipe(
			catchError((err) => throwError(id + err.message))
		);
	}

	public getCoursesListByText(text: string): Observable<Course[]>{
		const params = new HttpParams().set('q', `${text}`);
		return this.httpClient.get<Course[]>(`${this.mainLink}courses/`, {params}).pipe(
			catchError((err) => throwError(text + err.message))
		);
	}

	public updateCourse(course: Course): Observable<Course>{
		const headers = this.headers;
		return this.httpClient.put<Course>(`${this.mainLink}courses/${course.id}`, course, {headers}).pipe(
			catchError((err) => throwError(err.message))
		);
	}

	public addCourse(course: Course): Observable<Course>{
		const headers = this.headers;
		return this.httpClient.post<Course>(`${this.mainLink}courses/`, course, {headers}).pipe(
			catchError((err) => throwError(err.message))
		);
	}

}
