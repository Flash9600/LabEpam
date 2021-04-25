import { Component } from '@angular/core';

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

}
