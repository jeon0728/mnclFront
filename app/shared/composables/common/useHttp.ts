import type { ResponseVo } from '@/shared/types/utils/axios'
import type { UnwrapRef } from 'vue'
import { useLoadingStore } from '@/shared/store'

/**
 * HTTP 요청을 처리하는 composable
 *
 * @description
 * - HTTP 요청 상태 관리 및 로딩 상태를 제어합니다
 * - 전역 로딩 모달과 연동되어 자동으로 로딩 상태를 표시합니다
 *
 * @returns {UseHttp} [request, isLoading] - 요청 함수와 로딩 상태를 반환
 *
 * @example
 * ```ts
 * const [ request, isLoading ] = useHttp()
 * const response = await request( axiosPromise )
 * ```
 */
export const useHttp: () => UseHttp = () => {
  const isLoading = ref( false )
  const { setIsLoading } = useLoadingStore()

  const request: UseHttp[0] = async ( axiosPromise, options = {} ) => {
    try {
      //로딩 시작
      isLoading.value = true
      // 전역 로딩바 표시 (noLoading 옵션이 없을 때만)
      if ( !options.noLoading ) {
        setIsLoading( true )
      }
      const response = await axiosPromise
      return { data: response.data, error: null }
    } catch ( error ) {
      return { data: null, error: error as Error }
    } finally {
      isLoading.value = false
      // 전역 로딩바 숨김
      if ( !options.noLoading ) {
        setIsLoading( false )
      }
      //로딩 종료
    }
  }

  return [ request, isLoading ]

}

type RequestResult<T = any> = {
  data: T | null
  error: Error | null
}
type UseHttp = [ <T = any>( axiosPromise: Promise<ResponseVo<T>>, options?: UseHttpOptions ) => Promise<RequestResult<T>>, Ref<UnwrapRef<boolean>, UnwrapRef<boolean> | boolean> ]
type UseHttpOptions = {
  noLoading?: boolean
}