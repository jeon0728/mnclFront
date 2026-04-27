import { GridAdapter } from '@/shared/utils'
import type { AddOptionsMap, GridOptions } from '@/shared/types/grid'

/**
 * GridOptions을 선언하는 composable
 *
 * @description
 * - gridOptions들을 설정 합니다
 *
 * @template TData 그리드에서 사용할 데이터의 타입
 *
 * @param {GridOptions<TData>} agOptionsMap AG Grid 옵션 설정 객체
 * @param {AddOptionsMap} [addOptionsMap] 추가 옵션 설정 객체 (선택사항)
 *
 * @example
 * ```typescript
 * const gridOptions = useGridOptions( { #그리드 옵션 }, { #추가 옵션 } )
 * ```
 *
 * @returns {GridOptions<TData>} 설정된 그리드 옵션 객체
 */

export function useGridOptions<TData>( agOptionsMap: GridOptions<TData>, addOptionsMap?: AddOptionsMap ) {
  const gridOptions = ref<GridOptions<TData>>()
  onBeforeMount( () => {
    gridOptions.value = GridAdapter.createGridOptions<TData>( agOptionsMap, addOptionsMap )
  } )
  return gridOptions
}