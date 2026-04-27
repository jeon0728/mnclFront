import { ACCESS_TOKEN, CORP_ID } from '@/shared/constants/common/auth'

/**
 * useBrowserTabManager - 브라우저 탭 관리 composable
 *
 * @description
 * 브라우저 탭의 가시성 변경을 감지하여 세션 관련 쿠키를 동기화합니다.
 * 페이지가 포커스를 받을 때마다 sessionStorage의 CORP_ID와 ACCESS_TOKEN을
 * 쿠키에 업데이트하여 여러 탭 간의 인증 정보를 동기화합니다.
 *
 * @example
 * ```typescript
 * // 컴포넌트에서 사용
 * useBrowserTabManager()
 * ```
 *
 * @returns {void} 반환값 없음
 *
 * @remarks
 * - 컴포넌트 마운트 시 자동으로 이벤트 리스너 등록
 * - 컴포넌트 언마운트 시 자동으로 이벤트 리스너 제거
 * - visibilitychange 이벤트를 사용하여 탭 포커스 감지
 * - SameSite=Strict 정책으로 쿠키 보안 설정
 */

export const useBrowserTabManager = () => {
  onBeforeMount( () => {
    const corpId = sessionStorage.getItem( CORP_ID )
    if( corpId ) document.cookie = `${ CORP_ID }=${ corpId }; path=/; SameSite=Strict`

    const accessToken = sessionStorage.getItem( ACCESS_TOKEN )
    if( accessToken ) document.cookie = `${ ACCESS_TOKEN }=${ accessToken }; path=/; SameSite=Strict`

    const visibilityChange = () => {
      if( !document.hidden ) {
        const currentCorpId = sessionStorage.getItem( CORP_ID )
        if( currentCorpId ) document.cookie = `${ CORP_ID }=${ currentCorpId }; path=/; SameSite=Strict`

        const accessToken = sessionStorage.getItem( ACCESS_TOKEN )
        if( accessToken ) document.cookie = `${ ACCESS_TOKEN }=${ accessToken }; path=/; SameSite=Strict`
      }
    }
    document.addEventListener( 'visibilitychange', visibilityChange )

    return () => document.removeEventListener( 'visibilitychange', visibilityChange )
  } )
}


