import { Component, EventEmitter, Output } from '@angular/core';

@Component({
	selector: 'app-date-input',
	templateUrl: './date-input.component.html',
	styleUrls: ['./date-input.component.scss']
})
export class DateInputComponent{

	@Output() inputEvent = new EventEmitter<Date>();

	set sendInputValue(input: Date){
		this.inputEvent.emit(input);
	}
}
