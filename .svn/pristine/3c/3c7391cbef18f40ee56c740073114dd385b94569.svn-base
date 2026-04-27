<template>
  <AgRenderWrapper v-bind="props">
    <template #component="wrapperProps">
      <Button
        v-bind="getDefaultWrapperProps( wrapperProps )"
      />
    </template>
  </AgRenderWrapper>

</template>

<script setup lang="ts">
  import type { AgGridCellRenderParams } from '@/shared/ui/ag-grid/AgGrid.Types'
  import type { ButtonProps } from 'zenith-pulse-vue'
  import AgRenderWrapper from '@/shared/ui/ag-grid/wrapper/AgRenderWrapper.vue'

  const props = withDefaults( defineProps<AgGridCellRenderParams<ButtonProps>>(), {

  } )

  const getDefaultWrapperProps: ( wrapperProps: ButtonProps ) => ButtonProps = ( wrapperProps ) => ( {
    ...wrapperProps,
    height: 20
  } )
</script>