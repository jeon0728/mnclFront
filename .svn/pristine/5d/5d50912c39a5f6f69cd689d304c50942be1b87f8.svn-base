import { read, utils, type WorkBook, writeFile } from 'xlsx'

class ExcelUtil {
  private importData: Array<any>
  private columnDefs: Record<string, any>
  private startIndex: number

  constructor() {
  }

  setBinaryData( binaryData: Array<any> ): this {
    this.importData = binaryData
    return this
  }

  setColumnDefs( columnDefs: Record<string, any> ): this {
    this.columnDefs = columnDefs
    return this
  }

  setStartIndex( startIndex: number ): this {
    this.startIndex = startIndex
    return this
  }

  convertDataToWorkbook(): WorkBook {
    const data = new Uint8Array( this.importData )
    const arr = []

    for ( let i = 0; i !== data.length; ++i ) {
      arr[ i ] = String.fromCharCode( data[ i ] )
    }

    const bstr = arr.join( '' )

    return read( bstr, { type: 'binary' } )
  }

  getExcelDataToJson(): any[] {
    const workbook = this.convertDataToWorkbook()
    const columnDefs = this.columnDefs
    const firstSheetName: string = workbook.SheetNames[ 0 ]
    const worksheet = workbook.Sheets[ firstSheetName ]
    const rowData: any[] = []
    let rowIndex = this.startIndex || 2

    while ( worksheet[ 'A' + rowIndex ] ) {
      const row = {}
      columnDefs.forEach( col => {
        const { excelHeader, field } = col
        if ( excelHeader ) {
          row[ field ] = worksheet[ excelHeader + rowIndex ].w
        }
      } )

      rowData.push( row )
      rowIndex++
    }

    return rowData
  }

  static exportCSV( options: Record<string, any> ): void {
    const { fileName, sheetName = 'sheet1', data } = options

    if ( data.length === 0 ) return

    const wb = utils.book_new()
    const ws = utils.json_to_sheet( data )

    utils.book_append_sheet( wb, ws, sheetName )
    writeFile( wb, `${ fileName }.csv` )
  }
}

export default ExcelUtil
