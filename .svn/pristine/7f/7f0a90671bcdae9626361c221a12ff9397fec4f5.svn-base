import { useRoute } from 'vue-router'
import { useCurrentPageStore, getMenuMap, menuList, menuMap  } from '@/shared/store'
import { storeToRefs } from 'pinia'

import type { MenuData } from '@/shared/types/store'

/**
 * 메뉴 권한 체크 composable
 *
 * @description
 * - 현재 페이지의 메뉴 권한을 체크합니다
 * - insYn, modYn, delYn, readYn 등의 권한을 확인할 수 있습니다
 * - 새로고침 시에도 route.path를 통해 menuId를 찾아 권한을 체크합니다
 *
 * @example
 * ```typescript
 * const { checkPermission } = useMenuPermission()
 * const { errorMessage } = usePage()
 *
 * const handleNew = () => {
 *   if (!checkPermission('insYn', errorMessage)) return
 *   // 신규 로직 실행
 * }
 * ```
 */
export const useMenuPermission = () => {
  const route = useRoute()
  const { currentPage } = storeToRefs(useCurrentPageStore())

  /**
   * route.path로 menuId를 찾는 함수
   */
  const findMenuIdByPath = (path: string): string | null => {
    // menuMap에서 menuUrl이 일치하는 메뉴 찾기
    const menu = Object.values(menuMap.value).find((m: MenuData) => m.menuUrl === path)
    if (menu?.menuId) return menu.menuId

    // menuList에서 재귀적으로 찾기
    const findInList = (menus: MenuData[]): string | null => {
      for (const menu of menus) {
        if (menu.menuUrl === path) {
          return menu.menuId || null
        }
        if (menu.children) {
          const found = findInList(menu.children)
          if (found) return found
        }
      }
      return null
    }
    return findInList(menuList.value)
  }

  /**
   * 현재 페이지의 menuId를 가져오는 함수
   */
  const getCurrentMenuId = (): string | null => {
    let menuId = currentPage.value?.menuId
    if (!menuId) {
      menuId = findMenuIdByPath(route.path) || null
    }
    return menuId
  }

  /**
   * 권한 체크 함수
   * @param permissionType - 체크할 권한 타입 (insYn, modYn, delYn, readYn)
   * @param errorMessage - 에러 메시지를 표시할 함수 (usePage의 errorMessage)
   * @returns 권한이 있으면 true, 없으면 false
   */
  const checkPermission = (
    permissionType: 'insYn' | 'modYn' | 'delYn' | 'readYn',
    errorMessage: (message: string) => void | Promise<void>
  ): boolean => {
    const menuId = getCurrentMenuId()
    if (!menuId) return true // menuId가 없으면 권한 체크 통과

    const menuData = getMenuMap(menuId)
    const permission = menuData[permissionType]
    if (permission === 'N' || permission === 'n') {
      errorMessage('권한이 없습니다.')
      return false
    }
    return true
  }

  return {
    getCurrentMenuId,
    checkPermission
  }
}

