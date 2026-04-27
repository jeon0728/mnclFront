<template>
  <AgEditorWrapper
    v-bind="props"
  >
    <template #component="wrapperProps">
      <TimeBox
        ref="refInput"
        v-model="parseValue"
        v-bind="wrapperProps"
      />
    </template>
  </AgEditorWrapper>
</template>

<script setup lang="ts">
  import type { AgGridCellEditorParams } from '../AgGrid.Types'
  import AgEditorWrapper from '../wrapper/AgEditorWrapper.vue'
  import { useAgEditorSetting } from '@/shared/composables/grid/useAgEditorSetting'
  import type { TimeBoxProps } from 'zenith-pulse-vue'

  const props = defineProps<AgGridCellEditorParams<TimeBoxProps>>()

  const { params } = props || {}
  const refInput = ref<any>( null )

  const { parseValue, input } = useAgEditorSetting( refInput, params.value )

  defineExpose( {
    getValue: () => {
      return input.value ?? ''
    }
  } )
</script>