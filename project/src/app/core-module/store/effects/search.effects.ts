import { debounceTime, distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions} from '@ngrx/effects';

import { ESearchActions } from './../actions/search.actions';
import { CourseService } from 'src/app/services/course-service/course.service';
import { getCoursesSuccessAction } from '../actions/courses.actions';

@Injectable()
export class SearchEffects {
	constructor(
		private coursesService: CourseService,
		private actions$: Actions,
	) {}

	public getCoursesBySearch$ = createEffect(() => this.actions$.pipe(
		ofType(ESearchActions.setSearch),
		distinctUntilChanged(),
		debounceTime(2000),
		map((action: {value: string}) => action.value),
		filter(value => value.length > 3 || value === ''),
		switchMap(text => {
			if (text) {
				return this.coursesService.getCoursesBySearch(text);
			} else {
				return this.coursesService.getCoursesList();
			}
		}),
		map((courses) => getCoursesSuccessAction({courses}))
	));
}
