import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class StateService {

	public sortWay = 'date';

	public isShowAddCoursePage = false;

	changeSortWayOfCoursesList(): void {
		this.sortWay = this.sortWay === 'date' ? 'title' : 'date';
	}

	toggleAddCoursePage(): void {
		this.isShowAddCoursePage = !this.isShowAddCoursePage;
	}
}
