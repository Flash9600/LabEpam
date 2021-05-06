import { Observable, Subscriber } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Course } from 'src/app/interfaces/course.interface';
import { User } from 'src/app/interfaces/userEntity.interface';

@Injectable()
export class HttpService {

	private mainLink = 'https://lab-be-courses.herokuapp.com/';

	private token: string;

	private user: User;

	constructor(private httpClient: HttpClient) { }

	private setNewUser(user: User): Observable<object>{
		return this.httpClient.post(`${this.mainLink}sign-in`, user);
	}

	public logInUser(user: User): Observable<boolean>{
		return this.httpClient.post(`${this.mainLink}login`, user)
		.pipe(tap((value: string) => this.token = value),
			map((value) => !!value));
	}

	private subscriberLogInUser(observer: Subscriber<boolean>): void{
		this.logInUser(this.user).subscribe({
			next(): void{
				observer.next(true);
			},
			error(err): void {
					console.log(typeof err);
					observer.error(err);
			}
		});
	}

	get getToken(): string{
		return this.token;
	}

	makeAuthorization(user: User): Observable<boolean>{
		this.user = user;
		const setNewUser = this.setNewUser(user);
		return new Observable<boolean>((observer) => {
			setNewUser.subscribe(
				() => {
					this.subscriberLogInUser(observer);
				},
				(err) => {
					console.log(typeof err);

					this.subscriberLogInUser(observer);
				}
			);
		});
	}

	getCourses(pageNumber: number): Observable<Course[]>{
		const headers = new HttpHeaders({token: this.token});
		const params = new HttpParams().appendAll({
				_limit: '4',
				_page: `${pageNumber}`
		});
		return this.httpClient.get(`${this.mainLink}courses`, {headers, params}).pipe(
			map((value) => value as Course[])
		);
	}

}
