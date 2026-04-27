import { ValueGetter } from './index'

import type {
  AddOptionsMap,
  CellClassParams,
  CellEditorSelectorFunc,
  CellRendererSelectorFunc,
  CellRendererSelectorResult,
  CellStyle,
  CellStyleFunc,
  ColDef,
  ColGroupDef,
  EditableCallbackParams,
  ExcelStyle,
  GetMainMenuItems,
  GetMainMenuItemsParams,
  GridApi,
  GridCellParams,
  GridEditorComponentType,
  GridEditorCompTypeParams,
  GridRenderCompTypeParams,
  GridRendererCompType,
  ICellEditorParams,
  ICellRendererParams
} from './types'
import {
  AgAsyncCodeBoxEditor,
  AgAsyncCodeBoxRender,
  AgButtonRender,
  AgCheckRender,
  AgRadioRender,
  AgCustomGroupHeaderRender,
  AgCustomGroupRender,
  AgDateBoxEditor,
  AgDateBoxRender,
  AgFooterRender,
  AgNumberBoxEditor,
  AgSelectBoxEditor,
  AgSelectBoxRender,
  AgTextBoxEditor,
  AgTimeBoxEditor,
  AgTimeBoxRender
} from '@/shared/ui/ag-grid'
import ValueFormatter from '@/shared/utils/grid/value/ValueFormatter'
import type { GridOptions } from '@/shared/types/grid'

//추가 옵션 컬럼 세팅
const addOptionColumns: {
  statusColumn: string,
  checkColumn: string,
  rowNumberColumn: string,
  detailColumn: string,
  editPopupColumn: string
  suppressIconRender: boolean
} = {
  statusColumn: 'cudFlag',
  checkColumn: 'agCheck',
  rowNumberColumn: 'no',
  detailColumn: 'detail',
  editPopupColumn: 'editPopup',
  suppressIconRender: false
}

function processUpdateRow ( suppressUpdateRow: boolean | string[], field: string = '' ): boolean {
  if( typeof suppressUpdateRow === 'boolean') {
    return suppressUpdateRow
  } else if( Array.isArray( suppressUpdateRow ) ) {
    return suppressUpdateRow.includes( field )
  }

  return false
}

function checkFooter ( columnDefs: ColDef[] ): boolean {
  return columnDefs.some( colDef => colDef.children ? checkFooter( colDef.children ) : !!colDef.aggregation )
}

