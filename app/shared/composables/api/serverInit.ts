import { REFRESH_TOKEN_ERROR } from '@/shared/constants/common/auth'
import { axios } from '@/shared/utils'

/**
 * 세션 조회
 */
export async function getSession() {

  try {
    const { data: { data: { session } } } = await axios.get( '/api/v1/admin/session' )
    console.log(session)
    return session
  } catch ( error: any ) {
    if ( error?.status === 401 ) {
      throw new Error( REFRESH_TOKEN_ERROR )
    }
    throw error
  }
}

/**
 * 창고 코드 조회
 */
export async function getWareHouseCode() {
  try {
    const { data } = await axios.get( '/api/v1/b3/warehouse/search/code' )
    return data
  } catch ( error: any ) {
    if ( error?.status === 401 ) {
      throw new Error( REFRESH_TOKEN_ERROR )
    }
    throw error
  }

}

/**
 * 나의 정보 불러오기
 */
export async function getMeInfo() {
  try {
    const res = await axios.get( '/api/auth/v1/me' )
    return res
  } catch ( error: any ) {
    if ( error?.status === 401 ) {
      throw new Error( REFRESH_TOKEN_ERROR )
    }
    throw error
  }
}
