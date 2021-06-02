import { createAction, props } from '@ngrx/store';

import { Course } from 'src/app/interfaces/course.interface';

export enum ECoursesActions {
	getCourses = '[CoursesList] GetCourses',
	doRefreshCourses = '[CoursesList] RefreshCourses',
	getMoreCourses = '[CoursesList] GetMoreCourses',
	getCoursesSuccess = '[CoursesList] GetCoursesSuccess',
	doToggleLoadMoreBtn = '[CourseList] ToggleLoadMoreBtn',
	doDeleteCourseById = '[CourseList] DeleteCourseById',
	increaseCoursesPage = '[CourseList] increaseCoursesPage',
	doToggleSearchCourses = '[CoursesList] doToggleSearchCourses',
}

export const getCoursesAction = createAction(
	ECoursesActions.getCourses
);

export const getCoursesSuccessAction = createAction(
	ECoursesActions.getCoursesSuccess,
	props<{ courses: Course[] }>()
);

export const doRefreshCoursesAction = createAction(
	ECoursesActions.doRefreshCourses
);

export const getMoreCoursesAction = createAction(
	ECoursesActions.getMoreCourses
);

export const doToggleLoadMoreBtnAction = createAction(
	ECoursesActions.doToggleLoadMoreBtn,
	props<{ isShowLoadMoreBtn: boolean }>()
);

export const doToggleSearchCoursesAction = createAction(
	ECoursesActions.doToggleSearchCourses,
	props<{ isSearchCourses: boolean }>()
);

export const increaseCoursesPageAction = createAction(
	ECoursesActions.increaseCoursesPage
);

export const doDeleteCourseByIdAction = createAction(
	ECoursesActions.doDeleteCourseById,
	props<{courseId: number}>()
);



