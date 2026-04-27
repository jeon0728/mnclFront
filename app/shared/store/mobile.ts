import { defineStore } from 'pinia'

export const useIsMobileStore = defineStore( 'isMobile', {
  state: () => ( {
    _isMobile: false,
  } ),
  getters: {
    isMobile: ( state ) => state._isMobile
  },
  actions: {
    setIsMobile( isMobile: boolean ) {
      this._isMobile = isMobile
    }
  }
} )