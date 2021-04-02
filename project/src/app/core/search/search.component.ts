import { Component, EventEmitter, Output } from '@angular/core';

@Component({
	selector: 'app-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.scss']
})
export class SearchComponent {
	public value: string;
	public toggleSort = true;
	@Output() sortWay = new EventEmitter<string>();

	sendSortWay(): void {
		this.sortWay.emit(this.toggleSort ? 'title' : 'date');
		this.toggleSort = !this.toggleSort;
	}

}
