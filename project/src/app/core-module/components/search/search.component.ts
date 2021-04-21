import { Component, EventEmitter, Output } from '@angular/core';

import { StateService } from 'src/app/services/state/state.service';

@Component({
	selector: 'app-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.scss']
})
export class SearchComponent {

	constructor(protected stateService: StateService) {}

	switchSortWay(): void {
		this.stateService.changeSortWayOfCoursesList();
	}

	f(): void {
console.log('search');

	}

	showAddCoursePage(): void {
		this.stateService.toggleAddCoursePage();
	}
}