//추가 옵션 컬럼 세팅
function setAddOptionColumn<TData>( columnDefs: ColDef[], agOptions: GridOptions<TData>, addOptionsMap: AddOptionsMap ) {
  const { status, check, rowNumber, popupEditor, masterDetail: masterDetailOption } = addOptionsMap || {}
  const { statusColumn, rowNumberColumn, editPopupColumn, detailColumn } = addOptionColumns || {}
  const {  masterDetail } = agOptions

  //Status Column
  if( status ) {
    columnDefs.unshift(
      {
        field: statusColumn, headerName: 'Status',  width: 60, editable: false, pinned: 'left',
        resizable: false, sortable: false,
        suppressHeaderMenuButton: true, enableCellChangeFlash: false, suppressColumnsToolPanel: true,
        pivot: false, enablePivot: false, enableRowGroup: false, enableValue: false,
        cellRendererSelector: () => ({
          component: null
        }),
        cellStyle: { textAlign: 'center' }
      }
    )
  }

  //Ag Grid Original Check Column
  if( check ) {
    columnDefs.unshift(
      {
        pinned: 'left', width: 25, headerName: '', editable: false, suppressHeaderMenuButton: true,
        resizable: false, sortable: false,
        headerCheckboxSelection: true, headerCheckboxSelectionFilteredOnly: true, suppressColumnsToolPanel: true,
        pivot: false, enablePivot: false, enableRowGroup: false, enableValue: false,
        checkboxSelection: ( { node } ) => !node.group,
        // headerComponent: AgEmptyEditor,
        headerClass: 'ag-header-checkbox-center',
        cellClass: 'ag-cell-checkbox-center',
      },
    )
  }

  //Number Column
  if( rowNumber ) {
    columnDefs.unshift(
      {
        field: rowNumberColumn, headerName: 'No', width: 50, editable: false, pinned: 'left',
        resizable: false,
        sortable: false, suppressHeaderMenuButton: true, suppressColumnsToolPanel: true,
        pivot: false, enablePivot: false, enableRowGroup: false, enableValue: false,
        valueGetter: ValueGetter.indicate(),
        cellStyle: ( { node } ) => {
          const cellStyle = {
            textAlign: 'center',
            backgroundColor: '#f5f5f5'
          }
          return node?.rowPinned ? {} : cellStyle
        }
      }
    )
  }

  if( masterDetail ) {
    const { essentialFields = [] } = masterDetailOption || {}

    columnDefs.unshift(
      {
        field: detailColumn, headerName: '', width: 30, editable: false, pinned: 'left',
        resizable: false, sortable: false,
        suppressHeaderMenuButton: true, enableCellChangeFlash: false, suppressColumnsToolPanel: true,
        pivot: false, enablePivot: false, enableRowGroup: false, enableValue: false,
        headerComponent: AgCustomGroupHeaderRender,
        cellRendererSelector: ( param ) => {
          const { data } = param
          const noGroupRender = essentialFields.some( f => !data[ f ] )
          return {
            component: noGroupRender || AgCustomGroupRender,
          }
        },
        cellStyle: { textAlign: 'center' },
      },
    )
  }

  if ( popupEditor ) {
    const { height, width, title, buttons, pinned = 'right', columnCount = 2 } = popupEditor
    columnDefs.push(
      {
        field: editPopupColumn,
        width: 50,
        editable: false,
        suppressHeaderMenuButton: true,
        sortable: false,
        pinned,
        cellRendererSelector: () => ( {
          components: AgButtonRender,
          params: {}
        } ),
        cellRendererParams: ( params: ICellRendererParams ) => {
          const { data: gridData, api, node } = params
          return {
            props: { fontIcon: 'mdi-pencil-box-multiple-outline' },
            click: () => {

            }
          }
        },
        cellStyle: { textAlign: 'center' },
      },
    )
  }
}

function forEachColumnDefs<TData, TValue, TContext> (
  {
    columnDefs,
    defaultColDef,
    isFooter,
    suppressIconRender
  }
    :
    {
      columnDefs: (ColDef | ColGroupDef)[],
      defaultColDef: ColDef,
      isFooter: boolean,
      suppressIconRender?: boolean
    }
): ColDef[] {
  return columnDefs.map( ( colDef: ColDef ) => {
    const { children, cellType, tooltipValueGetter } = colDef
    if( children ) {
      colDef.children = forEachColumnDefs<TData, TValue, TContext>( { columnDefs: children, defaultColDef, isFooter, suppressIconRender } )
    }

    colDef = createComponentByCellType( colDef, defaultColDef, suppressIconRender )
    colDef = createTooltip( colDef )

    if( isFooter ) colDef = createFooter( { colDef, defaultColDef } )
    colDef = defaultFilterParam( { colDef } )

    return colDef
  } )
}

function createTooltip ( colDef: ColDef ): ColDef {
  const { tooltipValueGetter, cellType } = colDef
  if ( !tooltipValueGetter ) {
    colDef.tooltipValueGetter = cellType && toolTipFormattedType.includes( cellType as GridEditorComponentType )
      ? ValueGetter.valueFormatted()
      : ValueGetter.value()
  }

  return colDef
}

function createComponentByCellType<TData, TValue, TContext> (
  colDef: ColDef,
  defaultColDef: ColDef,
  suppressIconRender = false
): ColDef {
  const {
    cellEditorSelector, cellRendererSelector,
    valueFormatter, cellStyle, cellType, cellParams,
  } = colDef
  const editable = Object.keys( colDef ).includes( 'editable' ) ? colDef.editable : defaultColDef?.editable
  const isEditorComp = Object.keys( editorCompType ).includes( cellType )
  const isRendererComp = Object.keys( rendererCompType ).includes( cellType )

  if ( isEditorComp ) {
    const { component: editorComponent, formatterPropsName, textAlign } = editorCompType[ cellType ]
    if( editable ) {
      colDef.cellEditorSelector = ( editorParams: ICellEditorParams ) =>
        createCellEditorSelector<TData, TValue, TContext>( editorParams, editorComponent, cellParams, cellEditorSelector )
    }

    const { paramProps } = cellParams && cellParams( {} ) || { paramProps: {} }
    const valueFormatterByCellParams = valueFormatterType[ cellType ] || ( ( value: any ) => {} )
    colDef.valueFormatter = valueFormatter || valueFormatterByCellParams( paramProps[ formatterPropsName ] )
    colDef.cellStyle = { textAlign, ...cellStyle }

    colDef.cellClass = getCellClass( cellType, paramProps )
  }

  if ( isRendererComp && !suppressIconRender ) {
    const { component: renderComponent, onlyEditMode } = rendererCompType[ cellType ]

    if ( !onlyEditMode || editable ) {
      colDef.cellRendererSelector = ( renderParams: ICellRendererParams ) =>
        createRendererSelector<TData, TValue, TContext>(
          renderParams,
          renderComponent,
          cellParams,
          cellRendererSelector,
          colDef.cellStyle,
        )
    }
  }

  return colDef
}

