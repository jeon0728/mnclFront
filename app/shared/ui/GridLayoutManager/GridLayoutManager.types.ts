import type { CudFlag } from '@/shared/constants/ag-grid/cudFlag'
import { GridAdapter } from '@/shared/utils'

export type GetGridLayoutListParams = {
  userId: string
  corpId: number
  menuId: string
  gridName: string
}

export type GridLayoutData = {
  id?: string
  userId?: string
  corpId?: number
  menuId?: string
  gridName?: string
  layoutName?: string
  columnState?: string
  defaultLayout?: string
  corpYn?: string
  cudFlag?: CudFlag
}

export interface GridLayoutManagerProps {
  menuId: GridLayoutData[ 'menuId' ]
  gridName: GridLayoutData[ 'gridName' ]
  layoutName?: GridLayoutData[ 'layoutName' ]
  gridAdapter: GridAdapter
  [ property: string ]: any
}

export interface GridLayoutItemProps {
  layout: GridLayoutData
  gridAdapter: GridAdapter
  cudFlag?: string
  onClick?( layout: GridLayoutData ): void
  onDelete?( layout: GridLayoutData ): void
  onSave?( layout: GridLayoutData ): void
  [ property: string ]: any
}

export interface GridLayoutItemsProps {
  menuId: string
  gridName: string
  gridAdapter: GridAdapter
  gridPresets: any[]
}

