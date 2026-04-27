import type { IRowNode, SetStateData } from './types'
import { addOptionColumns } from './GridUtils'
import { CUD_FLAG_CREATE, CUD_FLAG_DELETE, CUD_FLAG_UPDATE } from '@/shared/constants/ag-grid/cudFlag'

class GridState<TData> {
  private _state: Record<any, TData>
  private readonly _setStateData: SetStateData<TData>

  constructor (
    stateData: Record<string, TData>,
    setStateData: SetStateData<TData>
  ) {
    this._state = stateData || {}
    if( this._setStateData ) {
      this._setStateData = setStateData
    } else {
      this._setStateData = () => {}
    }

  }

  init () {
    this._state = {}
    this._setStateData( {}, true )
  }

  getCache (): Record<string, TData> {
    return this._state
  }

  toArray ( type?: string ): any[] {
    const map = this._state
    const results: any[] = []
    for ( const prop in map ) {
      const cache = map[ prop ]
      if ( type ) {
        if ( cache[ addOptionColumns.statusColumn ] === type ) {
          results.push( cache )
        }
      } else {
        results.push( cache )
      }

    }
    return results
  }

  private updateCache ( id: string, data: TData ) {
    this._state[ id ] = data
    this._setStateData( this._state )
  }

  insert ( rowNode: IRowNode<TData> ): void {
    const { data, rowPinned, group, id } = rowNode
    if ( rowPinned || group ) return

    data[ addOptionColumns.statusColumn ] = CUD_FLAG_CREATE
    this.updateCache( id, data )
  }

  update ( rowNode: IRowNode<TData> ): void {
    const { data, rowPinned, group, id } = rowNode
    if ( rowPinned || group ) return

    const state = data[ addOptionColumns.statusColumn ]
    if ( !( state === CUD_FLAG_CREATE || state === CUD_FLAG_DELETE ) ) {
      data[ addOptionColumns.statusColumn ] = CUD_FLAG_UPDATE
      this.updateCache( id, data )
    }
  }

  remove ( rowNode: IRowNode<TData> ): void {
    const { data, rowPinned, group, id } = rowNode
    if ( rowPinned || group ) return

    const state = data[ addOptionColumns.statusColumn ]
    if ( state === CUD_FLAG_CREATE ) {
      delete this._state[ id ]
      this._setStateData( this._state )
    } else {
      data[ addOptionColumns.statusColumn ] = CUD_FLAG_DELETE
      this.updateCache( id, data )
    }
  }

}

export default GridState
