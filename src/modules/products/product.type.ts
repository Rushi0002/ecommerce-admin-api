//interface for Product
export interface IProduct {
  name: string;
  price: number;
  description: string;
  category: string;
  stock?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

//interface for Product filters
export interface FilterParams {
  category?: string;
  search?: string;
  minPrice?: string;
  maxPrice?: string;
  inStock?: string;
  sortBy?: string;
  orderBy?: string;
  page: string;
  limit: string;
}
