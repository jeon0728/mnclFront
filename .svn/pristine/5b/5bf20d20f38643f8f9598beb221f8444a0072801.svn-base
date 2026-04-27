<template>
  <slot name="component" v-bind="mergedProps"/>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import type { AgEditorWrapperProps } from '@/shared/ui/ag-grid/AgGrid.Types'

  const props = defineProps<AgEditorWrapperProps>()
  const { params } = props || {}
  const { paramProps = {}, value } = params || {}

  // params.value를 modelValue로 자동 매핑 (paramProps에 modelValue가 없을 경우)
  const mergedProps = computed(() => {
    const props = { ...paramProps }
    // value가 있고 modelValue가 명시적으로 설정되지 않은 경우에만 자동 매핑
    if (value !== undefined && !('modelValue' in paramProps) && !('value' in paramProps)) {
      props.modelValue = value
    }
    return props
  })
</script>
