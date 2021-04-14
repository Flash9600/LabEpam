import { Component, EventEmitter, Output } from '@angular/core';

import { SearchEvent } from './../../interfaces/searchEvent.interface';
import { StateService } from 'src/app/service/state/state.service';

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

	switchAddCoursePage(): void {
		this.stateService.switchAddCoursePage();
	}
}
