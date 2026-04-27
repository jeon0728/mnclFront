<template>
  <div>
    <button
      @click="handleCollapseAll"
      style="
        background: none;
        border: none;
        padding: 0 8px;
        cursor: pointer;
        font-size: 12px;
      "
    >
      <PhArrowDown/>
    </button>
  </div>
</template>

<script setup lang="ts">
  import { defineProps } from 'vue'
  import { PhArrowDown } from '@phosphor-icons/vue'
  import type { ICellRendererParams } from 'ag-grid-community'

  const props = defineProps<{
    params: ICellRendererParams
  }>()

  const handleCollapseAll = () => {
    const { api } = props.params
    api.forEachNode((node: any) => {
      if (node.master) {
        node.setExpanded(false)
      }
    })
    api.refreshCells({ columns: ['detail'], force: true })
  }
</script>


