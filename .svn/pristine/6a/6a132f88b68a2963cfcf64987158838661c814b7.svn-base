<template>
  <AgGridVue
    ref="gridRef"
    class="ag-theme-balham ag-theme-gsabis2 w100p h100p"
    v-bind="{
      ...mergedProps
    }"
  />
</template>
<script setup lang="ts" generic="TData">
  import { AgGridVue } from 'ag-grid-vue3'
  import type { CustomAgGridEmits, CustomAgGridProps } from '@/shared/ui/ag-grid/AgGrid.Types'
  import { useGridAdapter } from '@/shared/composables/grid'

  const props = withDefaults(defineProps<CustomAgGridProps<TData>>(), {
    theme: 'legacy'
  })
  /**
   * NOTE:
   * - Vue의 props는 반응형이지만, 구조분해 할당으로 꺼내면 반응성이 끊길 수 있다.
   * - rowData 처럼 "새 배열"로 바뀌는 값(computed/filter 결과)은 특히 업데이트가 누락되어
   *   그리드가 비어 보이는 문제가 발생할 수 있어, mergedProps를 computed로 유지한다.
   */
  const mergedProps = computed(() => {
    const { gridOptions, ...rest } = props as any
    return {
      ...rest,
      ...(gridOptions || {})
    }
  })

  const gridRef = ref<any>(null)
  const emits = defineEmits<CustomAgGridEmits<TData>>()

  const gridAdapter = useGridAdapter<TData>(props.gridOptions)(gridRef)
  emits('gridAdapter', gridAdapter)
</script>
