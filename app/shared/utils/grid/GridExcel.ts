import type { ColDef } from 'ag-grid-community'
import { ExcelUtil } from '../premitive'
import GridAdapter from './GridAdapter'

class GridExcel<TData> {
  private _gridAdapter: GridAdapter<TData>

  constructor( gridAdapter: GridAdapter<TData> ) {
    this._gridAdapter = gridAdapter
  }

  /********************** Import Excel ******************/
  importExcel( binaryData, columnDefs: ColDef[], setStartIndex: number ) {
    const excelJson = new ExcelUtil()
      .setBinaryData( binaryData )
      .setColumnDefs( columnDefs )
      .setStartIndex( setStartIndex )
      .getExcelDataToJson()

    this._gridAdapter.addItems( excelJson )
  }
}

export default GridExcel
