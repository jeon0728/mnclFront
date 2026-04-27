import { onMounted, ref } from 'vue'

/**
 * useBrowserLanguage - 브라우저 언어 정보를 가져오는 composable
 *
 * @description
 * 브라우저에서 현재 사용자의 언어를 감지하고, 언어 코드와 전체 언어 문자열을 반환합니다.
 * Vue의 `ref`를 사용하여 반응형으로 제공되며, 컴포넌트에서 쉽게 사용할 수 있습니다.
 *
 * @returns {Object} - 반응형 언어 정보
 * @returns {Ref<string>} return.language - 브라우저 전체 언어 문자열 (예: "ko-KR")
 * @returns {Ref<string>} return.languageCode - 브라우저 언어 코드 (예: "KO")
 *
 */
export function useBrowserLanguage() {
  const language = ref( '' )
  const languageCode = ref( '' )

  onMounted( () => {
    const browserLang = navigator.language || ( navigator.languages && navigator.languages[ 0 ] ) || 'ko-KR'
    const langCode = browserLang.split( '-' )[ 0 ]

    language.value = browserLang
    languageCode.value = langCode.toUpperCase()
  } )

  return {
    language,
    languageCode,
  }
}