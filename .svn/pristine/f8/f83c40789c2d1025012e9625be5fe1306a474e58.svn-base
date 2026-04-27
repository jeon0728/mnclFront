
export const formatDisplay = ( template: string, data: Record<string, any> ): string => {
  const regex = /\{(\w+)\}/g
  const matches = [ ...template.matchAll( regex ) ].map( match => match[1] )

  if ( matches.every( m => !data?.[ m ] ) ) return ''
  if ( !regex.test( template ) && matches.some( m => !data?.[ m ] ) ) return ''

  return template.replace( regex, ( _, key ) => {
    return data[ key ] ?? ''
  } )
}

export const getDefaultDisplayValue = () => {
  return '[{code}] {name}'
}