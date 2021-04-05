import { Component, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'app-confirmation',
	templateUrl: './confirmation.component.html',
	styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent {

	@Output() confirmDeletionEvent = new EventEmitter<boolean>();

	OnDeleteCourse(): void {
		this.confirmDeletionEvent.emit(true);
	}
}
