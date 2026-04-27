<template>
  <AgRenderWrapper v-bind="props">
    <template #component="wrapperProps">
      <RadioGroup
        :modelValue="wrapperProps.modelValue"
        :source="wrapperProps.source"
        :class="wrapperProps.class"
      />
      {{ console.log('wrapperProps => ', wrapperProps) }}
    </template>
  </AgRenderWrapper>
</template>

<script setup lang="ts">
  import type { AgGridCellRenderParams } from '@/shared/ui/ag-grid/AgGrid.Types'
  import type { RadioGroupProps } from 'zenith-pulse-vue'
  import AgRenderWrapper from '@/shared/ui/ag-grid/wrapper/AgRenderWrapper.vue'

  const props = defineProps<AgGridCellRenderParams<RadioGroupProps>>()

</script>