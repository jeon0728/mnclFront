import { defineStore } from 'pinia'

export const useCorpsStore = defineStore( 'corps', {
  state: () => ( {
    _corps: [] as CorpsData
  } ),
  getters: {
    corps: ( state ) => state._corps
  },
  actions: {
    setCorps( _corps: CorpsData ) {
      this._corps = _corps
    }
  }
} )

type CorpsData = Record<string, any>