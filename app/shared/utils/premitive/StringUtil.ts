class StringUtil {
  static format ( ...str: string[] ): string {
    const args = Array.prototype.slice.call( str, 1 )
    const [ text ] = str

    return text.indexOf( '{' ) >= 0
      ? text.replace( /\{(\d+)\}/g, ( _, index ) => {
        return args[ index ]
      } )
      : text
  }

  static getFileName ( filename = '' ): string {
    return filename.slice( ( Math.max( 0, filename.lastIndexOf( '.' ) ) || Infinity ) + 1 )
  }

  static validateCellular ( value: string ): boolean {
    return /^\d{3}-\d{3,4}-\d{4}$/.test( value )
  }

  static validateEmail ( value: string ): boolean {
    return /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/.test( value )
  }

  static validateUserId ( value: string, specialCharReg = '_\\-.' ): boolean {
    const reg = new RegExp( `[^\\da-zA-Z${ specialCharReg }]` )

    return !reg.test( value )
  }

  static validatePassword ( value: string ): string {
    const capitalReg = /[A-Z]/
    const numberReg  = /[\\d]/
    const symbolReg  = /[!@#$%^&*()_+\-=\\?]/
    const smallReg   = /[a-z]/
    const minWidth   = '3'

    let valueCheck = false
    let messages = `암호 입력 시 ${minWidth}~20자 이내, \n`

    if( capitalReg.test( value ) ) {
      valueCheck = false
      messages += '대문자 '
    }
    if( smallReg.test( value ) ) {
      valueCheck = false
      messages += '대문자 '
    }
    if( numberReg.test( value ) ) {
      valueCheck = false
      messages += '숫자 '
    }
    if( symbolReg.test( value ) ) {
      valueCheck = false
      messages += '특수문자(!@#$%^&*()_+-=?) '
    }

    messages += '1자 이상 포함되어야 합니다'


    return valueCheck ? '' : messages
  }

  static nvl ( chkStr: string, retStr: string ): string {
    return chkStr ? retStr : chkStr
  }

  static byteLength ( str: string, isUtf: boolean ): number {
    let byte = 0

    if ( !str || str.length === 0 ) {
      return byte
    }

    for ( let i = 0; i < str.length; i++ ) {
      if ( escape( str.charAt( i ) ).length > 4 ) {
        if ( isUtf ) {
          byte +=2 //UTF8 일 경우 한글 3byte 계산
        } else {
          byte++ // 한글 2byte 계산
        }
      }
      byte++
    }

    return byte
  }

  static lpad ( str: string, padLen: number, padStr: string ): string {
    if ( padStr.length > padLen ) {
      return str
    }
    while ( str.length < padLen )
      str = padStr + str
    str = str.length >= padLen ? str.substring( 0, padLen ) : str
    return str
  }

  static rpad ( str: string, padLen: number, padStr: string ): string {
    if( padStr.length > padLen ) {
      return str
    }
    while ( str.length < padLen )
      str += padStr
    str = str.length >= padLen ? str.substring( 0, padLen ) : str
    return str
  }

  static changeSnakeToPascal ( type: string ): string {
    return type.toLowerCase().split('_')
      .map( splitTypes => {
        const capital: string = splitTypes.charAt( 0 ).toUpperCase()

        return splitTypes.replace( splitTypes.charAt( 0 ), capital )
      } ).join('')
  }

  static changeCamelToSnake ( type: string ): string {
    return convertCamelToSnakeOrKebab( type, 'snake' )
  }

  static changeCamelToKebab ( type: string ): string {
    return convertCamelToSnakeOrKebab( type, 'kebab' )
  }
}

function convertCamelToSnakeOrKebab ( value: string, type: 'kebab' | 'snake' ): string {
  return [ ...value ].map( ( char) => {
    return char === char.toUpperCase() ? `${ type === 'snake' ? '_' : '-' }${ char.toLowerCase() }` : char
  } ).join( '' )
}

export default StringUtil
