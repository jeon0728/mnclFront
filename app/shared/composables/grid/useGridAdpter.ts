import { GridAdapter } from '@/shared/utils'
import type { GridOptions } from '@/shared/types/grid'

/**
 * GridAdapter 인스턴스를 생성하는 composable
 *
 * @description
 * - GridOptions를 받아 GridAdapter 생성 함수를 반환합니다
 * - 반환된 함수에 gridRef를 전달하여 GridAdapter 인스턴스를 생성할 수 있습니다
 *
 * @template TData 그리드에서 사용할 데이터의 타입
 *
 * @param {GridOptions<TData>} gridOptions 그리드 옵션 설정 객체
 *
 * @example
 * ```typescript
 * const createGridAdapter = useGridAdapter(gridOptions)
 * const adapter = createGridAdapter(gridRef)
 * ```
 *
 * @returns {(gridRef: any) => GridAdapter<TData>} gridRef를 받아 GridAdapter 인스턴스를 반환하는 함수
 */
export function useGridAdapter<TData> (
  gridOptions: GridOptions<TData>,
) {
  return ( gridRef: any ) => GridAdapter.of<TData>( gridOptions, null, gridRef )
}
