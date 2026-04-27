import GridFooter from './GridFooter'
import { CUD_FLAG_CREATE, CUD_FLAG_DELETE, CUD_FLAG_UPDATE } from '@/shared/constants/ag-grid/cudFlag'
import {
  addOptionColumns,
  checkFooter,
  excelStyles,
  forEachColumnDefs,
  getMainMenuItems,
  getNavigableColumns,
  processUpdateRow,
  rowTraveling,
  setAddOptionColumn
} from './GridUtils'
import { NumberUtil } from '../premitive'
import type {
  AddOptionsMap,
  CellPosition,
  CellValueChangedEvent,
  ColDef,
  ColGroupDef,
  Column,
  ColumnPinnedType,
  ColumnState,
  ExcelExportParams,
  GridAdapterOptions,
  GridApi,
  GridModels,
  GridOptions,
  IRowNode,
  ManagedGridOptionKey,
  ManagedGridOptions,
  RedrawRowsParams,
  RefreshCellsParams,
  RowNodeTransaction,
  StateItem,
} from './types'
import GridExcel from './GridExcel'
import GridState from './GridState'
import { AG_GRID_LOCALE_KR } from '@ag-grid-community/locale'
import type { ProcessCellForExportParams, ValueFormatterParams } from 'ag-grid-community'

class GridAdapter<TData extends { [ key: string ]: any } = any> {
  private readonly _addOptions: AddOptionsMap
  private readonly _gridRef: any
  private _cache: GridState<TData>
  private readonly _footerInstance: GridFooter<TData>
  private readonly _models: GridModels<TData>
  private _gridAdapterId: string
  private _isInit = false

  constructor (
    options: GridAdapterOptions | undefined,
    models: GridModels<TData>,
    gridRef: any
  ) {
    if ( options ) {
      const { addOptionsMap } = options

      const { isAggFooter } = addOptionsMap || {}
      this._addOptions = addOptionsMap || {}
      this._gridRef = gridRef

      const { stateData, setStateData, footerData, setFooterData } = models
      this._cache = new GridState( stateData, setStateData )
      this._footerInstance = isAggFooter ? new GridFooter( this, { footerData, setFooterData } ) : null

      this._models = models
      // this.init()
    }
  }

  private _onCellValueChanged ( e: CellValueChangedEvent<TData> ) {
    const { node, colDef } = e
    const { aggregation, field } = colDef
    const { suppressUpdateRow } = this._addOptions
    if ( node.rowPinned ) return

    if ( !processUpdateRow( suppressUpdateRow, field ) ) {
      this.updateCache( node )
    }

    this._footerInstance?.refreshFooterOnlyField( aggregation, field )
  }

  private _onFilterChanged (): void {
    this.refreshFooter()
  }

  private _cellKeyDown ( params: any ) {
    const event = params.event as KeyboardEvent
    const { api, column, rowIndex } = params
    if( event.key === 'Enter' ) {
      event.preventDefault()

      // const editingCells = api.getEditingCells()
      // const isCurrentCellEditing = editingCells.some( cell =>
      //   cell.rowIndex === rowIndex && cell.column.getColId() === column.getColId()
      // )
      //
      // // 편집 모드가 아니면 현재 셀을 편집 모드로 진입
      // if( !isCurrentCellEditing ) {
      //   // 현재 컬럼이 편집 가능한지 체크
      //   const colDef = column.getColDef()
      //   const isEditable = typeof colDef.editable === 'function' ? colDef.editable( params ) : colDef.editable
      //
      //   if( isEditable ) {
      //     params.api.startEditingCell( {
      //       rowIndex: rowIndex,
      //       colKey: column.getColId()
      //     } )
      //     return true
      //   }
      // }

      const columnDefs = getNavigableColumns( api.getColumnDefs() as ColDef<TData>[] )
      const currentColumnIndex = columnDefs.findIndex( colDef => colDef.field === column.getColDef().field )

      let moveIndex = 1
      let nextColumn = columnDefs[ currentColumnIndex + moveIndex ]
      const getEditable = ( editable ) => typeof editable === 'function' ? editable?.( params ) : editable

      // 같은 행의 다음 컬럼으로 이동 ( 숨겨진 컬럼은 건너뜀 )
      while ( nextColumn && ( nextColumn.hide || !getEditable( nextColumn?.editable ) ) ) {
        moveIndex++
        nextColumn = columnDefs[ currentColumnIndex + moveIndex ]
      }

      if( nextColumn ) {
        api.setFocusedCell( rowIndex, nextColumn.field )
        api.startEditingCell( {
          rowIndex: rowIndex,
          colKey: nextColumn.field
        } )
      } else {
        // 마지막 컬럼이면 다음 행의 첫 번째 컬럼으로 이동
        const nextRowIndex = rowIndex + 1
        const firstColumn = columnDefs.find( ( c ) => getEditable( c?.editable ) )
        api.setFocusedCell( nextRowIndex, firstColumn.field )
        api.startEditingCell( {
          rowIndex: nextRowIndex,
          colKey: firstColumn.field
        } )
      }
    }
  }

