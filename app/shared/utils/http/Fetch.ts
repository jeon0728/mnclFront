import { REFRESH_TOKEN, REFRESH_TOKEN_ERROR } from '@/shared/constants/common/auth'
import type { ErrorVo } from '@/shared/types/utils/axios'

type FetchRequestInit = RequestInit & {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  headers?: HeadersInit
  body?: BodyInit | null
  cache?: RequestCache
}

const { NUXT_API_BASE } = process.env
export default class Fetch {
  private isRefreshing = false
  private readonly _accessToken: string
  private readonly _corpId: string
  private readonly _refreshToken: string

  private constructor(
    { accessToken, corpId, refreshToken }: { accessToken: string, corpId: string, refreshToken: string }
  ) {
    this._accessToken = accessToken
    this._corpId = corpId
    this._refreshToken = refreshToken
  }

  async request ( url: string, requestInit: FetchRequestInit ) {
    try {
      const response = await fetch(
        url,
        {
          ...requestInit,
          headers: {
            ...requestInit.headers,
            'Authorization': `Bearer ${ this._accessToken }`
          }
        }
      )

      const { ok, status } = response
      if( ok ) return response

      if( status === 401 ) {
        return this.handleExpiredAccessToken( url, requestInit )
      }
    } catch( err ) {
      const error = err as ErrorVo
      throw new Error( error.message )
    }
  }

  private async handleExpiredAccessToken ( url: string, requestInit: FetchRequestInit ) {
    let accessToken = ''
    try {
      if( !this.isRefreshing ) {
        this.isRefreshing = true
        const { data } = await this.getReIssuedAccessToken()
        accessToken = data
        this.isRefreshing = false
      }

      const retryResponse = await fetch(
        url,
        {
          ...requestInit,
          headers: {
            ...requestInit.headers,
            'Authorization': `Bearer ${ accessToken }`
          }
        }
      )
      const { ok, statusText } = retryResponse
      if( !ok ) new Error( statusText )

      return retryResponse
    } catch( err ) {
      const error = err as ErrorVo
      throw new Error( error.message )
    }
  }

  private async getReIssuedAccessToken () {
    try {
      const response = await fetch(
        `${ NUXT_API_BASE }/api/auth/v1/access/token/${this._corpId}`,
        {
          method: 'GET',
          headers: {
            Cookie: `${REFRESH_TOKEN}=${this._refreshToken};`
          }
        }
      )
      const { ok, statusText } = response
      if( !ok ) throw new Error( statusText )

      return response.json()
    } catch( error ) {
      throw new Error( REFRESH_TOKEN_ERROR )
    }
  }

  static create ( cookies: any ) {
    return new Fetch( cookies )
  }
}
