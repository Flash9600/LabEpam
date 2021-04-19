import { Component, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'app-duration-input',
	templateUrl: './duration-input.component.html',
	styleUrls: ['./duration-input.component.scss']
})
export class DurationInputComponent{

	inputValue: number;
	@Output() inputEvent = new EventEmitter<number>();

	set sendInputValue(input: number){
		this.inputEvent.emit(input);
		this.inputValue = input;
	}

}