  init () {
    this.getApi()?.addEventListener( 'cellValueChanged', this._onCellValueChanged.bind( this ) )
    this.getApi()?.addEventListener( 'filterChanged', this._onFilterChanged.bind( this ) )
    this.getApi()?.addEventListener( 'cellKeyDown', this._cellKeyDown.bind( this ) )
  }

  keyDownAddRow ( lastField: string, fnCallback: any, firstColumn: string ) {
    this.getApi()?.addEventListener( 'cellKeyDown', ( e: any ) => {
      if ( e.event.keyCode === 13 || e.event.keyCode === 9 ) {
        if ( e.colDef.field === lastField && e.node.rowIndex === e.api.getDisplayedRowCount() - 1 ) {
          if ( fnCallback ) {
            fnCallback()
          } else {
            const addedRowNode = this.addItem( null )
            this.setFocusedCellByRowIndex( addedRowNode.rowIndex, firstColumn, true )
          }
        }
      }
    } )
  }

  getApi (): GridApi {
    if( !this._gridRef?.api ) return null
    if( !this._isInit ) {
      this._gridRef?.api.addEventListener( 'cellValueChanged', this._onCellValueChanged.bind( this ) )
      this._gridRef?.api.addEventListener( 'filterChanged', this._onFilterChanged.bind( this ) )
      this._gridRef?.api.addEventListener( 'cellKeyDown', this._cellKeyDown.bind( this ) )
      this._isInit = true
    }
    return this._gridRef?.api
  }

  getColumnApi () {
    return this._gridRef?.api
  }

  getGridAdapterId () {
    return this._gridAdapterId
  }

  createGridAdapterId () {
    this._gridAdapterId = crypto.randomUUID()
  }

  setGridOptions ( key: ManagedGridOptionKey, value: any ) {
    this.getApi()?.setGridOption( key, value )
  }

  updateGridOptions ( options: ManagedGridOptions ) {
    this.getApi()?.updateGridOptions( options)
  }


  getColumn ( columnField: keyof TData ): Column<TData> {
    return this.getColumnApi()?.getColumn( columnField )
  }

  getColDef ( columnField: keyof TData ): ColDef<TData> {
    const column = this.getColumn( columnField )
    return column?.getColDef()
  }

  setColumnVisible ( colKey: keyof TData | Column, visible: boolean ) {
    this.getColumnApi()?.setColumnVisible( colKey as string, visible )
  }

  setColumnsVisible ( colKeys: Array<keyof TData | Column>, visible: boolean ) {
    colKeys.forEach( colKey => {
      this.setColumnVisible( colKey, visible )
    } )
  }

  setColumnEditable ( columnField: keyof TData, value: any ) {
    this.setColumnsEditable( [ columnField ], value )
  }

  setColumnsEditable ( editableColumns: (keyof TData)[], value: any ) {
    editableColumns.forEach( column => {
      const colDef = this.getColDef( column )
      if ( colDef ) {
        colDef.editable = value
      }
    } )
  }

  setFilter ( filter: any ) {
    this.getApi()?.setFilterModel( filter )
  }

  clearFilter () {
    this.getApi()?.setFilterModel( null )
  }

  setHeaderName ( columnField: keyof TData, headerName: string ) {
    const colDef = this.getColDef( columnField )
    if ( !colDef ) return
    colDef.headerName = headerName
    this.getApi()?.refreshHeader()
  }

