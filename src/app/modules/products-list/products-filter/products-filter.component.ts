import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	OnChanges,
	OnInit,
	Output,
	SimpleChanges,
} from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs';
import { IProductsFilter } from '../products-filter.interface';

@Component({
	selector: 'app-products-filter',
	templateUrl: './products-filter.component.html',
	styleUrls: ['./products-filter.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsFilterComponent implements OnInit, OnChanges {
	@Input() brands!: string[] | null;

	@Output() changeFilter = new EventEmitter<IProductsFilter>();

	// readonly filterForm = new FormGroup({
	//   name: new FormControl('', {validators: Validators.minLength(3)}),
	//   brands: new FormArray<FormControl<boolean>>([]),
	//   priceRange: new FormGroup({
	//     min: new FormControl(0),
	//     max: new FormControl(100000),
	//   })
	// })
	filterInitialValue: IProductsFilter = {
		name: '',
		brands: [],
		priceRange: {
			min: 0,
			max: 100000,
		},
	};
	readonly filterForm = this.formBuilder.group({
		// name: new FormControl('', {validators: Validators.minLength(3)}),
		name: ['', { validators: Validators.minLength(3) }],
		brands: this.formBuilder.array<FormControl<boolean>>([]),
		priceRange: this.formBuilder.group({
			min: 0,
			max: 100000,
		}),
	});

	constructor(private readonly formBuilder: FormBuilder) {}

	ngOnInit() {
		// this.filterForm.get(['priceRange', 'min'])?.valueChanges
		setTimeout(() => {
			this.filterForm.patchValue(
				{
					name: '',
					priceRange: {
						min: 10,
					},
				},
				{
					emitEvent: false,
				},
			);
			// this.filterForm.setValue({
			//   name: '123',
			//   brands: [],
			//   priceRange: {
			//     min: 0,
			//     max: 12222,
			//   }
			// });
		}, 2000);

		this.filterForm.valueChanges
			.pipe(
				map((filter) => ({
					...filter,
					brands: this.getBrandsListFromArray(filter.brands),
				})),
			)
			.subscribe((filter) => {
				console.log(filter);
				this.changeFilter.emit(filter as IProductsFilter);
			});
	}

	ngOnChanges({ brands }: SimpleChanges) {
		if (brands) {
			// setTimeout(() => {
			const brandsControlList = (
				this.brands ? this.brands.map(() => new FormControl(false)) : []
			) as FormControl<boolean>[];

			this.filterForm.setControl('brands', new FormArray(brandsControlList));
			// }, 1000)
		}
	}

	onSubmit(filter: IProductsFilter) {
		console.log(filter);
	}

	private getBrandsListFromArray(brandsActiveList: boolean[] | undefined): IProductsFilter['brands'] {
		if (!this.brands) {
			return [];
		}

		return this.brands.filter((_, index) => (brandsActiveList as boolean[])[index]);
	}
}
