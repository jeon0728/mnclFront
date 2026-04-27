import type { InputWrapperProps } from 'zenith-pulse-vue'
import type { CodeBoxModalType } from '@/shared/ui/GsabisCodeBox/GsabisCodeBoxTypes'


export interface AsyncCodeBoxProps extends InputWrapperProps {
  modelValue?: string
  nameValue?: string
  readOnly?: boolean
  defaultValueExpress?: string
  defaultNameExpress?: string
  api?: string
  modalType?: CodeBoxModalType
  onlyPopup?: boolean
  noClearCode?: boolean
  initSearch?: boolean
  maxLength?: number
  displayValue?: string
  menuCode?: string
  title?: string
  modalWidth?: number | string
  modalHeight?: number | string
  valueNameType?: string
  upperCase?: boolean
  menuPath?: string
  pageSize?: number
  params?: Record<string, any>
  maxPopoverHeight?: string | number
  onComplete?( data: any ): void
}

export interface AsyncCodeBoxEmits {
  ( e: 'update:modelValue', value: string ): void
  ( e: 'change', event: { target: { value: string }, value: string } ): void
  ( e: 'complete', data: Record<string, any> ): void
  ( e: 'valueChanged', value: string, internal?: boolean ): void
}

export interface AsyncCodeBoxItemsProps {
  input: string
  hasIcon: boolean
  defaultValueExpress?: 'value' | 'name' | string
  defaultNameExpress?: 'name' | 'value' | string
  isSelectionCheck?: boolean

  setIsOpen ( isOpen: boolean ): void

  onClick ( data: Record<string, any> ): void
}

export interface AsyncCodeBoxItemProps {
  data: Record<string, any>
  defaultValueExpress?: 'value' | 'name' | string
  defaultNameExpress?: 'name' | 'value' | string
  isSelectionCheck?: boolean
  idx: number
  hasIcon: boolean
  isActive: boolean

  onClick ( data: Record<string, any> ): void
}

export interface UseFocusStore {
  focus: Ref<number>

  increment (): void

  decrement (): void

  clear (): void

  setFocus ( focus: number ): void

  getFocus (): number
}

export interface UseItemStore {
  items: Ref<Record<string, any>[]>

  setItems ( newItems: Record<string, any>[] ): void

  getItems (): Record<string, any>[]

  getItemByIndex ( idx: number ): Record<string, any> | undefined
}

export interface UseTagStore {
  tags: Ref<Record<string, any>[]>

  addTag ( tag: Record<string, any> ): void

  removeTag ( code: string ): void

  toggleTag ( tag: Record<string, any>, key: string ): void

  setTags ( tags: Record<string, any>[] ): void

  getTags (): Record<string, any>[]
}
