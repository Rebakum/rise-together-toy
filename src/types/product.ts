export interface IGetProductsQuery {
  search?: string;
  brandId?: string;
  categoryId?: string;
  status?: string;
  page?: number | string;
  limit?: number | string;
  sortBy?: string;
  sortOrder?: string;
}

export interface IOptions {
  page?: number | string;
  limit?: number | string;
  sortBy?: string;
  sortOrder?: string;
}

export interface IOptionsResult {
  page: number;
  limit: number;
  skip: number;
  sortBy: string;
  sortOrder: string;
}

export interface IPaginatedResult<T> {
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
