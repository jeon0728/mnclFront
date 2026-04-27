import type { ReactElement } from 'react'

export type SourceData<
  TFilter01 = string,
  TFilter02 = string,
  TFilter03 = string,
  TFilter04 = string,
  TFilter05 = string
> = {
  code: string
  name: string

  icon?: string
  image?: string
  multiLang?: string
  filter01?: TFilter01
  filter02?: TFilter02
  filter03?: TFilter03
  filter04?: TFilter04
  filter05?: TFilter05
  filter06?: string
  filter07?: string
  renderIcon?(): ReactElement
  [ key: string ]: any
}

