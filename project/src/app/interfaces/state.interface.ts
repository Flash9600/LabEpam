import { ISearchValue } from './search.interface';
import { ICoursesState } from './course.interface';

export interface IState {
	coursesList: ICoursesState;
	search: ISearchValue;
}
