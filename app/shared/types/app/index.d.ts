import type { SourceData } from '@/shared/types/constants'

export interface SourceMap {
  [ key: string ]: SourceData[];
}

export interface CodeMap {
  busId: string
  divCd: string
  key?: string
  sysCdArray?: string[]
  notArray?: string[]
  sysCdWithStart?: string
}

export type CorpOptionsSearchParams = {
  key?: string
  busId: string
  optCd: string
}

export interface CorpOptionsMap {
  [ key: string ]: CorpOptionsData[];
}

export type CorpOptionsData = {
  busId: string
  optCd: string
  optValue: string
  wordId: string
}

