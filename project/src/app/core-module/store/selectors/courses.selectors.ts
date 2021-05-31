import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ICoursesState } from '../state/coursesList.state';

const coursesCountAtPage = 4;

export const State = createFeatureSelector<ICoursesState>('coursesList');

export const coursesSelector = createSelector(State, (state) => {
	if (!state.courses || state.isSearchCourses) {
		return state.courses;
	}
	return state.courses.slice(0, state.pageNumber * coursesCountAtPage);
});

export const isShowConfirmationSelector = createSelector(State, (state) => state.isShowConfirmation);

export const isShowLoadMoreBtnSelector = createSelector(State, (state) => state.isShowLoadMoreBtn);

export const coursesPageNumberSelector = createSelector(State, (state) => state.pageNumber);
