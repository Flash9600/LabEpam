import { Component, forwardRef, OnInit, OnDestroy, Input } from '@angular/core';
import { FormArray, NG_VALUE_ACCESSOR, FormGroup, FormControl, AbstractControl, ControlValueAccessor, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-authors-input',
	templateUrl: './authors-input.component.html',
	styleUrls: ['./authors-input.component.scss'],
	providers: [{
		provide: NG_VALUE_ACCESSOR,
		useExisting: forwardRef(() => AuthorsInputComponent),
		multi: true
	}]
})
export class AuthorsInputComponent implements OnInit, OnDestroy, ControlValueAccessor{

	public courseAuthors: FormGroup;
	protected subscription: Subscription;

	@Input() availableAuthors: string[];

	get inputValue(): string{
		return this.courseAuthors.value.inputValue;
	}

	get authorsOfCourse(): AbstractControl[]{
		return (this.courseAuthors.controls.authors as FormArray).controls;
	}

	get isValidateValue(): boolean{
		const controlInput = this.courseAuthors.controls.inputValue;
		return controlInput.invalid && (controlInput.dirty || controlInput.touched);
	}

	get isValidateBtn(): boolean{
		const controlInput = this.courseAuthors.controls.inputValue;
		return controlInput.invalid || !controlInput.value;
	}

	ngOnInit(): void{
		this.courseAuthors = new FormGroup({
			inputValue: new FormControl(null, [
				Validators.minLength(2),
				Validators.maxLength(25),
				Validators.pattern(/^[^<>'"/;`%?|!0-9]*$/)
			]),
			authors: new FormArray([])
		});
		this.subscription = this.courseAuthors.valueChanges.subscribe((courseAuthors) => {
			this.onChange(courseAuthors.authors.join('/'));
			this.onTouched();
		});
	}

	get availableAuthorsList(): string[] {
		const authorsList: string[] = this.courseAuthors.value.authors;
		return this.availableAuthors
		.filter(availableAuthor => {
			return !authorsList.includes(availableAuthor);
		})
		.filter(availableAuthor => {
			const reg = new RegExp(this.inputValue, 'ig');
			const match = availableAuthor.match(reg);
			if (match) {
				return match[0] !== availableAuthor;
			}
			return false;
		});
	}

	replaceAuthorToInput(author: string): void{
		this.courseAuthors.controls.inputValue.setValue(author);
	}

	addAuthor(): void{
			(this.courseAuthors.get('authors') as FormArray).push(new FormControl(this.inputValue));
			this.courseAuthors.controls.inputValue.reset();
	}

	removeAuthor(index: number): void {
		(this.courseAuthors.get('authors') as FormArray).removeAt(index);
	}

	onChange(authors: string): void {}

	onTouched(): void {}

	writeValue(value: string): void{
		(this.courseAuthors.get('authors') as FormArray).clear();
		value.split('/').forEach(authorName => {
			if (authorName) {
				(this.courseAuthors.get('authors') as FormArray).push(new FormControl(authorName));
			}
		});
	}

	registerOnChange(fn: () => void): void{
		this.onChange = fn;
	}

	registerOnTouched(fn: () => void): void{
		this.onTouched = fn;
	}

	ngOnDestroy(): void{
		this.subscription.unsubscribe();
	}

}
