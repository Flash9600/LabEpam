import { TestBed } from '@angular/core/testing';

import { StateService } from './state.service';

describe('StateService', () => {
	let service: StateService;

	beforeEach(() => {
		service = new StateService();
	});

	it('showAddCoursePage should change value of isShowAddCoursePage with true', () => {
		service.isShowAddCoursePage = false;
		service.showAddCoursePage();
		expect(service.isShowAddCoursePage).toBeTrue;
	});

	it('hideAddCoursePage should change value of isShowAddCoursePage with false', () => {
		service.isShowAddCoursePage = true;
		service.hideAddCoursePage();
		expect(service.isShowAddCoursePage).toBeFalse;
	});

	it('changeSortWayOfCoursesList should change value of sortWay with date', () => {
		service.changeSortWayOfCoursesList();
		expect(service.sortWay).toBe('date');
	});
});
