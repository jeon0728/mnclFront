/* main */
import type { BaseModalProps } from '@/shared/types'
import type { DefineComponent } from 'vue'

export type MenuData = {
  menuId?: string
  menuNm?: string
  menuIcon?: string
  menuUrl?: string
  prntId?: number
  dispOrder?: string
  readYn?: string
  insYn?: string
  modYn?: string
  delYn?: string
  accYn?: string
  mngYn?: string
  children?: MenuData[]
}

export type ModalData<
  TParam = Record<string, unknown>,
  TConfirm = any,
  TCancel = any
> = BaseModalProps<TParam, TConfirm, TCancel> & {
  Component?: DefineComponent<BaseModalProps>
  options?: ModalOptions
  title?: string
  commonCodes?: Record<string, any>
  _id?: number
}

export type ModalOptions = {
  title?: string
  width: number | string
  height: number | string
  menuPath?: string
}

type MessageStore = {
  message: string,
  options?: MessageOptions,
  onConfirm?: () => void,
  onCancel?: () => void,
  onYes?: () => void,
  onNo?: () => void
  resolve?: ( value: any ) => void
}

type MessageType = 'info' | 'warning' | 'error' | 'question' | 'yesnocancel'

export type MessageOptions = {
  width?: number
  height?: number
  menuPath?: string
  type?: MessageType
  message?: string
  isBlurClose?: boolean
  title?: string
  renderContent? (): ReactElement
  renderButtons? (): ReactElement
}

type NotifyPosition = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight'
type NotifyType = 'success' | 'alert' | 'warning' | 'info' | 'none'

export interface NotifyItem {
  notifyId?: string
  icon?: string
  message?: string
  notClose?: boolean
  autoClose?: boolean
  type?: NotifyType
  position?: NotifyPosition
  /** 자동 닫힘 전 표시 시간(ms). 미지정 시 NotifyItem 컴포넌트 기본값 */
  durationMs?: number
}

interface NotificationsStore extends NotifyItem {
  position?: NotifyPosition
}

export type TabData = {
  key: string
  name: string
  path: string
  count?: number
  version?: number
  cacheKey?: number
  icon?: string
}

export type LoadingModalProps = {
  isOpen: boolean
  message?: string
  color?: string
  zIndex?: number
  isFocusOutClose?: boolean
}

export type Session = {
  userId?: string
  userNm?: string
  userDiv?: string
  userCustCd?: string
  userEmail?: string
  userNation?: string
  langCd?: string
  localeId?: string
  managerYn?: string
  grpSpcNm?: string
  corpId?: number
  corpNm?: string
  corpNation?: string
  corpCurr?: string
  corpCurrPoint?: number
  corpRoundTp?: string
  corpPerfCurr?: string
  corpWtPoint?: number
  corpCbmPoint?: number
  dataSourceId?: string
  corpVatRate?: number
  corpPerfCurrPoint?: number
  corpAcctMonth?: string
  corpNmEn?: string
  svcEdmsYn?: string
  svcUcYn?: string
  svcAnsYn?: string
  svcGwYn?: string
  svcBarobillCardYn?: string
  telNo?: string
  faxNo?: string

  /* 클라인언트에서만 관리 */
  whCd?: string
}

export type LinkParams = Record<string, any> & {
  type: string
}

export type CodeBoxParamType = {
  api?: string
  code?: string
  name?: string
  searchKeyword?: string
  pageSize: number
  initSearch?: boolean
  upperCase?: boolean
  maxLength?: number
  params?: Record<string, any>
  [ props: string ]: any
}

export type modalType = {
  title?: string
  cudFlag?: string
  width?: number
  height?: number
}

