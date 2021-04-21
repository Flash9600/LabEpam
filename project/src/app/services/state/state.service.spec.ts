import { TestBed } from '@angular/core/testing';

import { StateService } from './state.service';

describe('StateService', () => {
	let service: StateService;

	beforeEach(() => {
		service = new StateService();
	});

	describe('toggleAddCoursePage', () => {

		it('should change value of isShowAddCoursePage with true', () => {
			service.isShowAddCoursePage = false;
			service.toggleAddCoursePage();
			expect(service.isShowAddCoursePage).toBeTrue;
		});

		it('should change value of isShowAddCoursePage with false', () => {
			service.isShowAddCoursePage = true;
			service.toggleAddCoursePage();
			expect(service.isShowAddCoursePage).toBeFalse;
		});
	});

	it('changeSortWayOfCoursesList should change value of sortWay with date', () => {
		service.changeSortWayOfCoursesList();
		expect(service.sortWay).toBe('date');
	});
});
