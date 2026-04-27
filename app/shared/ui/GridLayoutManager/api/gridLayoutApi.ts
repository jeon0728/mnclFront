import { axios } from '@/shared/utils'
import type { GetGridLayoutListParams, GridLayoutData } from '../GridLayoutManager.types'

export const getGridLayoutList = async ( param: GetGridLayoutListParams ) => {
  return await axios.post( `/api/v1/grid/preset/search/list`, { search: param } )
}

export const saveUserGridLayout = async ( data: GridLayoutData ) => {
  return await axios.post( `/api/v1/grid/preset/save/user`, { gridPreset: data } )
}

export const deleteUserGridLayout = async ( presetId: string ) => {
  return await axios.post( `/api/v1/grid/preset/delete/user`, { presetId } )
}