  validateColumns ( essentialColumns: (keyof TData)[], func: ( retList: any[] ) => void ): boolean {
    const cache = this._cache.getCache()
    let validCheck = true
    const retList: { rowIndex: string, columnsName: string }[] = []

    for ( const id in cache ) {
      const IRowNode = this.rowNodeById( id )
      if ( !IRowNode ) continue
      const { rowIndex, data } = IRowNode
      const essentialColumnName: string[] = []

      essentialColumns.forEach( colNm => {
        const colDef = this.getColDef( colNm )
        if ( colDef ) {
          const { field, headerName } = colDef
          const value = data[ field ]
          if ( !value ) {
            essentialColumnName.push( headerName )
          }
        }
      } )

      if ( essentialColumnName.length > 0 ) {
        validCheck = false
        retList.push( {
          rowIndex: String( rowIndex + 1 ),
          columnsName: essentialColumnName.join( ', ' )
        } )
      }

    }

    func.call( this, retList )

    return validCheck
  }

  validateCheckedColumnsCache ( essentialColumns: (keyof TData)[], func: ( retList: any[] ) => void ): boolean {
    const cache = this._cache.getCache()
    let validCheck = true
    const retList: { rowIndex: string, columnsName: string }[] = []

    for ( const id in cache ) {
      const IRowNode = this.rowNodeById( id )

      if ( IRowNode.isSelected() ) {
        if ( !IRowNode ) continue
        const { rowIndex, data } = IRowNode
        const essentialColumnName: string[] = []

        essentialColumns.forEach( colNm => {
          const colDef = this.getColDef( colNm )
          if ( colDef ) {
            const { field, headerName } = colDef
            const value = data[ field ]
            if ( !value ) {
              essentialColumnName.push( headerName )
            }
          }
        } )

        if ( essentialColumnName.length > 0 ) {
          validCheck = false
          retList.push( {
            rowIndex: `${ rowIndex + 1 }`,
            columnsName: essentialColumnName.join( ', ' )
          } )
        }
      }
    }

    func.call( this, retList )

    return validCheck
  }

  removeRowColumns ( removeRowColumns: (keyof TData)[], condition: 'and' | 'or' = 'or' ): void {
    const cache = this._cache.getCache()

    for ( const props in cache ) {
      const IRowNode = this.rowNodeById( props )
      if ( !IRowNode ) continue
      const { data } = IRowNode
      const removeRowChk: boolean[] = []

      for ( const index in removeRowColumns ) {
        const colNm = removeRowColumns[ index ]
        const colDef = this.getColDef( colNm )
        if ( !colDef ) continue
        const value = data[ colDef.field ]

        removeRowChk.push( !!value )
      }

      if( condition === 'and' ) {
        const isRemove = !removeRowChk.some( f => f )
        isRemove && this.removeItem( data )
      } else {
        const isRemove = removeRowChk.some( f => f )
        isRemove && this.removeItem( data )
      }

    }
  }

  idOf ( item: any ) {
    const findRowNode = this.traveling( item, ( IRowNode, item ) => {
      return IRowNode.data === item
    } )
    return findRowNode ? findRowNode.id : null
  }

  rowIndexOf ( item: any ) {
    const findRowNode = this.traveling( item, ( IRowNode, item ) => {
      return IRowNode.data === item
    } )
    return findRowNode ? findRowNode.rowIndex : null
  }

  byId ( id: string ) {
    return this.rowNodeById( id )?.data
  }

  byRowIndex ( rowIndex: number ) {
    return this.rowNodeByRowIndex( rowIndex )?.data
  }

  rowNodeById ( id: string ) {
    return this.getApi()?.getRowNode( id )
  }

  rowNodeByRowIndex ( rowIndex: number ): IRowNode<TData> {
    return this.getApi()?.getDisplayedRowAtIndex( rowIndex )
  }

  forEach ( fnConsumer: ( data: any, index?: number ) => void ) {
    this.forEachNode( ( rowNode: IRowNode<TData>, index: number ) => fnConsumer( rowNode.data, index ) )
  }

  forEachNode ( fnConsumer: ( rowNode: IRowNode<TData>, index?: number ) => void, includeFooterNodes?: boolean ) {
    this.getApi()?.forEachNode( fnConsumer, includeFooterNodes )
  }

  forEachNodeAfterFilterAndSort ( fnConsumer: ( rowNode: IRowNode<TData>, index?: number ) => void ) {
    this.getApi()?.forEachNodeAfterFilterAndSort( fnConsumer )
  }

  forEachLeaf ( fnConsumer: ( data: TData, index?: number ) => void ) {
    this.forEachLeafNode( ( IRowNode ) => fnConsumer( IRowNode.data ) )
  }

