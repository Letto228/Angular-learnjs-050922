import { IProductImage } from './product-image.interface';

export interface IProduct {
	_id: string;
	name: string;
	code: number;
	price: number;
	images: IProductImage[];
	subCategory: string;
	feedbacksCount: number;
	rating: number;
	description: string;
}
