import { ICoursesState } from '../core-module/store/state/coursesList.state';
import { ISearchState } from '../core-module/store/state/search.state';

export interface IState {
	coursesList: ICoursesState;
	search: ISearchState;
}
