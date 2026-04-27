import { defineStore } from 'pinia'
import type { MenuData } from '@/shared/types/store'

export const useCurrentPageStore = defineStore( 'currentPage', {
  state: () => ( {
    _currentPage: {} as MenuData,
  } ),
  getters: {
    currentPage: ( state ) => state._currentPage,
  },
  actions: {
    setCurrentPage( currentPage: MenuData ) {
      this._currentPage = currentPage
    }
  }
} )