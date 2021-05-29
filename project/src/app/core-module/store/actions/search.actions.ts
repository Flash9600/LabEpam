import { ISearchState } from './../../../interfaces/search.interface';
import { createAction, props } from '@ngrx/store';


export enum ESearchActions {
	setSearch = '[Search] SetSearch',
}

export const setSearchAction = createAction(
	ESearchActions.setSearch,
	props<ISearchState>()
);

