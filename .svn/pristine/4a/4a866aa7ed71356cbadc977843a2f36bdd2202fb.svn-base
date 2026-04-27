import type { ButtonEmits, ButtonProps, ButtonSlots } from 'zenith-pulse-vue/lib/ui'

export type GsabisButtonProps = ButtonProps & {
  /** 버튼 유형(search, save, delete) */
  buttonType?: ButtonType
  /** 버튼 색상 */
  buttonVariant?: ButtonVariant
  /** 아이콘 */
  icon?: string
  /** 단축키 */
  shortcut?: boolean | ButtonProps[ 'shortcut' ]
  /** 로딩바 */
  loading?: boolean
  disabled?: boolean
}

export type GsabisButtonEmits = ButtonEmits & {
}

export type GsabisButtonSlots = ButtonSlots & {}


export type ButtonType = 'search' | 'save' | 'send' | 'add' | 'remove' | 'delete'
  | 'reset' | 'new' | 'excel' | 'print' | 'link' | 'select' | 'copy' | 'create' | 'attach'
  | 'register' | 'modify' | 'cancel' | 'filter' | 'upload' | 'download' | 'file'

export type ButtonVariant = 'transactional' | 'delete' | 'normal' | 'functional' | 'none' | 'excel' | 'filter'
export type ButtonHotkey = 'F2' | 'F3' | 'F4' | 'F5' | 'F6' | 'F8'