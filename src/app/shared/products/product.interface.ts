import { IProductImage } from './product-image.interface';

export interface IModel {
  [key: string]: any;
}

export interface IProduct extends IModel {
  _id: string;
  name: string;
  price: number;
  images: IProductImage[];
  subCategory: string;
  feedbacksCount: number;
  rating: number;
}
