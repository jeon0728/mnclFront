import { defineStore } from 'pinia'

export const useLinkStore = defineStore( 'linkStore', {
  state: () => ( {
    _params: {} as Record<string, any>,
    _linkCount: 0
  } ),
  getters: {
    params: ( state ) => state._params,
    linkCount: state => state._linkCount
  },
  actions: {
    setParams( params: Record<string, any> ) {
      this._params = params
    },
    setLinkCount( linkCount: number ) {
      this._linkCount = linkCount
    },
    increaseLinkCount() {
      this._linkCount++
    }
  }
} )