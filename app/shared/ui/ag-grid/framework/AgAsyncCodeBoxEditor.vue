<template>
  <AgEditorWrapper
    v-bind="props"
  >
    <template #component="wrapperProps">
      <AsyncCodeBox
        ref="refInput"
        v-model="parseValue"
        v-bind="wrapperProps"
        :onComplete="handleComplete"
      />
    </template>
  </AgEditorWrapper>
</template>

<script setup lang="ts">
  import type { AgGridCellEditorParams } from '../AgGrid.Types'
  import AgEditorWrapper from '../wrapper/AgEditorWrapper.vue'
  import { useAgEditorSetting } from '@/shared/composables/grid/useAgEditorSetting'
  import type { AsyncCodeBoxProps } from '@/shared/ui/GsabisAsyncCodeBox/AsyncCodeBox.type'

  const props = defineProps<AgGridCellEditorParams<AsyncCodeBoxProps>>()

  const { params } = props || {}
  const { paramProps } = params

  const refInput = ref<any>( null )

  const { parseValue, input } = useAgEditorSetting( refInput, params.value )

  const handleComplete = ( d ) => {
    // input.value 업데이트하여 AG Grid에 반환될 값 설정
    const valueField = paramProps?.defaultValueExpress || 'code'
    input.value = d?.[ valueField ] || ''
  
    if ( paramProps?.onComplete ) {
      paramProps.onComplete( d )
    }
  }

  defineExpose( {
    getValue: () => {
      return input.value ?? ''
    }
  } )
</script>