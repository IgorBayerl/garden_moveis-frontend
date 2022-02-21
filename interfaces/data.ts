export interface IData {
  products: IProduct[];
  categories: ICategory[];
}

export interface IProduct {
  id: string;
  products: IProduct[];
  title: string;
  stock: number;
  price: number;
  description: string;
  categories: ICategory[];
  colection: IColection;
  pictures: IPictures[];
  relatedProducts: IProduct[];
}

export interface IColection {
  products: IProduct[];
}

export interface ICategory {
  id: string;
  title: string;
  selected?: boolean;
}

export interface IPictures {
  id: string;
  url: string;
}
