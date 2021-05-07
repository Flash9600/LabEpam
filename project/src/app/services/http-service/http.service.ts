import { Observable, Subject, Subscriber, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Course } from 'src/app/interfaces/course.interface';
import { User } from 'src/app/interfaces/userEntity.interface';

@Injectable()
export class HttpService {

	private mainLink = 'https://lab-be-courses.herokuapp.com/';

	private headers: HttpHeaders;

	private token: string;

	private user: User;
	subject: Subject<boolean>;

	constructor(private httpClient: HttpClient) { }

	private setNewUser(user: User): Observable<object>{
		return this.httpClient.post(`${this.mainLink}sign-in`, user);
	}

	private logInUser(user: User): Observable<boolean>{
		return this.httpClient.post(`${this.mainLink}login`, user).pipe(
			tap((value: string) => {
				this.headers = new HttpHeaders({token: value});
				this.token = value;
			}),
			map((value) => !!value));
	}

	private subscribeLogInUser(subject: Subject<boolean>): void{
		this.logInUser(this.user).subscribe({
			next(): void{
				subject.next(true);
			},
			error(err): void {
				subject.error(err);
			}
		});
	}

	public get getToken(): string{
		return this.token;
	}

	public makeAuthorization(user: User): Subject<boolean>{
		this.user = user;
		const setNewUser = this.setNewUser(user);
		const subject =  new Subject<boolean>();
		setNewUser.subscribe(
			() => {
				this.subscribeLogInUser(subject);
			},
			() => {
				this.subscribeLogInUser(subject);
			}
		);
		return subject;
	}

	public getCourses(pageNumber: number): Observable<Course[]>{
		const headers = this.headers;
		const limitCourses = 4;
		const params = new HttpParams().appendAll({
				_limit: `${limitCourses * pageNumber}`
		});
		return this.httpClient.get<Course[]>(`${this.mainLink}courses`, {headers, params});
	}

	public deleteCourse(id: number): Observable<string> {
		const headers = this.headers;
		return this.httpClient.delete<string>(`${this.mainLink}courses/${id}`, {headers}).pipe(
			catchError((err) => throwError(id + err.message))
		);
	}

}
