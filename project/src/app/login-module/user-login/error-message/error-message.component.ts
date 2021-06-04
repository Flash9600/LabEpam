import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
	selector: 'app-error-message',
	templateUrl: './error-message.component.html',
	styleUrls: ['./error-message.component.scss']
})
export class ErrorMessageComponent {
	@Output() closeError = new EventEmitter<boolean>();

	@Input() text: string;

	onCloseError(): void {
		this.closeError.emit(true);
	}
}
