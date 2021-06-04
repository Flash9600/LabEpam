import { map, mergeMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { of } from 'rxjs';

import {
	getCoursesSuccessAction,
	ECoursesActions,
	doRefreshCoursesAction,
	increaseCoursesPageAction
} from './../actions/courses.actions';
import { CourseService } from 'src/app/core-module/services/course-service/course.service';

@Injectable()
export class CoursesEffects {

	constructor(
		private coursesService: CourseService,
		private actions$: Actions,
	) { }

	public getCourses$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(ROOT_EFFECTS_INIT),
			mergeMap(() =>
				this.coursesService.getCoursesListFromStorage.pipe(
					map((courses) => {
						if (courses) {
							return getCoursesSuccessAction({ courses });
						} else {
							return doRefreshCoursesAction();
						}
					}),
				)),
		);
	});

	public refreshCourses$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(ECoursesActions.doRefreshCourses),
			mergeMap(() =>
				this.coursesService.refreshCoursesList.pipe(
					map((courses) => getCoursesSuccessAction({ courses }))
				)),
		);
	});

	public getMoreCourses$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(ECoursesActions.getMoreCourses),
			mergeMap(() => of(increaseCoursesPageAction(), doRefreshCoursesAction()))
		);
	});

	public deleteCourseById$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(ECoursesActions.doDeleteCourseById),
			mergeMap(({ courseId }) => this.coursesService.deleteCourse(courseId).pipe(
				map(() => doRefreshCoursesAction())
			))
		);
	});
}
