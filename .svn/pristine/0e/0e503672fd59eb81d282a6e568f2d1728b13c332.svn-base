import type { CudFlag } from '@/shared/constants/ag-grid/cudFlag'

export interface BaseGridData {
  cudFlag?: CudFlag
}

export type BaseModalProps<
  TParam = Record<string, unknown>,
  TConfirm = any,
  TCancel = any
> = {
  param?: TParam,
  onConfirm?: ModalOnConfirm<TConfirm>
  onCancel?: ModalOnCancel<TCancel>
}

export type ModalOnConfirm<TConfirm> = ( data?: TConfirm ) => void
export type ModalOnCancel<TCancel> = ( data?: TCancel ) => void

type DefaultPromiseHandlerType = ( ...args ) => Promise<void>
type DefaultHandlerType = ( ...args ) => void

// Re-export from subdirectories for convenience
export * from './store'
export * from './utils'
export * from './grid'
export * from './premitive'
export * from './constants'
export * from './app'
