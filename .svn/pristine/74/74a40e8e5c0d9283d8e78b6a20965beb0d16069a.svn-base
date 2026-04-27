'use client'

import { useRoute } from 'vue-router'
import { useCurrentPageStore, useLinkStore } from '@/shared/store'
import type { LinkParams } from '@/shared/types/store'

/**
 * 페이지 파라미터 관리 composable
 *
 * @description
 * - 현재 페이지의 링크 파라미터를 관리하고 처리합니다.
 * - 링크 스토어에서 현재 페이지의 메뉴 ID에 해당하는 파라미터를 조회하여 처리합니다.
 * - 페이지 마운트 시 및 링크 카운트 변경 시 파라미터를 소비자 함수에 전달합니다.
 *
 * @param {Function} consumer - 링크 파라미터를 처리할 콜백 함수
 *
 * @example
 * ```typescript
 * usePageParams((params) => {
 *   console.log('받은 파라미터:', params)
 *   // 파라미터 처리 로직
 * })
 * ```
 */
export const usePageParams: UsePageParams = ( consumer ) => {
  const currentPageStore = useCurrentPageStore()
  const linkStore = useLinkStore()

  function handleLinkEvent() {
    let linkParams: LinkParams = { type: 'new' }
    const route = useRoute()
    const currentMenuId = currentPageStore.currentPage.menuId

    // 현재 메뉴 ID로 파라미터 찾기
    if ( currentMenuId && Object.keys( linkStore.params ).includes( currentMenuId ) ) {
      linkParams = linkStore.params[ currentMenuId ]
      delete linkStore.params[ currentMenuId ]
      linkStore.setParams( linkStore.params )
    } else {
      // 메뉴 ID가 없는 경우 경로 기반으로 파라미터 찾기
      const pathBasedKey = route.path.replace(/\//g, '_').replace(/^_/, '') || 'temp'
      if ( Object.keys( linkStore.params ).includes( pathBasedKey ) ) {
        linkParams = linkStore.params[ pathBasedKey ]
        delete linkStore.params[ pathBasedKey ]
        linkStore.setParams( linkStore.params )
      }
    }

    consumer( linkParams || {} )
  }

  onMounted( () => {
    handleLinkEvent()
  } )

  watch(
    () => linkStore.linkCount,
    () => {
      if( linkStore.linkCount === 0 ) return
      handleLinkEvent()
    },
    { immediate: true }
  )
}

export type UsePageParams = <T extends LinkParams>( hook: any ) => void
