export type BaseResponse<T> = {
  code: number;
  data: T | null;
  message: string;
};
