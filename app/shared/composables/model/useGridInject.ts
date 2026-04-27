import { GridAdapter } from '@/shared/utils'

/**
 * 상위 컴포넌트에서 넘긴 Detail 그리드를 받는 composable
 *
 * @description
 * - 상위 컴포넌트에서 useProvide로 값 전달 해 주어야 함
 * - 여러건 넘가기 가능
 *
 * @param key - 상위 컴포넌트에서 던진 key 값들 (여러건 가능)
 *
 * @return GridAdapter - 상위에서 넘긴 GridAdapter
 */
export const useGridInject = ( ...key: string[] ) => {
  return key.map( k => inject<Ref<GridAdapter>>( k ) )
}
