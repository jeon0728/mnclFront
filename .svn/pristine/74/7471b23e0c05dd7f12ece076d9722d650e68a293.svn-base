import type { CloneOptions } from './types/index'

class ObjectUtil {
  static isEmpty ( obj: Record<string, any> ): boolean {
    let returnValue = false

    if ( !obj ) {
      returnValue = true
    } else if ( 'x' + obj === 'xNaN' ) {
      returnValue = true
    } else {
      if ( Object.keys( obj ).length < 1 ) {
        returnValue = true
      }
    }

    return returnValue
  }

  static clone ( source: Record<string, any>, options: CloneOptions = {} ): Record<string, any> {
    if ( source === null || typeof source !== 'object' ) {
      return source
    }
    const { suppressRecursionKeys = [] } = options
    const result = Array.isArray( source ) ? [] : {} as any

    for ( const key of Object.keys( source ) ) {
      if ( suppressRecursionKeys.includes( key ) ) {
        result[ key ] = source[ key ]
      } else {
        result[ key ] = ObjectUtil.clone( source[ key ] )
      }
    }

    return result
  }
}

export default ObjectUtil
