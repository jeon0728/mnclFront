import { NumberUtil } from '../premitive'
import GridAdapter from './GridAdapter'
import type { Aggregation, ColDef, SetGridModelData } from './types'

function getAggregationType ( aggregation: Aggregation ): string {
  let aggType
  if ( typeof aggregation === 'string' ) {
    aggType = aggregation
  } else if ( typeof aggregation === 'object' ) {
    aggType = aggregation.type
  }

  return aggType?.toUpperCase() || ''
}

type FooterModels<TData> = {
  footerData: TData[],
  setFooterData: SetGridModelData<TData>
}

class GridFooter<TData = any> {
  private _gridAdapter: GridAdapter<TData>
  private _gridFooterData: TData[]
  private _models: FooterModels<TData>

  constructor ( gridAdapter: GridAdapter<TData>, models: FooterModels<TData> ) {
    this._gridAdapter = gridAdapter
    this._gridFooterData = []

    this._models = models
  }

  getGridFooterData (): TData[] {
    return this._gridFooterData
  }

  setGridFooterData ( data: TData[] ) {
    this._gridFooterData = data
  }

  findChildrenFooter ( footerResult, columnDefs: ColDef[] ) {
    columnDefs.forEach( colDef => {
      const { children, aggregation, field } = colDef
      if ( children ) {
        this.findChildrenFooter( footerResult, children )
      } else {
        this.setCalculatorItems( footerResult, aggregation, field )
      }
    } )
  }

  refreshFooter () {
    if( !this._gridAdapter ) return

    const columnDefs = this._gridAdapter.getColumnDefs()
    if( !columnDefs ) return
    const footerResult: Record<string, any> = {}
    this.findChildrenFooter( footerResult, columnDefs )
    this.setGridFooterData( [ footerResult as TData ] )

    const gridFooterData = this.getGridFooterData()
    this._gridAdapter.setPinnedBottomRowData( gridFooterData )
    this._models?.setFooterData?.( gridFooterData )
  }

  refreshFooterOnlyField ( aggregation: Aggregation, field: string ) {
    const [ prevFooterMap ] = this.getGridFooterData().slice() || []

    this.setCalculatorItems( prevFooterMap, aggregation, field )
    this.setGridFooterData( [ prevFooterMap ] )

    const gridFooterData = this.getGridFooterData()
    this._gridAdapter?.setPinnedBottomRowData( gridFooterData )
    this._models?.setFooterData?.( gridFooterData )
  }

  setCalculatorItems ( footerResult: any, aggregation: Aggregation, field: string ) {
    if ( aggregation ) {
      const aggType = getAggregationType( aggregation )
      const calcResult = this.processAggregationByType( aggType, field )
      const aggText = typeof aggregation === 'object' ? aggregation.text || '' : ''
      const aggDecimalPoint = typeof aggregation === 'object' ? aggregation.decimalPoint || 0 : 0

      if ( aggType === 'CUSTOM' ) {
        footerResult[ field ] = aggText
      } else {
        const formatResult = this.setFormatByDecimalPoint( calcResult, aggDecimalPoint )
        footerResult[ field ] = aggText + formatResult
      }
    }
  }

  processAggregationByType ( aggType: string, field: string ): number {
    let calcResult: number

    switch ( aggType ) {
      case 'SUM':
        calcResult = this.calcSum( field )
        break
      case 'COUNT':
        calcResult = this.calcCount()
        break
      case 'MAX':
        calcResult = this.calcMax( field )
        break
      case 'MIN':
        calcResult = this.calcMin( field )
        break
      case 'AVG':
        calcResult = this.calcAvg( field )
        break
    }

    return calcResult
  }

  calcSum ( field: string ): number {
    let sumResult = 0
    this._gridAdapter?.forEachNodeAfterFilterAndSort( node => {
      const { group, data } = node
      if ( !group ) {
        const row = data
        const value = Number( row[ field ] )
        sumResult += value && !isNaN( value ) ? value : 0
      }
    } )

    return sumResult
  }

  calcCount (): number {
    return this._gridAdapter?.getRows().length
  }

  calcMax ( field: string ): number {
    let maxResult = 0
    this._gridAdapter?.forEachNodeAfterFilterAndSort( node => {
      const { group, data } = node
      if ( !group ) {
        const row = data
        const value = Number( row[ field ] )
        if ( value && !isNaN( value ) ) {
          maxResult = maxResult > value ? maxResult : value
        }
      }
    } )

    return maxResult
  }

  calcMin ( field: string ): number {
    let minResult = 0
    this._gridAdapter?.forEachNodeAfterFilterAndSort( node => {
      const { group, data } = node
      if ( !group ) {
        const row = data
        const value = Number( row[ field ] )
        if ( value && !isNaN( value ) ) {
          minResult = minResult < value ? minResult : value
        }
      }
    } )

    return minResult
  }

  calcAvg ( field: string ): number {
    const calcSum = this.calcSum( field )
    const calcCount = this.calcCount()

    return calcSum && calcCount ? calcSum / calcCount : 0
  }

  setFormatByDecimalPoint ( value: any, decimalPoint = 0 ) {
    value = value ?? ''
    return !isNaN( value ) ? NumberUtil.formatNumber( value, decimalPoint ) : value
  }

}

export default GridFooter
