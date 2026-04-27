import type { GridOptions, ICellEditorParams } from 'ag-grid-community'
import { GridAdapter } from '@/shared/utils'

export interface CustomAgGridProps<TData = any> extends GridOptions<TData> {
  gridOptions?: GridOptions<TData>
}

export interface CustomAgGridEmits<TData = any> {
  /** gridAdapter */
  ( e: 'gridAdapter', gridAdapter: GridAdapter<TData> ): void
}

export interface AgGridCellEditorParams<TProps, TData = any> extends AgEditorWrapperProps<TProps, TData> {
}

export interface AgEditorWrapperProps<TProps = any, TData = any> {
  params: ICellEditorParams<TData> & {
    paramProps: TProps
  }
}

export interface AgGridCellRenderParams<TProps, TData = any> extends AgRenderWrapperProps<TProps, TData> {
}

export interface AgRenderWrapperProps<TProps = any, TData = any> {
  params: ICellEditorParams<TData> & {
    paramProps: TProps
  }
}

