import { defineStore } from 'pinia'
import type { Session } from '@/shared/types/store'

export const useSessionStore = defineStore( 'session', {
  state: () => ( {
    _session: {} as Session
  } ),
  getters: {
    session: state => state._session,
    getSession: ( state ) => ( key: keyof Session ) => state._session?.[ key ]
  },
  actions: {
    setSession( session: Session ) {
      this._session = session
    }
  }
} )