  forEachLeafNode ( fnConsumer: ( rowNode: IRowNode<TData> ) => void ) {
    this.getApi()?.forEachLeafNode( fnConsumer )
  }

  traveling ( item: TData, fnPredicate: ( rowNode: IRowNode<TData>, item: any ) => boolean ): any {
    return rowTraveling( this.getApi(), item, fnPredicate )
  }

  clear (): void {
    this.setItems( [] )
  }

  getGroupRowNodes () {
    const results: IRowNode<TData>[] = []
    this.forEachLeafNode( row => results.push( row ) )
    return results
  }

  getGroupRows () {
    const results: TData[] = []
    this.forEachLeaf( row => results.push( row ) )
    return results
  }

  getRowNodes () {
    const results: IRowNode<TData>[] = []
    this.forEachNode( IRowNode => results.push( IRowNode ) )
    return results
  }

  getRows () {
    const results: TData[] = []
    this.forEach( row => results.push( row ) )
    return results
  }

  getColumnRowsForEach ( rows: TData[], columnFields: (keyof TData)[] ) {
    const results: TData[] = []

    rows.forEach( row => {
      const newRow: any = {}
      columnFields.forEach( columnField => {
        newRow[ columnField ] = row[ columnField ]
      } )
      results.push( newRow )
    } )

    return results
  }

  getColumnRows ( columnFields: (keyof TData)[] ) {
    const rows = this.getRows()
    return this.getColumnRowsForEach( rows, columnFields )
  }

  getSelectedColumnRows ( columnFields: (keyof TData)[] ) {
    const rows = this.getSelectedRows()
    return this.getColumnRowsForEach( rows, columnFields )
  }

  initCache (): void {
    this._cache?.init()
  }

  updateCache ( node: IRowNode<TData> ) {
    this._cache?.update( node )
    this.refreshCells( { rowNodes: [ node ], columns: [ addOptionColumns.statusColumn ] } )
  }

  setItems ( items: TData[], suppressInitCache = false ) {
    if ( !items || !this.getApi() ) return
    if ( !suppressInitCache ) this._cache.init()

    this.getApi()?.updateGridOptions( { rowData: items }  )
    if( this._models ) {
      this._models?.setModelData?.( items )
      this._models?.setStateData?.( null )
      this._models?.setFooterData?.( [] )
    }

    this.refreshFooter()
  }

  setItemsNotInitCache ( items: TData[] ): void {
    this.setItems( items, true )
  }

  getItems (): TData[] {
    return this._cache?.toArray()
  }

  getCudData (): Record<string, TData[]> {
    return {
      [ CUD_FLAG_CREATE ]: this._cache?.toArray( CUD_FLAG_CREATE ),
      [ CUD_FLAG_UPDATE ]: this._cache?.toArray( CUD_FLAG_UPDATE ),
      [ CUD_FLAG_DELETE ]: this._cache?.toArray( CUD_FLAG_DELETE )
    }
  }

  isCudChanged ( cudFlag: string ): boolean {
    let returnValue = false
    if ( cudFlag ) {
      returnValue = this._cache.toArray( cudFlag ).length > 0
    } else {
      returnValue = this._cache.toArray().length > 0
    }

    return returnValue
  }

  addItem ( item: TData ): IRowNode<TData> {
    const rowNodes = this.addItems( [ { ...item } ] )
    return rowNodes[ 0 ]
  }

  addItems ( items: TData[] ): IRowNode<TData>[] {
    this.stopEditing()
    if( !this.getApi() ) return

    const updated = this.getApi().applyTransaction( { add: items } )
    const rowNodes = updated.add
    if ( rowNodes && rowNodes.length > 0 ) {
      rowNodes.forEach( node => this._cache.insert( node ) )
      this._models?.setModelData?.( this.getRows() )
    }

    this.refreshFooter()
    return rowNodes
  }

  insertItem ( item: TData, index: number ): IRowNode<TData> {
    const rowNodes = this.insertItems( [ { ...item } ], index )
    return rowNodes[ 0 ]
  }

  insertItems ( items: TData[], index = 0 ): IRowNode<TData>[] {
    this.stopEditing()
    if( !this.getApi() ) return

    const updated = this.getApi().applyTransaction( { add: items, addIndex: index } )
    const rowNodes = updated.add

    if ( rowNodes && rowNodes.length > 0 ) {
      rowNodes.forEach( node => this._cache.insert( node ) )
      this._models?.setModelData?.( this.getRows() )
    }

    this.refreshFooter()
    return rowNodes
  }

