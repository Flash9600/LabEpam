import { ICoursesState } from './course.interface';
import { ISearchState } from './search.interface';

export interface IState {
	coursesList: ICoursesState;
	search: ISearchState;
}
