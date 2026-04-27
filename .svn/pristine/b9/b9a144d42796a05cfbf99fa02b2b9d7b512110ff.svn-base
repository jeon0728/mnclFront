import { PatternLexer, PatternParser } from '../../support'
import type { ValueFormatterParams } from '../types/index'
import { DateUtil, NumberUtil } from '@/shared/utils'

function getDataName (
  sourceData: Record<string, any>[] = [],
  valueExpr = 'code',
  displayExpr = 'name'
): ( params: ValueFormatterParams ) => string {
  return function ( { value }: ValueFormatterParams ): string {
    const findData = sourceData.find( f => f[ valueExpr ] === value ) || {}
    return findData[ displayExpr ] || value
  }
}

function getPattern ( pattern: string, isDefaultValue?: boolean ): ( params: ValueFormatterParams ) => string {
  const parser = new PatternParser( new PatternLexer() )
  const replacePattern = parser.parse( pattern ).compile()

  return function ( { value }: ValueFormatterParams ): string {
    let retVal: string
    if ( value ) {
      retVal = replacePattern( value )
    }
    if ( isDefaultValue ) {
      retVal = retVal || value
    }
    return retVal
  }
}

function getNumber ( fixed: number ): ( params: ValueFormatterParams ) => string {
  return function ( { value }: ValueFormatterParams ): string {
    const number = ( String( value ) || '' ).replace( /[^0-9.]/g, '' )

    return NumberUtil.formatNumber( number, fixed ) || '0'
  }
}

function getCurrency ( isPrintCurrencyFormat: boolean ): ( params: ValueFormatterParams ) => string {
  return function ( { value }: ValueFormatterParams ): string {
    return NumberUtil.formatCurrency( value, isPrintCurrencyFormat )
  }
}

function getDate ( inputPattern = 'YYYYMMDD', outputPattern = 'YYYY-MM-DD' )
  : ( params: ValueFormatterParams ) => string {
  return function ( { value = '' }: ValueFormatterParams ): string {
    return value ? DateUtil.getFormatDate( value, inputPattern, outputPattern ) : ''
  }
}

function getTime ( inputPattern = 'HHmmss', outputPattern = 'HH:mm:ss' )
  : ( params: ValueFormatterParams ) => string {
  return function ( { value = '' }: ValueFormatterParams ): string {
    return value ? DateUtil.getFormatDate( value, inputPattern, outputPattern ) : ''
  }
}

function getChecked (): ( params: ValueFormatterParams ) => string {
  return function ( { value }: ValueFormatterParams ): string {
    return value === 'Y' ? 'V' : ''
  }
}

export default {
  getDataName,
  getPattern,
  getNumber,
  getCurrency,
  getDate,
  getTime,
  getChecked
}