  updateItem ( item: TData ): IRowNode<TData> {
    const rowNodes = this.updateItems( [ item ] )
    return rowNodes[ 0 ]
  }

  updateItems ( items: TData[] ): IRowNode<TData>[] {
    this.stopEditing()
    if( !this.getApi() ) return

    const updated = this.getApi().applyTransaction( { update: items } )
    const rowNodes = updated.update

    if ( rowNodes && rowNodes.length > 0 ) {
      rowNodes.forEach( node => this._cache.update( node ) )
      this._models?.setModelData?.( this.getRows() )
    }
    this.refreshCells( { rowNodes, columns: [ addOptionColumns.statusColumn ] } )

    this.refreshFooter()

    return rowNodes
  }

  removeItem ( item: TData, flag?: boolean ): IRowNode<TData> {
    const rowNodes = this.removeItems( [ item ], flag )
    return rowNodes[ 0 ]
  }

  removeItems ( items: TData[], flag = true ): IRowNode<TData>[] {
    this.stopEditing()
    if( !this.getApi() ) return

    let updated: RowNodeTransaction
    let rowNodes: IRowNode[]

    if ( flag && this._addOptions.status ) {
      items.forEach( item => {
        if ( item[ addOptionColumns.statusColumn ] === CUD_FLAG_CREATE ) {
          updated = this.getApi().applyTransaction( { remove: [ item ] } )
          rowNodes = updated.remove
        } else {
          updated = this.getApi().applyTransaction( { update: [ item ] } )
          rowNodes = updated.update
        }
        if ( rowNodes && rowNodes.length > 0 ) {
          rowNodes.forEach( node => this._cache.remove( node ) )
          this._models?.setModelData?.( this.getRows() )
        }
      } )
    } else {
      updated = this.getApi().applyTransaction( { remove: items } )
      rowNodes = updated.remove

      if ( rowNodes && rowNodes.length > 0 ) {
        rowNodes.forEach( node => this._cache.remove( node ) )
        this._models?.setIsResetStateData( false )
        this._models?.setModelData?.( this.getRows() )
      }
    }

    this.refreshCells( { rowNodes, columns: [ addOptionColumns.statusColumn ] } )
    this.refreshFooter()

    return rowNodes
  }

  getSelectedRow (): TData {
    const rows = this.getSelectedRows()
    if ( rows.length > 0 ) {
      return rows[ 0 ]
    }
    return null
  }

  getSelectedRows (): TData[] {
    return this.getApi()?.getSelectedRows() || []
  }

  getSelectedNode (): IRowNode<TData> {
    const rows = this.getSelectedNodes()
    if ( rows.length > 0 ) {
      return rows[ 0 ]
    }
    return null
  }

  getSelectedNodes (): IRowNode<TData>[] {
    return this.getApi()?.getSelectedNodes() || []
  }

  getFocusedCell (): CellPosition {
    return this.getApi()?.getFocusedCell()
  }

  setFocusedCellById ( id: string, field: string, isStartEditing: boolean ): void {
    return this.setFocusedCellByRowNode( this.rowNodeById( id ), field, !!isStartEditing )
  }

  async setFocusedCellByRowIndex ( rowIndex: number, field: Column<keyof TData> | keyof TData, isStartEditing?: boolean ) {
    this.setFocusedCellByRowNode( this.rowNodeByRowIndex( rowIndex ), field as string, !!isStartEditing, api => {
      const lastRowIndex = api.getDisplayedRowCount() - 1
      if( lastRowIndex >= 0 ) {
        this.setFocusedCellByRowIndex( lastRowIndex, field, isStartEditing )
      }
    } )
  }

  setFocusedCellByRowNode ( rowNode: IRowNode<TData>, field: keyof TData | Column<keyof TData>, isStartEditing: boolean, fnFallback?: ( api: GridApi ) => void ): void {
    if( !this.getApi() ) return

    if ( rowNode ) {
      const { rowIndex } = rowNode

      this.setFocusedRow( rowIndex )
      this.getApi().setFocusedCell( rowIndex, field as string )
      if ( isStartEditing ) {
        this.stopEditing()
        this.startEditingCellByRowIndex( rowIndex, field as string )
      }
    } else {
      if ( typeof fnFallback === 'function' ) {
        fnFallback( this.getApi() )
      }
    }
  }

