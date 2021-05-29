import { createAction, props } from '@ngrx/store';

import { ICoursesState } from './../../../interfaces/course.interface';

export enum ECoursesActions {
	getCourses = '[CoursesList] GetCourses',
	getMoreCourses = '[CoursesList] GetMoreCourses',
	getCoursesSuccess = '[CoursesList] GetCoursesSuccess'
}

export const getCoursesAction = createAction(
	ECoursesActions.getCourses
);

export const getMoreCoursesAction = createAction(
	ECoursesActions.getMoreCourses,
	props<ICoursesState>()
);

export const getCoursesSuccessAction = createAction(
	ECoursesActions.getCoursesSuccess,
	props<ICoursesState>()
);
