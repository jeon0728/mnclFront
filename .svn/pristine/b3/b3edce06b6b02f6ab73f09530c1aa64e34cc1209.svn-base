import { useRouter } from 'vue-router'
import { useTabStore } from '@/shared/store/tab'
import { useLinkStore } from '@/shared/store/link'
import { getMenuMap, MENU_HOME, useCurrentPageStore } from '@/shared/store'

export type LinkOptions = {
  /** 사용자 정의 메뉴 경로 (선택적) */
  menuPath?: string
}

/**
 * 페이지 링크 네비게이션 composable
 *
 * @description
 * - 메뉴 코드를 기반으로 페이지 간 네비게이션을 처리합니다.
 * - 현재 페이지, 탭, 링크 파라미터 상태를 자동으로 관리합니다.
 * - Vue Router를 통해 실제 페이지 이동을 수행합니다.
 *
 * @returns {Function} 링크 네비게이션 함수
 *
 * @example
 * ```typescript
 * const link = useLink()
 *
 * // 기본 사용법
 * link('Inbound', { page: 1, size: 10 })
 *
 * // 사용자 정의 경로로 이동
 * link(null, { id: 123 }, { menuPath: '/custom/path' })
 *
 * // 홈 페이지로 이동
 * link('home', {})
 * ```
 */

export function useLink() {
  const router = useRouter()
  const { params: linkParams, setParams } = useLinkStore()
  const { setCurrentPage } = useCurrentPageStore()
  const { currentTab, setCurrentTab, increaseTabCount } = useTabStore()

  return async <T extends Record<string, any>>( menuCode: string | null, params: T, options: LinkOptions = {} ) => {
    const { menuPath: optionsMenuPath } = options
    
    // menuPath가 제공된 경우 menuCode 없이도 동작
    if ( !menuCode && !optionsMenuPath ) return
    
    let menuMap
    let menuUrl
    let finalMenuCode = menuCode
    
    if ( menuCode ) {
      menuMap = menuCode === 'home' ? MENU_HOME : getMenuMap( menuCode )
      menuUrl = menuMap?.menuUrl
    }
    
    // menuPath가 제공된 경우 해당 경로 사용
    const finalPath = optionsMenuPath || menuUrl
    if ( !finalPath ) return
    
    // menuCode가 없고 menuPath만 있는 경우, 경로를 기반으로 임시 menuCode 생성
    if ( !finalMenuCode && optionsMenuPath ) {
      finalMenuCode = optionsMenuPath.replace(/\//g, '_').replace(/^_/, '') || 'temp'
    }

    if ( currentTab?.menuId === finalMenuCode ) {
      increaseTabCount( currentTab.menuId )
    }

    if ( menuMap ) {
      setCurrentPage( menuMap )
      setCurrentTab( menuMap )
    }
    
    if ( finalMenuCode ) {
      setParams( { ...linkParams.value, [ finalMenuCode ]: params } )
    }

    try {
      await router.push( {
        path: finalPath,
      } )
    } catch ( err: any ) {
      // Navigation 에러 무시 (중복 네비게이션 등)
      if ( err.name !== 'NavigationDuplicated' ) {
        console.error( 'Navigation error:', err )
      }
    }
  }
}
