import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ISearchState } from 'src/app/core-module/store/state/search.state';

export const State = createFeatureSelector<ISearchState>('search');

export const searchSelector = createSelector(State, (state) => state.value);
