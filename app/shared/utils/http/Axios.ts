import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import axios from 'axios'
import {
  axiosRequestConfigByFile,
  axiosResponseSuccessInterceptor,
  axiosResponseSuccessInterceptorByFile,
  createAxiosInterceptor,
  processDownloadFile
} from './axiosUtil'
import type { ResponseVo } from '@/shared/types/utils/axios'

interface CustomConstructParam {
  timeout?: number
}

export class CustomAxios {
  private readonly _axiosInstance: AxiosInstance

  constructor( { timeout = 180000 }: CustomConstructParam = {} ) {
    this._axiosInstance = createAxiosInterceptor(
      axios.create( {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json; charset=utf-8'
        },
        timeout,
        withCredentials: true
      } ),
      { axiosResponseSuccessInterceptor }
    )
  }

  getAxios(): AxiosInstance {
    return this._axiosInstance
  }

  multipart<R>( url: string, form: FormData, config: AxiosRequestConfig = {} ): Promise<ResponseVo<R>> {
    const { post } = this._axiosInstance
    return post( url, form, {
      ...config,
      headers: {
        'Content-Type': 'multipart/form-data',
        ...config.headers
      }
    } )
  }

  post<R = any, D = Record<string, any>>( url: string, data: D, config: AxiosRequestConfig = {} ): Promise<ResponseVo<R>> {
    const { post } = this._axiosInstance
    return post( url, data, config )
  }

  get<R = any>( url: string, config: AxiosRequestConfig = {} ): Promise<ResponseVo<R>> {
    const { get } = this._axiosInstance
    return get( url, config )
  }

  put<R = any, D = Record<string, any>>( url: string, data: D, config: AxiosRequestConfig = {} ): Promise<ResponseVo<R>> {
    const { put } = this._axiosInstance
    return put( url, data, config )
  }

  delete<R = any>( url: string, config: AxiosRequestConfig = {} ): Promise<ResponseVo<R>> {
    const { delete: deleteMethod } = this._axiosInstance
    return deleteMethod( url, config )
  }

  downloadFile( fileId: number, config: AxiosRequestConfig = {} ): Promise<void> {
    const fileAxios = createAxiosInterceptor(
      axios.create(),
      { axiosResponseSuccessInterceptor: axiosResponseSuccessInterceptorByFile }
    )
    const defaultConfig = { timeout: 300000, ...config }
    const url = `/api/file/v1/download/${ fileId }`

    return fileAxios( axiosRequestConfigByFile<DownloadFileParams>( url, defaultConfig ) )
      .then( result => {
        processDownloadFile( result )
      } )
      .catch( error => error )
  }
}

export default new CustomAxios()

type DownloadFileParams = {
  fileId: number,
}
