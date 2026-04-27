import type { ITooltipParams, ValueGetterParams } from '../types/index'

function indicate ( { node }: ValueGetterParams ): string {
  return node.rowPinned ? '' : String( node.sourceRowIndex + 1 )
}

function value (): ( params: ITooltipParams ) => string {
  return function ( { node, value }: ITooltipParams ) {
    return node.rowPinned ? '' : value
  }
}

function valueFormatted (): ( params: ITooltipParams ) => string {
  return function ( { node, valueFormatted }: ITooltipParams ): string {
    return node.rowPinned ? '' : valueFormatted
  }
}

export default {
  indicate: function (): ( params: ValueGetterParams ) => string {
    return indicate
  },
  value,
  valueFormatted
}
