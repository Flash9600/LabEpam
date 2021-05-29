import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ICoursesState } from 'src/app/interfaces/course.interface';

export const State = createFeatureSelector<ICoursesState>('coursesList');

export const coursesSelector = createSelector(State, (state) => state.courses);
