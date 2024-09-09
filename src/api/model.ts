export type BaseResponse<T> = {
  code: number;
  data: T | null;
  message: string;
};

export type BasePageResponse<T> = {
  current: 1;
  pageSize: 10;
  total: number;
  isLastPage: boolean;
  lists: T;
};
