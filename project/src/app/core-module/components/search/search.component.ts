import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { searchSelector } from '../../store/selectors/search.selectors';

import { setSearchAction } from './../../store/actions/search.actions';

@Component({
	selector: 'app-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy{

	public inputText: string;

	public inputSubscription: Subscription;

	constructor(protected store: Store) {}

	@ViewChild('search') searchForm: NgModel;

	ngOnInit(): void{
		this.inputSubscription = this.store.select(searchSelector)
		.subscribe(value => this.inputText = value);
	}

	findCoursesByInput(event: string): void{
		if (this.searchForm.valid) {
			this.store.dispatch(setSearchAction({value: event}));
		}
	}

	ngOnDestroy(): void{
		this.inputSubscription.unsubscribe();
	}
}
