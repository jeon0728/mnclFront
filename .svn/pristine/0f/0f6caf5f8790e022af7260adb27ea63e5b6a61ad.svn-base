import type { CodeBoxTypeProps } from './GsabisCodeBox.types'
import { type CodeBoxModalType, codeBoxTypes } from './GsabisCodeBoxTypes'

export const getDefaultModalType = ( modalType: CodeBoxModalType ): CodeBoxTypeProps => {
  return codeBoxTypes[ modalType ] ? codeBoxTypes[ modalType ]() : {}
}
