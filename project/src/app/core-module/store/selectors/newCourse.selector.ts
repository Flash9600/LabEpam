import { createFeatureSelector, createSelector } from '@ngrx/store';

import { INewCourseState } from 'src/app/interfaces/newCourseState.interface';

export const newCourseState = createFeatureSelector<INewCourseState>('newCourse');

export const newCourseSelector = createSelector(newCourseState, (state) => state.course);

export const isNewCourseSelector = createSelector(newCourseState, (state) => state.isNewCourse);

export const authorsListSelector = createSelector(newCourseState, (state) => state.authorsList);
