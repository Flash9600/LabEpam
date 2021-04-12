import { Component, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'app-error-message',
	templateUrl: './error-message.component.html',
	styleUrls: ['./error-message.component.scss']
})
export class ErrorMessageComponent {
	@Output() closeError = new EventEmitter<boolean>();

	onCloseError(): void {
		this.closeError.emit(true);
	}
}
