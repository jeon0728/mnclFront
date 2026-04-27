import type { Currency, Decimal, NumberFormat } from './types/index'
import { isObject } from './help'
import { StringUtil } from '@/shared/utils'

const DECIMAL_SEP = '.'
const NUMBER_FORMATS: Record<string, NumberFormat> = {
  'ko': {
    GROUP_SEP: ',',
    DECIMAL_SEP: '.',
    DECIMAL: {
      minFrac: 0, maxFrac: 0,
      posPre: '', posSuf: '',
      negPre: '-', negSuf: '',
      gSize: 3, lgSize: 3
    },
    CURRENCY: {
      CURRENCY_SYM: '￦',
      minFrac: 0, maxFrac: 0,
      posPre: '\u00A4', posSuf: '',
      negPre: '(\u00A4', negSuf: ')',
      gSize: 3, lgSize: 3
    }
  },
  'en': {
    GROUP_SEP: ',',
    DECIMAL_SEP: '.',
    DECIMAL: {
      minFrac: 0, maxFrac: 0,
      posPre: '', posSuf: '',
      negPre: '-', negSuf: '',
      gSize: 3, lgSize: 3
    },
    CURRENCY: {
      CURRENCY_SYM: '$',
      minFrac: 2, maxFrac: 2,
      posPre: '\u00A4', posSuf: '',
      negPre: '(\u00A4', negSuf: ')',
      gSize: 3, lgSize: 3
    }
  }
}

function format ( number: number, pattern: Decimal | Currency, groupSep: string, decimalSep: string, fractionSize = 0 ) {
  if ( number === null || !isFinite( number ) || isObject( number ) ) {
    return ''
  }

  let isNegative: boolean = number < 0
  number = Math.abs( number )
  let numStr = number + ''
  let formatedText = ''
  const parts: ( string | number )[] = []

  let hasExponent = false

  if ( numStr.indexOf( 'e' ) !== -1 ) {
    const match: RegExpMatchArray | null = numStr.match( /([\d\\.]+)e(-?)(\d+)/ )

    if ( match && match[ 2 ] === '-' && Number( match[ 3 ] ) > fractionSize + 1 ) {
      numStr = '0'
      number = 0
    } else {
      formatedText = numStr
      hasExponent = true
    }
  }

  if ( !hasExponent ) {
    const fractionLen = ( numStr.split( DECIMAL_SEP )[ 1 ] || '' ).length
    const { minFrac, maxFrac } = pattern

    if ( !fractionSize ) {
      fractionSize = Math.min( Math.max( minFrac, fractionLen ), maxFrac )
    }
    number = +( Math.round( +( number.toString() + 'e' + fractionSize ) ).toString() + 'e' + -fractionSize )

    if ( number === 0 ) isNegative = false

    const fractional = ( '' + number ).split( DECIMAL_SEP )
    const whole = fractional[ 0 ]

    let fraction = fractional[ 1 ] || ''

    let i = 0
    let pos = 0
    const { lgSize, gSize } = pattern

    if ( whole.length >= ( lgSize + gSize ) ) {
      pos = whole.length - lgSize
      for ( i = 0; i < pos; i++ ) {
        if ( ( pos - i ) % gSize === 0 && i !== 0 ) {
          formatedText += groupSep
        }
        formatedText += whole.charAt( i )
      }
    }

    for ( i = pos; i < whole.length; i++ ) {
      if ( ( whole.length - i ) % lgSize === 0 && i !== 0 ) {
        formatedText += groupSep
      }
      formatedText += whole.charAt( i )
    }

    while ( fraction.length < fractionSize ) {
      fraction += '0'
    }
    if ( fractionSize ) {
      formatedText += decimalSep + fraction.substr( 0, fractionSize )
    }
  } else {
    if ( fractionSize > 0 && number > -1 && number < 1 ) {
      formatedText = number.toFixed( fractionSize )
    }
  }
  parts.push( isNegative ? pattern.negPre : pattern.posPre )
  parts.push( formatedText )
  parts.push( isNegative ? pattern.negSuf : pattern.posSuf )

  return parts.join( '' )
}

class NumberUtil {
  static formatNumber ( amount: string | number, fractionSize = 0, country = 'ko' ): string {
    const formats: NumberFormat = NUMBER_FORMATS[ country ]
    const { DECIMAL, GROUP_SEP, DECIMAL_SEP } = formats

    return format(
      amount as number,
      DECIMAL,
      GROUP_SEP,
      DECIMAL_SEP,
      fractionSize
    )
  }

  static formatCurrency ( amount: number, isPrintCurrencyFormat = false, country = 'ko' ): string {
    const regexp = /\u00A4/g
    const formats: NumberFormat = NUMBER_FORMATS[ country ]
    const { CURRENCY, GROUP_SEP, DECIMAL_SEP } = formats
    const { CURRENCY_SYM } = CURRENCY

    return format(
      amount,
      CURRENCY,
      GROUP_SEP,
      DECIMAL_SEP
    ).replace( regexp, isPrintCurrencyFormat ? CURRENCY_SYM : '' )
  }

