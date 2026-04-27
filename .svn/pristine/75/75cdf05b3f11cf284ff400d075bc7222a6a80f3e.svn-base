<template>
  <slot name="component" v-bind="wrapperProps"/>
</template>

<script lang="ts" setup>
  import type { AgEditorWrapperProps } from '@/shared/ui/ag-grid/AgGrid.Types'
  import { GRID_ACTIONS_UI_HEIGHT } from '@/shared/constants/common/ui'

  const props = defineProps<AgEditorWrapperProps>()
  const { params } = props || {}
  const { paramProps = {} } = params || {}

  const wrapperProps = computed( () => {
    return {
      ...paramProps,
      height: GRID_ACTIONS_UI_HEIGHT - 1
    }
  } )
</script>