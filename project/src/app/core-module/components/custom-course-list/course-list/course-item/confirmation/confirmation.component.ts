import { Component, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'app-confirmation',
	templateUrl: './confirmation.component.html',
	styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent {

	@Output() confirmDeletion = new EventEmitter<boolean>();

	onConfirmDeletion(): void {
		this.confirmDeletion.emit(true);
	}

	onRejectDeletion(): void{
		this.confirmDeletion.emit(false);
	}
}
