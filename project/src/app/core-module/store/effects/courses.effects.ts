import { map, mergeMap, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions} from '@ngrx/effects';

import { CourseService } from 'src/app/services/course-service/course.service';
import { getCoursesSuccessAction } from './../actions/courses.actions';
import { ECoursesActions } from '../actions/courses.actions';

@Injectable()
export class CoursesEffects {
	constructor(
		private coursesService: CourseService,
		private actions$: Actions,
	) {}

	public getCourses$ = createEffect(() => {
		return this.actions$.pipe(
		ofType(ECoursesActions.getCourses),
		tap((par) => console.log(par)),
		mergeMap(() =>
			this.coursesService.getCoursesList().pipe(
				map((courses) => getCoursesSuccessAction({courses}))
			)),
		);
	});
}