  static changeNumberType ( preValue: string ): number {
    if ( typeof preValue === 'string' ) {
      preValue = preValue.replace( /,/g, '' )
    }

    return Number( preValue ) || 0
  }

  static getNumberRound ( value: number, decimalPoint: number ): number {
    const multiplier = Math.pow(10, decimalPoint)
    return Math.round( value * multiplier ) / multiplier
  }

  static getBothRoundedDecimal ( value: number ): number {
    const flooredValue = Math.floor( value )
    const valueDecimalPoint = value - flooredValue
    let resultVolWt

    if ( valueDecimalPoint > 0 && valueDecimalPoint < 0.5 ) {
      resultVolWt = flooredValue + 0.5
    } else if ( valueDecimalPoint > 0.5 && valueDecimalPoint < 1 ) {
      resultVolWt = flooredValue + 1
    } else {
      resultVolWt = value
    }
    return resultVolWt
  }

  static formatByValueFormatted = ( value: number, valueFormatted: string ) => {
    const [ int= '0', decimal = '0' ] = String( value ).split( '.' )
    const [ intToFormat= '0', decimalToFormat = '0' ] = valueFormatted.split( '.' )

    return `${ NumberUtil.getValueFormattedByInt( int, intToFormat ) }${ NumberUtil.getValueFormattedByDecimal( decimal, decimalToFormat ) }`
  }

  static getValueFormattedByInt = ( int: string, intToFormat: string ) => {
    let index = 0

    return String( int )
      .split( '' )
      .reverse()
      .map( char => {
        const formats = intToFormat.split( '' ).reverse()
        const format = formats[ index ]

        if ( format === ',' ) {
          char = !char ? ( formats[ 0 ] === '#' ? '' : '0' ) : `${ char },`
          index = 1
        } else {
          char = !char ? ( format === '#' ? '' : '0' ) : char
          index += 1
        }

        return char
      } )
      .reverse()
      .join( '' )
  }

  static getValueFormattedByDecimal = ( decimal: string, decimalToFormat: string ) => {
    if ( decimalToFormat === '0' ) return ''

    const formats = decimalToFormat.split( '' )
    const isAllZero = formats.every( d => d === '0' )
    let decimalInput = ''

    if ( isAllZero ) {
      decimalInput = decimal
    } else {
      const maxLength = formats.length
      const essentialDecimalPoint = formats.filter( d => d === '0' ).length

      decimalInput = decimal && decimal.substring( 0, maxLength )

      if ( decimal.length < essentialDecimalPoint ) {
        decimalInput = StringUtil.rpad( decimalInput, essentialDecimalPoint, '0' )
      }
    }

    return decimalInput ? `.${ decimalInput }` : decimalInput
  }

  /** Use methods, if parameter value is of type string. **/
  static formattingValue = ( format = '#,##0', value, isUnit: boolean ): string => {
    if ( !value ) {
      value = '0'
    }
    if ( !format ) return String( value || '' )

    value = NumberUtil.getRemoveUnitByInt( String( value || '' ) )

    const [ int, decimal ] = value.split( '.' )
    const [ intFormat, decimalFormat ] = format.split( '.' )

    return `${ isUnit ? this.getFormattedInt( int, intFormat ) || '0' : int }${ this.getFormattedDecimal( int, decimal, decimalFormat ) }`
  }

  static getFormattedInt = ( value = '0', intFormat: string ) => {
    const [ , formatUnit ] = intFormat.split( ',' )
    let minus = ''

    if ( value === '0' || !formatUnit ) return '0'
    value = String( Number( value ) )
    const unitLength = formatUnit.length

    if ( value.indexOf( '-' ) >= 0 ) {
      minus = '-'
      value = value.replace( '-', '' )
    }

    return `${ minus }${ String( this.getRemoveUnitByInt( value ) ).split( '' ).reverse().reduce<string[]>( ( acc, d, index ) => {
      if ( index !== 0 && index % unitLength === 0 ) acc.push( ',' )
      acc.push( d )

      return acc
    }, [] ).reverse().join( '' ) }`
  }

  static getFormattedDecimal = ( value: string, decimal = '', decimalFormat: string ): string => {
    if ( !!value && !decimalFormat ) return ''

    const decimalPoint = decimalFormat.length

    if ( decimal.length >= decimalPoint ) {
      return `.${ decimal.substring( 0, decimalPoint ) }`
    } else {
      return `.${ StringUtil.rpad( decimal, decimalPoint, '0' ) }`
    }
  }

  static getRemoveUnitByInt = ( value: string ): string => {
    return ( value || '' ).replace( /,/g, '' )
  }

  static getRoundUpDecimal ( value: number ): number {
    const flooredValue = Math.floor( value )
    const valueDecimalPoint = value - flooredValue

    return valueDecimalPoint > 0
      ? flooredValue + 1
      : value
  }
}


export default NumberUtil
