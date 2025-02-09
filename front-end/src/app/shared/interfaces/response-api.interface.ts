export interface IResponseApi<T> {
  status: number | string;
  statusCode: number;
  message: string;
  data: T;
  error: boolean;
}
