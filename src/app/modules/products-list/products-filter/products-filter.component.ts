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
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
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

	readonly filterForm = this.formBuilder.group({
		name: ['', { validators: Validators.minLength(3) }],
		brands: this.formBuilder.array<FormControl<boolean>>([]),
		priceRange: this.formBuilder.group({
			min: 0,
			max: 100000,
		}),
	});

	constructor(private readonly formBuilder: FormBuilder) {}

	ngOnInit() {
		this.listenFilterChange();
	}

	ngOnChanges({ brands }: SimpleChanges) {
		if (brands) {
			const brandsControlList = (
				this.brands ? this.brands.map(() => new FormControl(false)) : []
			) as FormControl<boolean>[];

			this.filterForm.setControl('brands', new FormArray(brandsControlList));
		}
	}

	private listenFilterChange() {
		this.filterForm.valueChanges
			.pipe(
				map((filter) => ({
					...filter,
					brands: this.getBrandsListFromArray(filter.brands),
				})),
			)
			.subscribe((filter) => {
				this.changeFilter.emit(filter as IProductsFilter);
			});
	}

	private getBrandsListFromArray(brandsActiveList: boolean[] | undefined): IProductsFilter['brands'] {
		if (!this.brands) {
			return [];
		}

		return this.brands.filter((_, index) => (brandsActiveList as boolean[])[index]);
	}
}
