import type { CodeMap, SourceMap } from '@/shared/types/app'
import { axios } from '@/shared/utils'
import { REFRESH_TOKEN_ERROR } from '@/shared/constants/common/auth'

const commonApi = '/api/v1/code/search/list'

/**
 * Nuxt 3 useAsyncData 기반 공통 코드 조회
 * @param key CodeMap[]
 */
export function getCommonCodes( key: CodeMap[] ) {
  const cacheKey = `commonCodes:${ JSON.stringify( key ) }`

  return useAsyncData<SourceMap>(
    cacheKey,
    async () => {
      try {
        const { data } = await axios.post(
          `${ commonApi }`,
          { searchList: key }
        )

        return data?.codeMap as SourceMap
      } catch ( error: any ) {
        if ( error?.status === 401 ) {
          throw new Error( REFRESH_TOKEN_ERROR )
        }
        console.error( 'Unexpected error during request:', error )
        return {}
      }
    },
    {
      server: false
    }
  )
}
