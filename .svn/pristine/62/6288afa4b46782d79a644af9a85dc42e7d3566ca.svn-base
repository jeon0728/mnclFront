import type { MenuData } from '@/shared/types/store'
import { MENU_HOME } from './menu'

/**
 * menuId가 메뉴 트리에 존재하는지 확인
 */
export const hasMenuId = (
  list: MenuData[] = [],
  menuId?: string | null
): boolean => {
  if (!menuId) return false

  return list.some(
    (item) =>
      item.menuId === menuId ||
      hasMenuId(item.children || [], menuId)
  )
}

/**
 * 첫 번째 이동 가능한 leaf 메뉴 찾기 (MenuData 반환)
 */
export const findFirstLeafMenu = (
  list: MenuData[] = []
): MenuData | null => {
  for (const item of list) {
    if (item.menuUrl) return item
  
    if (item.children?.length) {
      const found = findFirstLeafMenu(item.children)
      if (found) return found
    }
  }
  
  return null
}
  
/**
   * 기존 API 유지 (호환성)
   */
export const findFirstLeafMenuId = (list: MenuData[] = []) =>
  findFirstLeafMenu(list)?.menuId || MENU_HOME.menuId
