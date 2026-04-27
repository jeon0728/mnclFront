import { GridApi, type GridState, type ICellEditorParams, type ICellRendererParams } from 'ag-grid-community'

export * from 'ag-grid-community'

export type GridAdapterOptions = {
  api?: GridApi | undefined
  addOptionsMap?: AddOptionsMap
}

export type GridModels<TData> = {
  setModelData: SetGridModelData<TData>

  footerData: TData[]
  setFooterData: SetGridModelData<TData>

  stateData: Record<string, TData>
  setStateData: SetStateData<TData>

  isResetStateData: boolean
  setIsResetStateData( isResetStateData: boolean ): void
}
export type SetGridModelData<TData> = ( data: TData[] ) => void
export type SetStateData<TData> = ( data: Record<string, TData>, isInit?: boolean ) => void
export type SetGridSate = ( state: GridState ) => void

export type AddOptionsMap = {
  isAggFooter?: boolean | undefined
  footer?: boolean
  rowNumber?: boolean
  check?: boolean
  status?: boolean
  suppressUpdateRow?: boolean | string[]
  popupEditor?: popupEditor
  suppressIconRender?: boolean
  masterDetail?: {
    essentialFields: string[]
  }
}

type popupEditor = {
  title?: string
  width?: number
  height?: number
  columnCount?: number
  pinned?: 'left' | 'right'
  buttons?: PopupButtons
}

type PopupButtons = {
  name: string
  color?: string
  type?: string
  isClose?: boolean
  onClick: ( data: any ) => void
}

export interface Aggregation {
  type: 'sum' | 'avg' | 'min' | 'max' | 'custom'
  decimalPoint?: number
  text?: string
  cellStyle?: Record<string, any> | ( ( params ) => Record<string, any> )
}

export interface AgRow {
  data: any
  index: number
}

declare module 'ag-grid-community' {
  interface ColDef<TData, TValue> {
    aggregation?: Aggregation
    children?: ColDef[]
    cellType?: GridEditorComponentType | GridRendererCompType
    cellParams?<TProps = any>(
      params: Partial<ICellEditorParams<TData, TValue>> | Partial<ICellRendererParams<TData, TValue>>
    ): GridCellParams<TProps> | GridCellParams
    cellItems?: Array<any>
    popupOptions?: GridPopupOptions
  }

  interface GridOptions {
    contextMenuType?: string
    suppressUpdateRow?: boolean
    status?: boolean
    addOptionsMap?: Record<string, any>
  }

  interface GridApi {
    checkCount?: number
    allCheck?: boolean

    cacheUpdate? (): any
  }

  interface ICellEditor {
    setValue?( value: any ): void
  }

  interface IToolPanel  {
    setColumnLayout?: ( colDefs: ColDef[] ) => void
  }
}

export interface StateItem {
  groupId: string
  open: boolean
}


export type GridEditorComponentType = 'text' | 'number' | 'select' | 'date' | 'code' | 'mask' | 'time' | 'asyncCode'
export type GridRendererCompType = 'buttonRender' | 'checkRender' | 'select' | 'date' | 'code' | 'time' | 'asyncCode' | 'radioRender'
export type GridEditorCompTypeParams = {
  component: any
  formatterPropsName: string
  textAlign?: string
}
export type GridRenderCompTypeParams = {
  component: any
  onlyEditMode?: boolean
}
export type GridCellParams<TProps = any> = {
  paramProps: TProps
  [ key: string ]: any
}

export type GridPopupOptions = {
  colSpan?: number
  rowSpan?: number
  group?: string
  hide?: boolean
  readonly?: boolean
}

