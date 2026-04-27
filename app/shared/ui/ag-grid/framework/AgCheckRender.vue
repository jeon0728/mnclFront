<template>
  <AgRenderWrapper v-bind="props">
    <template #component="wrapperProps">
      <CheckBox
        v-bind="wrapperProps"
      />
    </template>
  </AgRenderWrapper>

</template>

<script setup lang="ts">
  import type { AgGridCellRenderParams } from '@/shared/ui/ag-grid/AgGrid.Types'
  import type { CheckBoxProps } from 'zenith-pulse-vue'
  import AgRenderWrapper from '@/shared/ui/ag-grid/wrapper/AgRenderWrapper.vue'

  const props = defineProps<AgGridCellRenderParams<CheckBoxProps>>()
</script>