const getCellClass = ( cellType: string, paramProps: any ) => {
  if( cellType === 'number' ) {
    const format = paramProps[ 'format' ]
    const points = format?.split('.') || []
    const [ , afterPoint = 0 ] = points
    return 'numberType' + afterPoint
  }

}

function createCellEditorSelector<TData, TValue, TContext> (
  editorParams: ICellEditorParams<TData, TValue, TContext>,
  editorComponent: any,
  cellParams: ( ( params: ( Partial<ICellEditorParams> | Partial<ICellRendererParams> ) ) => GridCellParams ),
  cellEditorSelector: CellEditorSelectorFunc<TData, TValue>
) {
  const { node: { isRowPinned, rowPinned } } = editorParams

  //footer setting
  if( rowPinned && isRowPinned() ) {
    return {}
  }

  const { component = editorComponent, params = cellParams, ...rest } =
    cellEditorSelector ? cellEditorSelector( editorParams ) : {}

  return {
    component,
    params: typeof params === 'function' ? params( editorParams ) : params,
    ...rest
  }
}

function createRendererSelector<TData, TValue, TContext> (
  renderParams: ICellRendererParams<TData, TValue, TContext>,
  renderComponent: any,
  cellParams: ( ( params: ( Partial<ICellEditorParams> | Partial<ICellRendererParams> ) ) => GridCellParams ),
  cellRendererSelector: CellRendererSelectorFunc<TData, TValue>,
  cellStyle: CellStyle | CellStyleFunc<TData, TValue>
) {
  const { component = renderComponent, params = cellParams, ...rest } =
    cellRendererSelector ? cellRendererSelector( renderParams ) : {}

  const { api, column, colDef, value, node, data, context } = renderParams
  const cellStyleParams: CellClassParams = {
    api, column, colDef, value, node, data, context, rowIndex: 0,
  }
  const { textAlign } = (typeof cellStyle === 'function' ? cellStyle( cellStyleParams ) : cellStyle) || {}
  const cellParamsResult = typeof params === 'function' ? params( renderParams ) : params
  return {
    component,
    params: { ...cellParamsResult, value, textAlign },
    ...rest
  }
}

const editorCompType: Record<GridEditorComponentType, GridEditorCompTypeParams> = {
  'code': { component: null, formatterPropsName: '', textAlign: 'center' },
  'text': { component: AgTextBoxEditor , formatterPropsName: '' },
  'asyncCode': { component: AgAsyncCodeBoxEditor, formatterPropsName: '' },
  'date': { component: AgDateBoxEditor, formatterPropsName: 'displayFormat', textAlign: 'center' },
  'number': { component: AgNumberBoxEditor, formatterPropsName: 'format', textAlign: 'right' },
  'select': { component: AgSelectBoxEditor, formatterPropsName: 'source', textAlign: 'center' },
  'mask': null,
  'time': { component: AgTimeBoxEditor, formatterPropsName: '', textAlign: 'center' },
}

const rendererCompType: Record<GridRendererCompType, GridRenderCompTypeParams> = {
  'buttonRender': { component: AgButtonRender },
  'select': { component: AgSelectBoxRender, onlyEditMode: true },
  'date': { component: AgDateBoxRender, onlyEditMode: true },
  'code': { component: null, onlyEditMode: true },
  'asyncCode': { component: AgAsyncCodeBoxRender, onlyEditMode: true },
  'checkRender': { component: AgCheckRender },
  'radioRender': { component: AgRadioRender },
  'time': { component: AgTimeBoxRender, onlyEditMode: true },
}

