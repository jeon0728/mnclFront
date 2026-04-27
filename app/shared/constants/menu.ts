import type { MenuData } from '@/shared/types/store'

export const DEFAULT_SIDE_MENU_WIDTH = 220
export const COLLAPSE_SIDE_MENU_WIDTH = 55

/** 로그인 없이 사용할 MNCL 전용 사이드 메뉴 (조회 / 등록) */
export const MNCL_MENU_TREE: MenuData[] = [
  {
    menuId: 'mncl-list',
    menuNm: '조회',
    menuUrl: '/mncl/list',
    accYn: 'Y',
    readYn: 'Y',
    insYn: 'Y',
    modYn: 'Y',
    delYn: 'Y',
  },
  {
    menuId: 'mncl-regist',
    menuNm: '등록',
    menuUrl: '/mncl/regist',
    accYn: 'Y',
    readYn: 'Y',
    insYn: 'Y',
    modYn: 'Y',
    delYn: 'Y',
  },
]

export function buildMenuMapFromTree(menus: MenuData[]): Record<string, MenuData> {
  const map: Record<string, MenuData> = {}
  const walk = (items: MenuData[]) => {
    for (const item of items) {
      if (item.menuId) map[item.menuId] = item
      if (item.children?.length) walk(item.children)
    }
  }
  walk(menus)
  return map
}
