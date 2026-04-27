import type { SourceMap } from '@/shared/types/app'

/**
 * 상위 컴포넌트에서 넘긴 공통코드 받는 composable
 *
 * @description
 * - 상위 컴포넌트에서 useProvide로 값 전달 해 주어야 함
 * - 한개만 넘길수 있음
 *
 * @param key - 상위 컴포넌트에서 던진 key 값 default: 'codes'
 *
 * @return SourceMap - 상위 컴포넌트에서 전달 한 data *
 */
export const useCodesInject = ( key: string = 'commonCodes' ) => {
  return inject<Ref<SourceMap>>( key )
}