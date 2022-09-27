import { IModel } from "./product.interface";

export interface IProductImage extends IModel {
  source: string;
  url: string;
}
