function isObject ( value: any ): boolean {
  return value !== null && value !== undefined && typeof value === 'object'
}

function isUndefined ( value: any ): boolean {
  return typeof value === 'undefined'
}

const delay = ( ms?: number ) =>
  new Promise( ( resolve, reject ) => {
    setTimeout( () => resolve( null ), ms )
  } )

function transformEventListeners( attrs: Record<string, any> ): Record<string, any> {
  return Object.fromEntries(
    Object.entries( attrs )
      .filter( ( [ key ] ) => key.startsWith( 'on' ) && key.length > 2 ) // 더 엄격한 필터링
      .map( ( [ key, value ] ) => [
        key.slice( 2 ).charAt( 0 ).toLowerCase() + key.slice( 3 ),
        value,
      ] )
  )

}


export {
  isObject,
  isUndefined,
  delay,
  transformEventListeners
}