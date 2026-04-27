import type { Session } from '@/shared/types/store'
import { useSessionStore } from '@/shared/store'

/**
 * 세션에서 지정한 키의 값을 안전하게 반환하는 composable
 *
 * @description
 * - 세션에 있는 값들을 가져옵니다
 *
 * @example
 * ```ts
 * const session = useSession()
 * const username = session('userId') // string
 * ```
 *
 * @returns {<K extends keyof Session>(key: K) => Session[K]} 세션 키를 받아 해당 값을 반환하는 함수
 */
export function useSession() {
  const sessionStore = useSessionStore()

  return function <K extends keyof Session>( key: K ): Session[K] {
    const value = sessionStore.getSession( key )
    if ( value === undefined || value === null ) {
      const type = typeof sessionStore._session?.[ key ]
      return ( type === 'number' ? 0 : '' ) as Session[K]
    }
    return value as Session[K]
  }
}
