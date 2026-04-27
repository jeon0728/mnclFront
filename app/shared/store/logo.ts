import { defineStore } from 'pinia'

const LOGO_STORAGE_KEY = 'corp_logo_url'
const DEFAULT_LOGO = '/shared/assets/image/logo.png'

export const useLogoStore = defineStore('logo', {
  state: () => ({
    logoUrl: (() => {
      // localStorage에서 로고 URL 불러오기
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem(LOGO_STORAGE_KEY)
        return stored || DEFAULT_LOGO
      }
      return DEFAULT_LOGO
    })() as string
  }),
  getters: {
    getLogoUrl: (state) => state.logoUrl
  },
  actions: {
    setLogoUrl(url: string) {
      this.logoUrl = url
      // localStorage에 저장
      if (typeof window !== 'undefined') {
        localStorage.setItem(LOGO_STORAGE_KEY, url)
      }
    },
    resetLogo() {
      this.logoUrl = DEFAULT_LOGO
      if (typeof window !== 'undefined') {
        localStorage.removeItem(LOGO_STORAGE_KEY)
      }
    }
  }
})

