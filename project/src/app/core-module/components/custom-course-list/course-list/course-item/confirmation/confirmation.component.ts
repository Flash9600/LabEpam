import { Component, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'app-confirmation',
	templateUrl: './confirmation.component.html',
	styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent {

	@Output() confirmDeletion = new EventEmitter<void>();

	@Output() undoDeletion =  new EventEmitter<void>();

	onConfirmDeletion(): void {
		this.confirmDeletion.emit();
	}

	onUndoDeletion(): void{
		this.undoDeletion.emit();
	}
}
