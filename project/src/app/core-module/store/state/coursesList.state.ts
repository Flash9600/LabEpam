import { Course } from 'src/app/interfaces/course.interface';

export interface ICoursesState{
	courses: Course[];
	pageNumber: number;
	isSearchCourses: boolean;
	isShowLoadMoreBtn: boolean;
	isShowConfirmation: boolean;
}

export const initialCoursesState: ICoursesState = {
	courses: null,
	pageNumber: 1,
	isSearchCourses: false,
	isShowLoadMoreBtn: true,
	isShowConfirmation: false,
};
