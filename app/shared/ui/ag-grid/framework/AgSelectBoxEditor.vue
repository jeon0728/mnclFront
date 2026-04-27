<template>
  <AgEditorWrapper v-bind="props">
    <template #component="wrapperProps">
      <SelectBox ref="refInput" v-model="parseValue" v-bind="wrapperProps"/>
    </template>
  </AgEditorWrapper>
</template>

<script setup lang="ts">
  import type { AgGridCellEditorParams } from '../AgGrid.Types'
  import AgEditorWrapper from '../wrapper/AgEditorWrapper.vue'
  import type { GsabisSelectBoxProps } from '@/shared/ui/GsabisSelectBox/GsabisSelectBox.types'
  import { useAgEditorSetting } from '@/shared/composables/grid/useAgEditorSetting'

  const props = defineProps<AgGridCellEditorParams<GsabisSelectBoxProps>>()

  const { params } = props || {}
  const refInput = ref<any>(null)

  const { parseValue, input } = useAgEditorSetting(refInput, params.value)

  defineExpose({
    getValue: () => {
      return input.value ?? ''
    }
  })
</script>