const valueFormatterType: Record<GridEditorComponentType, ( value: any ) => any> = {
  'code': undefined,
  'text': undefined,
  'asyncCode': undefined,
  'date': () => {
    return ValueFormatter.getDate( 'YYYYMMDD' )
  },
  'number': ( format: string ) => {
    const points = format?.split('.') || []
    const [ , afterPoint ] = points
    return ValueFormatter.getNumber( afterPoint?.length || 0 )
  },
  'select': ( sourceData: Record<string, any>[] ) => ValueFormatter.getDataName( sourceData || [], 'code' ),
  'mask': ( pattern: string ) => ValueFormatter.getPattern( pattern, true ) || undefined,
  'time': () => ValueFormatter.getTime(),
}


const toolTipFormattedType: GridEditorComponentType[] = [ 'date', 'number', 'select', 'mask' ]

function getLastDepsColumnDefs ( columnDefs: ColDef[], topLevelHeaderName = '' ): ColDef[] {
  const lastDepsColumnDefs: ColDef[] = []
  columnDefs.forEach( col => {
    const { children, headerName } = col
    if( children ) {
      lastDepsColumnDefs.push( ...getLastDepsColumnDefs( children, `${topLevelHeaderName} ${headerName}` ) )
    } else {
      col.headerName = `${topLevelHeaderName} ${headerName}`
      lastDepsColumnDefs.push( col )
    }
  })

  return lastDepsColumnDefs
}

function defaultFilterParam ( { colDef }: { colDef: ColDef } ) {
  const { valueFormatter, filterParams } = colDef
  const defaultFilterParams: Record<string, any> = {
    valueFormatter
  }

  colDef.filterParams = {
    ...defaultFilterParams,
    ...filterParams
  }

  return colDef
}

type CreateFooterParams = { colDef: ColDef, defaultColDef: ColDef }
type CellRendererSelectorWithFooter = ( params: ICellRendererParams ) => CellRendererSelectorResult
function createFooter ( { colDef, defaultColDef }: CreateFooterParams ): ColDef {
  const defColDefStyle = defaultColDef?.cellStyle || {}
  const defColDefEditable = defaultColDef?.editable || false

  let { editable } = colDef
  const { cellStyle, aggregation, cellRendererSelector } = colDef

  const cellRendererSelectorWithFooter: CellRendererSelectorWithFooter = ( params ) => {
    const { node, api } = params
    if( node.rowPinned ) {
      return {
        component: AgFooterRender,
        params: null
      }
    } else {
      const defaultCellRendererSelector =
        (typeof cellRendererSelector === 'function' ? cellRendererSelector( params ) : cellRendererSelector) || {}
      return { ...defaultCellRendererSelector }
    }
  }
  colDef.cellRendererSelector = cellRendererSelectorWithFooter

  if( editable === undefined || editable === null ) {
    editable = defColDefEditable
  }

  //Editable
  colDef.editable = ( params: EditableCallbackParams ): boolean => {
    const { node } = params
    return node.rowPinned ? false :
      typeof editable === 'function' ? editable( params ) : editable
  }

  // CellStyle
  const { cellStyle: aggregationStyle } = aggregation || {}
  colDef.cellStyle = ( params: CellClassParams ): Record<string, any> => {
    const { node } = params
    const wrapperCellStyle = ( typeof cellStyle === 'function' ? cellStyle( params ) : cellStyle ) || {}

    if( node.rowPinned ) {
      const wrapperAggregationStyle = ( typeof aggregationStyle === 'function' ? aggregationStyle( params ) : aggregationStyle ) || {}
      return { ...defColDefStyle, ...wrapperCellStyle, ...wrapperAggregationStyle }
    }
    return { ...defColDefStyle, ...wrapperCellStyle }
  }

  return colDef
}

function rowTraveling<TData = any> ( api: GridApi, item: TData, fnPredicate: any ) {
  if( !api ) return null
  const length = api.getDisplayedRowCount()
  for ( let i = 0; i < length; i++ ) {
    const rowNode = api.getDisplayedRowAtIndex( i )
    if ( fnPredicate( rowNode, item ) ) {
      return rowNode
    }
  }
  return null
}

