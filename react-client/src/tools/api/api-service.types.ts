export type Page<T> = {
  content: T[];
  pageable: Pageable;
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  sort: string[];
  first: boolean;
  numberOfElements: number;
  empty: boolean;
};

export type Pageable = {
  pageNumber: number;
  pageSize: number;
  sort: string[];
  offset: number;
  paged: boolean;
  unpaged: boolean;
};

export type PageWrapper = {
  page: number;
  size: number;
};

export type ApiResponse<T> =
  | { status: 'success'; data: T }
  | {
      status: 'error';
      message: string;
    };

export type ApiErrorResponseData = {
  message?: string;
};
