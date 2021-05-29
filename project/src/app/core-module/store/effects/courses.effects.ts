import { map, mergeMap, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions} from '@ngrx/effects';

import { StorageService } from './../../../services/local-storage-service/storage.service';
import { getCoursesSuccessAction } from './../actions/courses.actions';
import { ECoursesActions } from '../actions/courses.actions';
import { CourseService } from 'src/app/services/course-service/course.service';
import { Course } from 'src/app/interfaces/course.interface';

@Injectable()
export class CoursesEffects {

	constructor(
		private coursesService: CourseService,
		private actions$: Actions,
	) {}

	public getCourses$ = createEffect(() => {
		return this.actions$.pipe(
		ofType(ECoursesActions.getCourses),
		mergeMap(() =>
			this.coursesService.getCoursesList().pipe(
				map((courses) => getCoursesSuccessAction({courses}))
			)),
		);
	});
}
