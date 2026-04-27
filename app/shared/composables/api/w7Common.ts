import { REFRESH_TOKEN_ERROR } from '@/shared/constants/common/auth'
import { axios } from '@/shared/utils'

const commonApi = '/api/v1/w7/common/auto/no/new/yn'

/**
 * 자동 번호 신규 여부 조회
 */
export function getAutoNoNewYn( param: any ) {
  const cacheKey = `autoNoNewYn:${ JSON.stringify( param ) }`

  return useAsyncData(
    cacheKey,
    async () => {
      try {
        const { data } = await axios.post(
          `${ commonApi }`,
          param
        )

        return data
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
