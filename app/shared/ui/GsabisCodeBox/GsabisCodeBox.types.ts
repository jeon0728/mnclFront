import type { CodeBoxModalType } from '@/shared/ui/GsabisCodeBox/GsabisCodeBoxTypes'

export type GsabisCodeBoxProps = {
  modelValue?: string
  api?: string
  readOnly?: boolean
  modalType?: CodeBoxModalType
  onlyPopup?: boolean
  noClear?: boolean
  initSearch?: boolean
  maxLength?: number
  menuCode?: string
  title?: string
  modalWidth?: number | string
  modalHeight?: number | string
  valueNameType?: 'value' | 'name' | string
  upperCase?: boolean
  menuPath?: string
  pageSize?: number
  essential?: boolean
  inputAttributes?: Record<string, any>
  params?: Record<string, any>
  renderButton?: () => any
}

export type GsabisCodeBoxEmits = {
  ( e: 'update:modelValue', v: string ): void;
  ( e: 'input', event: InputEvent ): void;
  ( e: 'change', event: any ): void;
  ( e: 'valueChanged', v: string ): void;
  ( e: 'complete', param: Record<string, any> ): void;
  ( e: 'keydown', event: KeyboardEvent ): void;
  ( e: 'focus', event: FocusEvent ): void;
  ( e: 'focusout', event: FocusEvent ): void;
  ( e: 'resolved', result: any, input: string ): void;
  ( e: 'rejected', error: unknown, input: string ): void;
}

export type CodeBoxTypeProps = {
  api?: string,
  menuCode?: string,
  menuPath?: string,
  width?: number,
  height?: number,
  params?: Record<string, any>
  props?: any
  title?: string
  [ key: string ]: any
}

