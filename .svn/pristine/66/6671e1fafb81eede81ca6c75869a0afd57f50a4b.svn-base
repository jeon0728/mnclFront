import { setMenuList, setMenuMap, useMenuStore } from '@/shared/store'
import { MNCL_MENU_TREE, buildMenuMapFromTree } from '@/shared/constants/menu'

/** MNCL 전용: 로그인·서버 메뉴 없이 정적 메뉴만 적용 */
export default defineNuxtPlugin(async () => {
  const menuStore = useMenuStore()
  setMenuMap(buildMenuMapFromTree(MNCL_MENU_TREE))
  setMenuList(MNCL_MENU_TREE)
  menuStore.init(MNCL_MENU_TREE)
})
