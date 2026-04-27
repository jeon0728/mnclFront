import { computed, ref } from 'vue'
import type { MenuData } from '@/shared/types/store'
import { hasMenuId, findFirstLeafMenuId } from './menu.utils'

type MenuMap = Record<MenuData[ 'menuId' ], MenuData>

const menuMapState = ref<MenuMap>( {} )
const menuListState = ref<MenuData[]>( [] )

export const menuMap = computed( () => menuMapState.value )
export const menuList = computed( () => menuListState.value )

export const getMenuMap = ( menuId: MenuData[ 'menuId' ] ) => {
  if ( !import.meta.client ) return {}
  return menuMapState.value[ menuId ] || {}
}

export const setMenuMap = ( menuMap: MenuMap ) => {
  if ( !import.meta.client ) return
  menuMapState.value = menuMap
}

export const setMenuList = ( menuList: MenuData[] ) => {
  if ( !import.meta.client ) return
  menuListState.value = menuList
}

export const MENU_HOME: MenuData = {
  menuId: 'home',
  menuUrl: '/'
}

export const useMenuStore = defineStore('menu', {
  state: () => ({
    selectedMenuId: null as string | null
  }),
  actions: {
    init(menuList: MenuData[]) {
      const saved = localStorage.getItem('selectedMenuId')
      if (saved && hasMenuId(menuList, saved)) {
        this.selectedMenuId = saved
      } else {
        this.selectedMenuId = findFirstLeafMenuId(menuList)
      }
    },
    selectMenu(menuId: string) {
      this.selectedMenuId = menuId
      localStorage.setItem('selectedMenuId', menuId)
    },
    /** ⭐ 홈 버튼 전용 */
    selectHome(menuList: MenuData[]) {
      const homeMenuId = findFirstLeafMenuId(menuList)
      this.selectMenu(homeMenuId)
      return homeMenuId
    }
  }
})