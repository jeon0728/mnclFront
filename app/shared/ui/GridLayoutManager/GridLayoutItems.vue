<template>
  <template v-if="dataGridPreset.length > 0">
    <GridLayoutItem
      v-for="layout in dataGridPreset"
      :key="layout?.id"
      :gridAdapter="gridAdapter"
      :layout="layout"
      @input="input => emits( 'input', input )"
      @click="() => handleClick(layout)"
      @delete="() => handleDeleteLayout(layout)"
      @save="() => handleUserSaveLayout(layout)"
    />
  </template>
</template>

<script setup lang="ts">
  import type { ColumnState } from '@/shared/types/grid'
  import GridLayoutItem from './GridLayoutItem.vue'
  import { deleteUserGridLayout, saveUserGridLayout } from './api/gridLayoutApi'
  import { useHttp } from '@/shared/composables'
  import type { GridLayoutData, GridLayoutItemsProps } from '@/shared/ui/GridLayoutManager/GridLayoutManager.types'

  const props = defineProps<GridLayoutItemsProps>()
  const { gridPresets, gridAdapter } = props
  const emits = defineEmits( [ 'input' ] )

  const dataGridPreset = computed( () => gridPresets )

  const [ request ] = useHttp()

  const handleClick = ( layout: GridLayoutData ) => {
    const { columnState, layoutName } = layout
    if ( !columnState ) return
    const state = JSON.parse( layout.columnState ) as ColumnState[]
    gridAdapter?.applyColumnState( state )
    emits( 'input', layoutName )
  }

  const handleDeleteLayout = async ( layout: GridLayoutData ) => {
    await request( deleteUserGridLayout( layout.id ), { noLoading: true } )
  }

  const handleUserSaveLayout = async ( layout: GridLayoutData ) => {
    let saveLayoutId: string
    try {
      const { data } = await request( saveUserGridLayout( layout ), { noLoading: true } )
      saveLayoutId = data
    } catch ( e ) {
      console.error( e )
    }
  }
</script>


