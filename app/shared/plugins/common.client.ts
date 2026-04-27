export default defineNuxtPlugin( ( nuxtApp ) => {
  // const lang = useLanguage()

  // nuxtApp.provide( 'lang', lang )
} )

// nuxtApp.runWithContext(() => {
//   // 이 안에서는 일반적인 composables 방식으로 store 접근 가능
//   const store = useYourStore()
//   return lang || store.defaultLanguage || ''
// })