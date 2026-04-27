/**
 * 하위 컴포넌트에 props 를 전달해 주는 composable
 *
 * @description
 * - 하위 컴포넌트에 props를 선언하지 않고 전달 가능
 * - 받는 곳에서 useInject로 받을 수 있음
 *
 * @param key - useInject 에서의 쓰일 Key 값
 * @param data - 하위 컴포넌트로 넘길 데이터
 *
 */
export const useProvide = <TData>( key: string, data: TData ) => {
  provide<TData>( key, data )
}