import { axios } from '@/shared/utils'
import type { CodeMap, SourceMap } from '@/shared/types/app'

const cache: Record<string, SourceMap> = {}
const commonApi = '/api/v1/code/search/list'

export async function getCommonCodeAsClient ( key: CodeMap[] ) {
  const cacheKey = JSON.stringify( key )
  if( cache[ cacheKey ] ) return cache[ cacheKey ]

  try {
    const { data } = await axios.post( commonApi, { searchList: key } )
    const codeMap = data?.codeMap as SourceMap
    cache[ cacheKey ] = codeMap
    return codeMap
  } catch( error ) {
    console.log( error )
  }

}
