import type { CorpOptionsMap, CorpOptionsSearchParams } from '@/shared/types/app'
import { axios } from '@/shared/utils'
import { REFRESH_TOKEN_ERROR } from '@/shared/constants/common/auth'

const commonApi = '/api/v1/code/corp/option/search/list'

/**
 * Nuxt 3 useAsyncData 기반 Corp Options 조회
 */
export function getCorpOptions( params: CorpOptionsSearchParams[] ) {
  const cacheKey = `corpOptions:${ JSON.stringify( params ) }`

  return useAsyncData<CorpOptionsMap>(
    cacheKey,

    async () => {
      try {
        const { data } = await axios.post(
          `${ commonApi }`,
          { searchList: params }
        )

        return data?.options as CorpOptionsMap
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
    },
  )
}
