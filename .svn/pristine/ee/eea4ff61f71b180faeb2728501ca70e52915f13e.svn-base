import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'

type AxiosRequestConfigByFile = <T>( url: string, config: AxiosRequestConfig ) => AxiosRequestConfig<T>
export const axiosRequestConfigByFile: AxiosRequestConfigByFile = ( url, defaultConfig ) => ( {
  url,
  method: 'GET',
  headers: { 'content-type': 'application/json; charset=UTF-8' },
  responseType: 'arraybuffer',
  ...defaultConfig
} )

export const processDownloadFile = ( { data, headers } ) => {
  const url = window.URL.createObjectURL( new Blob( [ data ], { type: headers[ 'content-type' ] } ) )
  const fileName = headers[ 'content-disposition' ].split( 'fileName="' )[ 1 ].replace( '";', '' )
  const link = document.createElement( 'a' )
  link.href = url
  link.download = decodeURIComponent( fileName )
  link.click()
  window.URL.revokeObjectURL( url )
}

export const axiosResponseSuccessInterceptor = ( response: AxiosResponse ) => {
  return response
}

export const axiosResponseSuccessInterceptorByFile = ( response: AxiosResponse )  => {
  return response
}

type AxiosInterceptorParams = {
  axiosResponseSuccessInterceptor?( response: AxiosResponse<any, any>  ): AxiosResponse<any, any>
}

/** 인증 없이 API만 호출 (Authorization·토큰 갱신 없음) */
export const createAxiosInterceptor = ( instance: AxiosInstance, { axiosResponseSuccessInterceptor }: AxiosInterceptorParams ) => {
  instance.interceptors.request.use(
    ( config: InternalAxiosRequestConfig ) => config,
    ( error: AxiosError ) => Promise.reject( error )
  )

  instance.interceptors.response.use(
    axiosResponseSuccessInterceptor,
    async ( error: AxiosError<any, any> ) => {
      const { response } = error
      if( response ) {
        const { data, headers } = response
        if( headers && headers[ 'x-error-code' ] && data?.message ) {
          data.message += `[${ headers[ 'x-error-code' ] }]`
        }
        if( data?.unknown ) {
          return new Promise( () => { /* */ } )
        }
        return Promise.reject( { data } )
      }
      return Promise.reject( {
        message: '인터넷 연결을 확인해주세요.'
      } )
    }
  )

  return instance
}
