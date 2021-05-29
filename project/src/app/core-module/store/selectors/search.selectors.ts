import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ISearchState } from 'src/app/interfaces/search.interface';

export const State = createFeatureSelector<ISearchState>('search');

export const searchSelector = createSelector(State, (state) => state.value);
