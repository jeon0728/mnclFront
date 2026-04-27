<template>
  <AgEditorWrapper
    v-bind="props"
  >
    <template #component="wrapperProps">
      <DateBox
        ref="refInput"
        v-model="parseValue"
        v-bind="wrapperProps"
      />
    </template>
  </AgEditorWrapper>
</template>

<script setup lang="ts">
  import type { AgGridCellEditorParams } from '../AgGrid.Types'
  import type { DateBoxProps } from 'zenith-pulse-vue'
  import AgEditorWrapper from '../wrapper/AgEditorWrapper.vue'
  import { useAgEditorSetting } from '@/shared/composables/grid/useAgEditorSetting'

  const props = defineProps<AgGridCellEditorParams<DateBoxProps>>()

  const { params } = props || {}
  const refInput = ref<any>( null )

  const { parseValue, input } = useAgEditorSetting( refInput, params.value )

  defineExpose( {
    getValue: () => {
      return input.value ?? ''
    }
  } )

</script>