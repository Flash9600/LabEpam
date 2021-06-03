import { Injectable } from '@angular/core';
import { filter, map, mergeMap, switchMap, startWith, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { createEffect, ofType, Actions, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { RouterNavigatedAction, ROUTER_NAVIGATED } from '@ngrx/router-store';
import { Store } from '@ngrx/store';

import { doRefreshCoursesAction } from './../actions/courses.actions';
import { CourseService } from 'src/app/core-module/services/course-service/course.service';
import { allCoursesSelector } from './../selectors/courses.selectors';
import { doAddNewCourseAction, doAuthorsListSuccessAction, doToggleNewCourseAction, ENewCourseActions } from '../actions/newCourse.actions';
import { Course } from 'src/app/interfaces/course.interface';
import { isNewCourseSelector } from '../selectors/newCourse.selector';

@Injectable()
export class NewCourseEffects {

	constructor(
		private coursesService: CourseService,
		private store: Store,
		private actions$: Actions,
	) { }

	public getNewCourses$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(ROUTER_NAVIGATED),
			filter((routeAction: RouterNavigatedAction) =>
				!!routeAction.payload.routerState.root.firstChild.firstChild.routeConfig.path),
			switchMap((routeAction: RouterNavigatedAction) => {
				const id = routeAction.payload.routerState.root.firstChild.firstChild.params.id;
				if (id) {
					return this.store.select(allCoursesSelector).pipe(
						mergeMap((courses) => {
							const targetCourse = courses.find((courseItem) => courseItem.id === +id);
							if (targetCourse) {
								return of(targetCourse);
							} else {
								return this.coursesService.getCourseByIdFromNetwork(id);
							}
						}),
						map((course: Course | typeof doToggleNewCourseAction) =>
							course instanceof Course ? doAddNewCourseAction({ newCourse: course }) : course),
						startWith(doToggleNewCourseAction({ isNewCourse: false }))
					);
				}
				const newCourse = this.coursesService.createNewCourse();
				return of(doAddNewCourseAction({ newCourse }), doToggleNewCourseAction({ isNewCourse: true }));
			})
		);
	});

	public setNewCourse$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(ENewCourseActions.doSubmitNewCourse),
			switchMap((newCourseState: { newCourse: Course }) =>
				this.store.select(isNewCourseSelector).pipe(
					mergeMap((isNewCourse) => {
						if (isNewCourse) {
							return this.coursesService.addNewCourseToNetwork(newCourseState.newCourse);
						} else {
							return this.coursesService.updateCourseToNetwork(newCourseState.newCourse);
						}
					})
				)),
			tap(() => this.coursesService.moveToCoursesPageTarget.next()),
			map(() => doRefreshCoursesAction())
		);
	});

	public getAuthors$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(ROOT_EFFECTS_INIT),
			mergeMap(() =>
				this.coursesService.getAuthorsListFromStorage.pipe(
					mergeMap((authorsList: string[]) => {
						if (!authorsList) {
							return this.coursesService.getAuthorsListFromNetwork;
						} else {
							return of(authorsList);
						}
					}),
				)
			),
			map((authorsList) => doAuthorsListSuccessAction({ authorsList }))
		);
	});
}
