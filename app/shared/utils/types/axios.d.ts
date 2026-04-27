export interface ResponseVo<T = any> {
  message: string,
  data: T
}

export interface ErrorVo<T = any> extends Error {
  status: number
  message: string
  isFailLogin?: string
  data: T
  errorId: ErrorId
}

declare module 'axios' {
  interface AxiosRequestConfig<D = any> {
    noLoading?: boolean
  }
}

