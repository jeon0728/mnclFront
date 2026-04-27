/**
 * 반응형 데이터를 생성히기 위한 composable
 *
 * @description
 * - 반응형 데이터를 생성해 준다
 * - 여러건 생성 가능
 *
 * @param init - 초기값을 세팅 될 데이터(초기값 세팅에 따라 반환 데이터들의 수가 정해짐)
 *
 * @return TData[] - 생성된 데이터 리스트
 *
 * @example
 * ```ts
 * // 1개일때
 * const [ data ] = useData( {} )
 * // 2개일때
 * const [ data1, data2 ] = useData( {}, {} )
 * ```
 */
export const useData = <TData = Record<string, any>>( ...init: TData[] ) => {
  return init.map( data => ref<TData>( data ) )
}