const excelStyles = function (): ExcelStyle[] {
  return [
    {
      id: 'header',
      interior: {
        color: '#4CAF50', // 헤더 배경색 (초록색)
        pattern: 'Solid'
      },
      font: {
        color: '#FFFFFF', // 헤더 글자색 (흰색)
        bold: true
      },
      // borders: {
      //   borderBottom: {
      //     color: '#000000',
      //     lineStyle: 'Continuous',
      //     weight: 1
      //   }
      // }
    },
    {
      id: 'numberType',
      numberFormat: {
        format: '#,##0.###',
      },
    },
    {
      id: 'numberType0',
      numberFormat: {
        format: '#,##0',
      },
    },
    {
      id: 'numberType1',
      numberFormat: {
        format: '#,##0.0',
      },
    },
    {
      id: 'numberType2',
      numberFormat: {
        format: '#,##0.00',
      },
    },
    {
      id: 'numberType3',
      numberFormat: {
        format: '#,##0.000',
      },
    },
    {
      id: 'currencyFormat',
      numberFormat: {
        format: '#,##0.00 €',
      },
    },
    {
      id: 'negativeInBrackets',
      numberFormat: {
        format: '$[blue] #,##0;$ [red](#,##0)',
      },
    },
    {
      id: 'booleanType',
      dataType: 'Boolean',
    },
    {
      id: 'stringType',
      dataType: 'String',
    },
    {
      id: 'dateType',
      dataType: 'DateTime',
      numberFormat: {
        format: 'yyyy-MM-dd'
      }
    },
  ]
}

function getMainMenuItems<TData, TContext>( params: GetMainMenuItemsParams<TData, TContext> ): ReturnType<GetMainMenuItems<TData, TContext>> {
  const addItems: ReturnType<GetMainMenuItems<TData, TContext>> =
    params.defaultItems.slice(0)
  addItems.unshift(
    'pinSubMenu',
    'separator'
  )
  addItems.push( {
    name: 'Reset Filters',
    action: () => {
      const allColumns = params.api.getColumns()
      allColumns.forEach( column => { params.api.destroyFilter( column ) } )
    }
  } )

  return addItems
}

/**
 * 컬럼 정의에서 children이 없는 리프 컬럼만 추출
 * @param columnDefs 전체 컬럼 정의 배열
 * @returns children이 없는 리프 컬럼 배열
 */
export function getLeafColumns<TData = any>(
  columnDefs: (ColDef<TData> | ColGroupDef<TData>)[]
): ColDef<TData>[] {
  const leafColumns: ColDef<TData>[] = []

  const extractLeafColumns = (cols: (ColDef<TData> | ColGroupDef<TData>)[]) => {
    cols.forEach(col => {
      if ('children' in col && col.children) {
        extractLeafColumns(col.children)
      } else {
        leafColumns.push(col as ColDef<TData>)
      }
    })
  }

  extractLeafColumns(columnDefs)
  return leafColumns
}

/**
 * 네비게이션 가능한 컬럼만 필터링 (리프 컬럼 중 편집 가능하고 제외되지 않은 컬럼)
 * @param columnDefs 전체 컬럼 정의 배열
 * @param excludeFields 제외할 필드 배열
 * @returns 네비게이션 가능한 컬럼 배열
 */
export function getNavigableColumns<TData = any>(
  columnDefs: (ColDef<TData> | ColGroupDef<TData>)[],
  excludeFields: string[] = []
): ColDef<TData>[] {
  const leafColumns = getLeafColumns(columnDefs)
  const defaultExcludeFields = [
    addOptionColumns[ 'statusColumn' ], addOptionColumns[ 'checkColumn' ], addOptionColumns[ 'rowNumColumn' ],
    ...excludeFields
  ]
  return leafColumns.filter(colDef => {
    if (excludeFields.includes(colDef.field as string)) return false
    if (colDef.editable === false) return false

    return true
  })
}


export {
  addOptionColumns,
  processUpdateRow,
  checkFooter,
  setAddOptionColumn,
  forEachColumnDefs,
  rowTraveling,
  excelStyles,
  getMainMenuItems,
  getLastDepsColumnDefs
}
