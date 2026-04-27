import { DateTimeFormatter } from '@js-joda/core'

export interface CloneOptions {
  suppressRecursionKeys?: string[]
}

export interface Decimal {
  readonly minFrac: number,
  readonly maxFrac: number,
  readonly posPre: string,
  readonly posSuf: string,
  readonly negPre: string,
  readonly negSuf: string,
  readonly gSize: number,
  readonly lgSize: number,
}

export interface Currency {
  readonly CURRENCY_SYM: string,
  readonly minFrac: number,
  readonly maxFrac: number,
  readonly posPre: string,
  readonly posSuf: string,
  readonly negPre: string,
  readonly negSuf: string,
  readonly gSize: number,
  readonly lgSize: number,
}

export interface NumberFormat {
  readonly GROUP_SEP: string,
  readonly DECIMAL_SEP: string,
  readonly DECIMAL: Decimal,
  readonly CURRENCY: Currency,
}

export interface RecordDateUtil {
  readonly DateTimeFormatter: Record<string, any>,
  readonly FORMAT_YYYYMMDD: DateTimeFormatter,
  readonly FORMAT_YYYYMM: DateTimeFormatter,
  readonly FORMAT_YYYY: DateTimeFormatter,
  readonly FORMAT_MM: DateTimeFormatter,
  readonly FORMAT_YYYY_MM_DD: DateTimeFormatter,
  readonly FORMAT_YYYY_MM: DateTimeFormatter,
  readonly FORMAT_STANDARD: DateTimeFormatter,
  readonly setLastDay: ( month: string, year: string ) => number,
  readonly formatDate: ( value: string, inputPattern: string, outputPattern: string ) => string,
  readonly stringToLocalDate: ( value: string ) => string,

  [ arg: string ]: any
}

