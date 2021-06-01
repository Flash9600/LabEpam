import { RouterReducerState } from '@ngrx/router-store';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectRouter = createFeatureSelector<RouterReducerState>('router');

export const routerSelector = createSelector(
	selectRouter,
	(router: RouterReducerState) => router.state.root.children[0].firstChild.params.id
);