  clearFocusedCell (): void {
    this.getApi()?.clearFocusedCell()
  }

  startEditingCellById ( id: string, field: keyof TData | Column<keyof TData> ): void {
    this.startEditingCellByRowNode( this.rowNodeById( id ), field as string )
  }

  startEditingCellByRowIndex ( rowIndex: number, field: keyof TData | Column<keyof TData> ): void {
    this.startEditingCellByRowNode( this.rowNodeByRowIndex( rowIndex ), field as string )
  }

  startEditingCellByRowNode ( rowNode: IRowNode, field: keyof TData | Column<keyof TData> ): void {
    this.getApi()?.startEditingCell( { rowIndex: rowNode.rowIndex, colKey: field as string } )
  }

  stopEditing ( isCancel?: boolean ): void {
    this.getApi()?.stopEditing( !!isCancel )
  }

  ensureIndexVisible ( index: number, position?: ( 'middle' | 'top' | 'bottom' ) ): void {
    this.getApi()?.ensureIndexVisible( index, position )
  }

  exportExcel ( params: ExcelExportParams = {} ): void {
    const processCellCallback = ( cellParams: ProcessCellForExportParams ): any => {
      const { value, column } = cellParams
      const { valueFormatter, cellType } = column?.getColDef() || {}
      if(cellType === 'number') return value
      if( !valueFormatter ) return value

      const valueFormatterParams = cellParams as unknown as ValueFormatterParams
      return typeof valueFormatter === 'string' ? value : valueFormatter( { ...valueFormatterParams } )
    }
    this.getApi()?.exportDataAsExcel( { processCellCallback, ...params } )
  }

  getSheetDataForExcel ( params: ExcelExportParams = {} ): any {
    return this.getApi()?.getSheetDataForExcel( params )
  }

  setCellValue ( rowIndex: number, columnId: keyof TData | Column, value: any ): void {
    const rowNode = this.rowNodeByRowIndex( rowIndex )
    if ( rowNode ) rowNode.setDataValue( columnId as string, value )
  }

  getCellValue ( rowIndex: number, columnId: keyof TData ): any | null {
    const rowNode = this.rowNodeByRowIndex( rowIndex )
    if ( rowNode ) return rowNode.data[ columnId ]
    return null
  }

  setDataValue ( node: IRowNode<TData>, column: keyof TData, value: any ): void {
    const [ instance ] = this.getApi()?.getCellEditorInstances( { rowNodes: [ node ], columns: [ column as string ] } ) || []

    if ( !instance ) {
      node?.setDataValue?.( column as string, value )
      return
    }

    node.setDataValue?.( column as string, value )
    instance?.setValue?.( value )
  }

  setScrollByRowIndex ( rowIndex: number, position: ( 'middle' | 'top' | 'bottom' ) = 'top' ): void {
    rowIndex && this.getApi()?.ensureIndexVisible( rowIndex, position )
  }

  getFirstDisplayedRowIndex (): number {
    const firstRowIdx = this.getApi()?.getFirstDisplayedRowIndex() || 0
    return firstRowIdx === 0 ? firstRowIdx : firstRowIdx + 10
  }

  getFocusedRowIndex (): number {
    const focusedCell = this.getFocusedCell()
    return focusedCell.rowIndex
  }

  setFocusedRow ( rowIndex: number ): void {
    const rowNode = this.rowNodeByRowIndex( rowIndex )
    rowNode?.setSelected( true )
  }

  getRowCount (): number {
    return this.getApi()?.getDisplayedRowCount()
  }

  selectAll () {
    return this.getApi()?.selectAll()
  }

  refreshCells ( params: RefreshCellsParams<TData> ) {
    return this.getApi()?.refreshCells( params )
  }

  setColumnDefs ( colDefs: ColDef<TData, keyof TData>[], defaultColDef: ColDef<TData, keyof TData> = {}  ) {
    const { statusColumn, rowNumberColumn, detailColumn } = addOptionColumns
    const prevColumnDefs = this.getColumnDefs()
    if( !prevColumnDefs ) return

    const status = prevColumnDefs.some( ( col: ColDef ) => col.field === statusColumn )
    const rowNumber = prevColumnDefs.some( ( col: ColDef ) => col.field === rowNumberColumn )
    const masterDetail = prevColumnDefs.some( ( col: ColDef ) => col.field === detailColumn )

    setAddOptionColumn( colDefs, { masterDetail } ,{ status, rowNumber } )
    const isFooter = checkFooter( colDefs )
    if( isFooter ) {
      forEachColumnDefs<TData, any, any>( {
        columnDefs: colDefs,
        defaultColDef,
        isFooter: true
      } )
    }

    this.getApi()?.setGridOption( 'columnDefs', colDefs )
  }

