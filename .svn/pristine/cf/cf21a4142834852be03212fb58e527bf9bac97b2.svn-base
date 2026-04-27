import dayjs, { Dayjs, type ManipulateType } from 'dayjs'
import CustomParseFormat from 'dayjs/plugin/customParseFormat'
import { DATE_UNIT, DISPLAY_DATE_UNIT } from '@/shared/constants/control/unit'

dayjs.extend( CustomParseFormat )

class DateUtil {
  static getNowDate( format: string = DATE_UNIT ) {
    return DateUtil.getDayjs().format( format )
  }

  static getTodayDate( format: string = DATE_UNIT ): string {
    return DateUtil.getDayjs().format( format )
  }

  static getDayjs ( date = '', format = DATE_UNIT ): Dayjs {
    return date ? dayjs( date, format ) : dayjs()
  }

  static getFormatDate ( dayjs: string | Dayjs | undefined = '', dateFormat = DATE_UNIT, displayDateFormat?: string ): string {
    const isDayjs = typeof dayjs !== 'string' && typeof dayjs !== 'undefined'

    return DateUtil.getFormattedDate( !isDayjs ? DateUtil.getDayjs( dayjs, dateFormat ) : dayjs, displayDateFormat || dateFormat )
  }

  static getDate ( dayjs?: string | Dayjs, dateFormat = DISPLAY_DATE_UNIT ): string {
    const isDayjs = typeof dayjs !== 'string'

    if ( isDayjs ) {
      return dayjs.isValid() ? DateUtil.getFormattedDate( dayjs, dateFormat ) : ''
    }
    return dayjs
  }

  static getDay ( date: string | Dayjs ): number {
    const formattedDate = typeof date === 'string' ? dayjs( date ) : date

    return formattedDate.date()
  }

  static getAddDate (
    date: string,
    dateType: ManipulateType,
    idx: number
  ): Dayjs {
    const dayjs = DateUtil.getDayjs( date )

    return dayjs && dayjs.add( idx, dateType )
  }

  static getSubtractDate (
    date: string,
    dateType: ManipulateType,
    idx: number
  ) {
    const dayjs = DateUtil.getDayjs( date )

    return Object.keys( dayjs ).length !== 0 && dayjs.subtract( idx, dateType )
  }

  static getMonth ( date: string | Dayjs ): number {
    const data = typeof date === 'string' ? dayjs( date ) : date

    return data.month() + 1
  }

  static getDayOfMonth ( date: string, idx: number ): Dayjs | null {
    const dayjs = DateUtil.getDayjs( date )

    return Object.keys( dayjs ).length !== 0 ? dayjs.set( 'date', idx ) : null
  }

  static getLastDayOfMonth ( date: string ): number {
    const dayjs = DateUtil.getDayjs( date )

    return Object.keys( dayjs ).length !== 0 ? dayjs.daysInMonth() : 0
  }

  static getDayOfWeek ( date: string ): number {
    const dayjs = DateUtil.getDayjs( date )

    return Object.keys( dayjs ).length !== 0 ? dayjs.day() : 0
  }

  static getWeekOfMonth ( date: string ): number {
    const lastDayOfMonth = DateUtil.getLastDayOfMonth( date )
    const firstDayOfMonth = DateUtil.getDayOfMonth( date, 1 )
    const firstDayOfMonthDate = DateUtil.getDate( firstDayOfMonth as Dayjs )
    const dayOfWeek = DateUtil.getDayOfWeek( firstDayOfMonthDate || '' )

    return Math.ceil( ( dayOfWeek + lastDayOfMonth ) / 7 )
  }

  static getFormattedDate ( dayjs: Dayjs, formatType: string ): string | undefined {
    if ( typeof dayjs?.format === 'function' ) {
      return dayjs.isValid() ? dayjs.format( formatType ) : ''
    }
  }

  static validateDayjs ( date: string, dateFormat = DATE_UNIT ) {
    if ( date.length < 8 ) return false

    return dayjs( date, dateFormat, true ).isValid()
  }
}


export default DateUtil
