import { defineStore } from 'pinia'
import type { MenuData, TabData } from '@/shared/types/store'
import { menuList, useMenuStore, getMenuMap } from '@/shared/store'

const home: TabData = { key: 'home', name: 'Home', path: '/' }
let homeMenuId = ''
let homeMenuUrl = ''

export const useTabStore = defineStore( 'tab', {
  state: () => ( {
    _tabData: [ home ] as TabData[],
    _currentTab: {} as MenuData,
    _nextVersionCounter: 1, // 전역 version 카운터
  } ),
  getters: {
    tabData: ( state ) => state._tabData,
    getTabDataByKey: ( state ) => ( key: string ) => {
      return state._tabData.find( ( d ) => d.key === key ) ?? { key: '', name: '' }
    },
    getTabCountByKey: ( state ) => ( key: string ) =>
      state._tabData.find( ( d ) => d.key === key )?.version,

    currentTab: ( state ) => state._currentTab || {} as MenuData,
  },
  actions: {
    addTabData( tabItem: TabData ) {
      // 매번 증가하는 고유한 version 부여
      tabItem.version = this._nextVersionCounter
      this._nextVersionCounter++
      
      this._tabData.push( tabItem )
    },
    removeTabData( tabCode: string ) {
      this._tabData = this._tabData.filter( ( { key } ) => key !== tabCode )
    },
    increaseTabCount( tabCode: string ) {
      const tab = this._tabData.find( ( d ) => d.key === tabCode )
      if ( !tab || tab.key === 'home' ) return
      tab.count = isNaN( tab.count ) ? 0 : ( tab.count ?? 0 ) + 1
    },
    clearTabData() {
      this._tabData = [ home ]
      this._nextVersionCounter = 1 // 카운터 초기화
      const menuStore = useMenuStore()
      const router = useRouter()
      homeMenuId = menuStore.selectHome(menuList.value)
      homeMenuUrl = getMenuMap(homeMenuId).menuUrl
      menuStore.selectMenu(homeMenuId)
      router.push(homeMenuUrl)
    },

    setCurrentTab( currentTab: MenuData ) {
      this._currentTab = currentTab
    },
  }
} )