  getColumnDefs (): ( ColDef<TData, keyof TData> | ColGroupDef<TData> )[] {
    return this.getApi()?.getColumnDefs()
  }

  redrawRows ( param: RedrawRowsParams<TData> ) {
    this.getApi()?.redrawRows( param )
  }

  setColumnPinned ( colKey: string | Column<keyof TData>, pinned: ColumnPinnedType ) {
    this.getColumnApi()?.setColumnPinned( colKey, pinned )
  }

  setColumnsPinned ( colKeys: ( string | Column<keyof TData> )[], pinned: ColumnPinnedType ) {
    this.getColumnApi()?.setColumnsPinned( colKeys, pinned )
  }

  moveColumn ( colKey: string | Column<keyof TData>, toIndex: number ) {
    this.getColumnApi()?.moveColumn( colKey, toIndex )
  }

  showLoadingOverlay () {
    this.getApi()?.showLoadingOverlay()
  }

  hideOverlay () {
    this.getApi()?.hideOverlay()
  }

  getCellStyle ( field: string ) {
    return this.getColDef( field )?.cellStyle
  }

  setCellStyle ( node: IRowNode<TData>, field: string, style: Record<string, any> | ( ( param: any ) => Record<string, any> ) ) {
    const coleDef = this.getColDef( field )
    coleDef.cellStyle = style
    this.redrawRows( { rowNodes: [ node ] } )
  }

  getClipboardToAddOutOfRows ( data: TData[] ): TData[] {
    const dataIndex = data.length
    const { rowIndex } = this.getApi().getFocusedCell() || {}
    const rowCount = this.getRowCount()
    const addedIndex = rowIndex + dataIndex - rowCount

    !data[ dataIndex - 1 ][ 0 ] && data.splice( dataIndex - 1, 1 )

    if ( addedIndex <= 0 ) return []

    return data.slice( rowCount - rowIndex )
  }

  setPinnedBottomRowData ( rowData: TData[] ) {
    this.getApi()?.setGridOption( 'pinnedBottomRowData', rowData )
  }

  refreshFooter () {
    this._footerInstance?.refreshFooter()
  }

  getFooterData (): TData {
    const [ firstRow ] = this.getFooterDatas()
    return firstRow || {}
  }

  getFooterDataAsNumber (): TData {
    const row = { ...this.getFooterData() }
    const returnRow: Record<string, any> = {}
    for ( const col in row ) {
      const colValue = row[ col ]
      if ( colValue && typeof colValue === 'string' ) {
        const beforeValue = colValue as string
        returnRow[ col ] = NumberUtil.changeNumberType( beforeValue )
      }
    }

    return { ...row }

  }

  getFooterDatas (): any[] {
    return this._footerInstance?.getGridFooterData() || []
  }

  getColumnState (): ColumnState[] {
    return this.getColumnApi()?.getColumnState()
  }

  applyColumnState ( savedState: ColumnState[] ) {
    return this.getColumnApi()?.applyColumnState( { state: savedState, applyOrder: true } )
  }

  resetColumnState () {
    this.getColumnApi()?.resetColumnState()
  }

  getColumnGroupState (): Record<string, any>[] {
    return this.getColumnApi()?.getColumnGroupState()
  }
  setColumnGroupState ( stateItems: StateItem[] ): void {
    this.getColumnApi()?.setColumnGroupState( stateItems )
  }
  setColumnGroupExpand ( expand: boolean ) {
    const columnGroupState = this.getColumnGroupState()
    if( !columnGroupState ) return
    const state = columnGroupState.map( ( { groupId } ) => ( {
      groupId, open: expand
    } ) )

    this.setColumnGroupState( state )
  }

  openToolPanel () {
    this.getApi()?.closeToolPanel()
  }

  closeToolPanel () {
    this.getApi()?.closeToolPanel()
  }

  setColumnToolPanel ( toolPanelColumnDefs: Record<string , any>[] ): void {
    const columnToolPanel = this.getApi()?.getToolPanelInstance( 'columns' )
    columnToolPanel?.setColumnLayout( toolPanelColumnDefs )
  }

