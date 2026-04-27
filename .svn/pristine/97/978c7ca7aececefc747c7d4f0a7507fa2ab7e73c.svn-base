import { ref } from 'vue'
import { StringUtil } from '@/shared/utils'
import { CORP_ID, LANGUAGES } from '@/shared/constants/common/auth'

/**
 * 다국어 처리 composable
 *
 * @description
 * - 현재 세션의 `CORP_ID`를 기반으로 해당 회사의 언어 리소스를 조회합니다.
 * - 다국어가 없으면 기본적으로 코드 자체를 반환합니다.
 *
 * @returns {LanguageFunc} 언어 코드를 입력받아 다국어 문자열을 반환하는 함수
 *
 * @example
 * ```ts
 * const lang = useLanguage()
 * // 그리드 명칭 다국어
 * headerName: lang( '1ST_GRP' )
 * // 메세지 다국어
 * errorMessage( lang( 'C_M0008' ) )
 *
 * ```
 */
export const useLanguage = () => {
  const storedCorpId = ref( '' )

  onBeforeMount( () => {
    storedCorpId.value = sessionStorage.getItem( CORP_ID ) || ''
  } )

  const getLang = ( code: string, ...args: string[] ): string => {
    const text = getLanguages( storedCorpId.value )?.[ code ] || ''
    if ( text ) {
      const formatArgs = [ text, ...args ]
      return StringUtil.format.apply( null, formatArgs )
    }
    return text || code
  }

  return getLang
}

const getLanguages = ( corpId: string ) => {
  if( !import.meta.client ) return {}
  const languages = JSON.parse( localStorage.getItem( LANGUAGES ) )
  return languages?.[ corpId ] || {}
}

export type LanguageFunc = ( code: string, ...args: string[] ) => string
