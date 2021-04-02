import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { ErrorMessageComponent } from '../error-message/error-message.component';

@Directive({
	selector: '[appValidation]',
	exportAs: 'validation'
})
export class ValidationDirective {

	constructor(private templateRef: TemplateRef<ErrorMessageComponent>, private viewContainerRef: ViewContainerRef) {}

	@Input() set appValidation(inputValue: string) {
		if (inputValue && !inputValue.match(/.+@.+\..+/i)) {
			this.viewContainerRef.createEmbeddedView(this.templateRef);
		} else {
			this.viewContainerRef.clear();
		}
	}

}
