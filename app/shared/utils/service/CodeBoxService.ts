import axios from '@/shared/utils/http/Axios'

class CodeBoxService {
  private _api: string
  private _params: Record<string, any>

  constructor ( ) {
    this._api = ''
    this._params = {}
  }

  setApi ( api: string ): this {
    this._api = api
    return this
  }

  setParams ( params: any ): this {
    this._params = params
    return this
  }

  codeList ( config: Record<string, any> = {} ): Promise<any> {
    const promise = axios.post( this._api, { ...this._params }, config )

    return promise.then( res => res )
  }

  static _getByCode (
    api: string,
    params: Record<string, any>,
    config: Record<string, any> = { noLoading: true }
  ): Promise<any> {
    return CodeBoxService.of()
      .setApi( api )
      .setParams( params )
      .codeList( config )
  }

  static getNameByCode (
    modalType: string,
    params: Record<string, any>,
    config: Record<string, any> = { noLoading: true }
  ): Promise<any> {
    return CodeBoxService._getByCode( modalType, params, config ).then( res => {
      const { DATA: [ firstRow ] } = res
      const { NAME } = firstRow

      return NAME
    } ).catch( rej => {
    } )
  }

  static getColByCode (
    modalType: string,
    params: Record<string, any>,
    column: string,
    config: Record<string, any> = { noLoading: true }
  ): Promise<any> {
    return CodeBoxService._getByCode( modalType, params, config ).then( res => {
      const { DATA: [ firstRow ] } = res

      return firstRow[ column ]
    } ).catch( rej => {
    } )
  }

  static getRowByCode (
    modalType: string,
    params: Record<string, any>,
    config: Record<string, any> = { noLoading: true }
  ): Promise<any> {
    return CodeBoxService._getByCode( modalType, params, config ).then( res => {
      const { DATA: [ firstRow ] } = res

      return firstRow
    } ).catch( rej => {
    } )
  }

  static of (): CodeBoxService {
    return new CodeBoxService()
  }

}

export default CodeBoxService
