import { debounceTime, distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { concat, of } from 'rxjs';

import {
	doToggleLoadMoreBtnAction,
	getCoursesAction,
	doToggleSearchCoursesAction
} from './../actions/courses.actions';
import { ESearchActions } from './../actions/search.actions';
import { CourseService } from 'src/app/services/course-service/course.service';
import { getCoursesSuccessAction } from '../actions/courses.actions';

@Injectable()
export class SearchEffects {
	constructor(
		private coursesService: CourseService,
		private actions$: Actions,
	) { }

	public getCoursesBySearch$ = createEffect(() => this.actions$.pipe(
		ofType(ESearchActions.setSearch),
		distinctUntilChanged(),
		debounceTime(2000),
		map((action: { value: string }) => action.value),
		filter(value => value.length > 1 || value === ''),
		switchMap(text => {
			if (text) {
				return concat(
					of(
						doToggleLoadMoreBtnAction({ isShowLoadMoreBtn: false }),
						doToggleSearchCoursesAction({ isSearchCourses: true })
					),
					this.coursesService.getCoursesBySearch(text).pipe(
						map((courses) => getCoursesSuccessAction({ courses }))
					)
				);
			} else {
				return of(
					doToggleLoadMoreBtnAction({ isShowLoadMoreBtn: true }),
					doToggleSearchCoursesAction({ isSearchCourses: false }),
					getCoursesAction()
				);
			}
		}),


	));

}
