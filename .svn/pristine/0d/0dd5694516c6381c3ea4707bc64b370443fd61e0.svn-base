import { defineStore } from 'pinia'

export const useWhCdStore = defineStore( 'whCd', {
  state: () => ( {
    _whCds: [] as Record<string, any>[]
  } ),
  getters: {
    whCds: ( state ) => state._whCds
  },
  actions: {
    setWhCds( _whCds: Record<string, any>[] ) {
      this._whCds = _whCds
    }
  }
} )

