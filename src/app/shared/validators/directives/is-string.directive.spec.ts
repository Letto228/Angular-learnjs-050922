import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormControl, FormsModule, NgModel } from '@angular/forms';
import { IsStringDirective } from './is-string.directive';
import { ValidationDirectivesModule } from './validation-directives.module';

describe('IsStringDirective', () => {
	const directive = new IsStringDirective();

	it('should create an instance', () => {
		const err = directive.validate(new FormControl('String'));

		expect(err).toBeNull();
	});

	it('should create an instance', () => {
		const err = directive.validate(new FormControl('123'));

		expect(err).toEqual({ isStringValdator: 'Input is not string' });
	});
});

@Component({
	selector: 'app-test',
	template: `<input #input [ngModel]="search" appIsString />`,
})
class TestComponent {
	search = '123';

	@ViewChild('input', { static: true, read: NgModel }) model!: NgModel;
}

describe('IsStringDirective', () => {
	let fixture: ComponentFixture<TestComponent>;
	let component: TestComponent;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [TestComponent],
			imports: [FormsModule, ValidationDirectivesModule],
		});
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(TestComponent);
		component = fixture.componentInstance;
	});

	it('Ошибка при инициализации', fakeAsync(() => {
		fixture.detectChanges();

		tick(0);

		const err = component.model.errors;

		expect(err).toEqual({ isStringValdator: 'Input is not string' });
	}));

	it('Ошибка при инициализации', fakeAsync(() => {
		component.search = 'String';

		fixture.detectChanges();

		tick(0);

		const err = component.model.errors;

		expect(err).toEqual(null);
	}));
});
