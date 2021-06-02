import { createAction, props } from '@ngrx/store';

import { Course } from 'src/app/interfaces/course.interface';

export enum ENewCourseActions {
	doAddNewCourse = '[NewCourse] doAddNewCourse',
	doSubmitNewCourse = '[NewCourse] doSubmitNewCourse',
	doToggleNewCourse = '[NewCourse]  doToggleNewCourse',
	doAuthorsListSuccess = '[NewCourse] doAuthorsListSuccess'
}

export const doAddNewCourseAction = createAction(
	ENewCourseActions.doAddNewCourse,
	props<{newCourse: Course}>()
);

export const doSubmitNewCourseAction = createAction(
	ENewCourseActions.doSubmitNewCourse,
	props<{newCourse: Course}>()
);

export const doToggleNewCourseAction = createAction(
	ENewCourseActions.doToggleNewCourse,
	props<{isNewCourse: boolean}>()
);

export const doAuthorsListSuccessAction = createAction(
	ENewCourseActions.doAuthorsListSuccess,
	props<{authorsList: string[]}>()
);

