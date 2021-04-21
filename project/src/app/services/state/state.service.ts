import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class StateService {

	public sortWay = 'title';

	public isShowAddCoursePage = false;

	changeSortWayOfCoursesList(): void {
		this.sortWay = this.sortWay === 'date' ? 'title' : 'date';
	}

	toggleAddCoursePage(): void {
		this.isShowAddCoursePage = !this.isShowAddCoursePage;
	}
}
