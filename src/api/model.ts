export type BaseResponse<T> = {
  code: number;
  data: T | null;
  message: string;
};

export type BasePageResponse<T> = {
  current: number;
  pageSize: number;
  total: number;
  isLastPage: boolean;
  lists: Array<T>;
};

export type BasePageReq = {
  current: number;
  pageSize: number;
  sortField?: string;
  sortOrder?: string;
};
