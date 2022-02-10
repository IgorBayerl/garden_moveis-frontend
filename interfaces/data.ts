export interface IData {
  products?: IProduct[];
  categories?: ICategory[];
}

export interface IProduct {
  products: IProduct[];
  title: string;
  description: string;
  categories: ICategory[];
  image?: string;
}

export interface ICategory {
  id?: string;
  title?: string;
}
