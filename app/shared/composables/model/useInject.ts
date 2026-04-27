/**
 * 상위 컴포넌트에서 넘긴 데이터를 받는 composable
 *
 * @description
 * - 상위 컴포넌트에서 useProvide로 값 전달 해 주어야 함
 * - 한건 가능
 *
 * @param key - 상위 컴포넌트에서 던진 key 값들 (여러건 가능)
 *
 * @return TData - 상위에서 넘긴 객체
 */
export const useInject = <TData>( key: string ) => {
  return inject<Ref<TData>>( key )
}