  expandAll () {
    this.getApi()?.expandAll()
  }

  getState () {
    return this.getApi()?.getState()
  }

  collapseAll () {
    this.getApi()?.collapseAll()
  }

  createExcel (): GridExcel<TData> {
    return new GridExcel( this )
  }

  setRowGroupOn ( field: string ) {
    const columnDefs = this.getColumnDefs()

    if ( !columnDefs ) return

    columnDefs.forEach( ( colDef: ColDef ) => {
      colDef.rowGroup = colDef.field === field
    } )

    this.getApi().setGridOption( 'columnDefs', columnDefs )
  }

  setRowGroupOff () {
    const columnDefs = this.getColumnDefs()

    if ( !columnDefs ) return

    columnDefs.forEach( ( colDef: ColDef ) => {
      colDef.rowGroup = false
    } )
    this.getApi().setGridOption( 'columnDefs', columnDefs )
  }

  static of<TData> (
    options?: GridOptions<TData> | undefined,
    models?: GridModels<TData>,
    gridRef?: any
  ): GridAdapter<TData> {
    return new GridAdapter<TData>( options, { ...models }, gridRef )
  }

  static createGridOptions<TData> ( agOptionsMap: GridOptions<TData>, addOptionsMap: AddOptionsMap = {} ): GridOptions<TData> {
    const {
      columnDefs, contextMenuType, defaultColDef,
      popupParent: customPopupParent,
      processCellFromClipboard: customProcessCellFromClipboard,
      processDataFromClipboard: customProcessDataFromClipboard
    } = agOptionsMap

    let popupParent = customPopupParent

    if ( !customPopupParent && typeof document !== 'undefined' ) {
      popupParent = document.querySelector( 'body' )
    }

    if ( !customPopupParent && contextMenuType === 'popup' ) {
      const vApplication: HTMLDivElement | null = document.body.querySelector( 'div.zenith-app' )
      const dialogList: any = vApplication?.querySelectorAll( '.zenith-modal' )
      popupParent = dialogList[ dialogList.length - 1 ]
    }

    const defaultOptions: GridOptions<TData> = {
      rowSelection: 'single',
      popupParent,
      stopEditingWhenCellsLoseFocus: true,
      cellSelection: true,
      enableBrowserTooltips: true,
      excelStyles: excelStyles(),
      suppressNoRowsOverlay: true,
      getMainMenuItems: getMainMenuItems,
      suppressHeaderFocus: true,
      localeText: AG_GRID_LOCALE_KR,
      columnMenu: 'legacy',
      defaultColDef: {
        editable: false,
        sortable: true,
        resizable: true,
        filter: true,
        lockPinned: true,
        suppressHeaderFilterButton: true,
      },
      addOptionsMap: {},
      tabToNextHeader () {
        return {
          column: undefined,
          headerRowIndex: -1
        }
      },
      processCellFromClipboard ( params ) {
        return customProcessCellFromClipboard ? customProcessCellFromClipboard( params ) : params.value
      },
      processDataFromClipboard ( params ) {
        const { data } = params
        const wrapperData = customProcessDataFromClipboard ? customProcessDataFromClipboard( params ) : data
        const lastRow = wrapperData[ wrapperData.length - 1 ]
        const isLastRowFirstValue = lastRow.length === 1 && !lastRow[ 0 ]

        return isLastRowFirstValue ? wrapperData.slice( 0, -1 ) : wrapperData
      }
    }

    setAddOptionColumn( columnDefs, agOptionsMap, addOptionsMap )
    const { footer = false, suppressIconRender = false } = addOptionsMap || {}

    const isFooter = checkFooter( columnDefs ) || footer
    addOptionsMap.isAggFooter = isFooter

    agOptionsMap.columnDefs = forEachColumnDefs( { columnDefs, defaultColDef, isFooter, suppressIconRender } )
    defaultOptions.addOptionsMap = addOptionsMap
    defaultOptions.addOptionsMap = addOptionsMap

    const colDefOfAgOption = agOptionsMap.defaultColDef
    if ( colDefOfAgOption ) {
      const defaultColDef = defaultOptions.defaultColDef
      agOptionsMap.defaultColDef = { ...defaultColDef, ...colDefOfAgOption }
    }

    delete agOptionsMap.processCellFromClipboard
    delete agOptionsMap.processDataFromClipboard

    return { ...defaultOptions, ...agOptionsMap }
  }
}



export default GridAdapter
