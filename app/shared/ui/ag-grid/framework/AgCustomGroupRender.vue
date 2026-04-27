<template>
  <div
    style="display: flex; align-items: center; height: 100%; cursor: pointer;"
    @click="handleCellClick"
  >
    <button
      @click="handleExpandClick"
      style="
        background: none;
        border: none;
        padding: 0 8px;
        cursor: pointer;
        font-size: 12px;
      "
    >
      {{ props.params.node.expanded ? '−' : '+' }}
    </button>
  </div>
</template>

<script setup lang="ts">
  import type { ICellRendererParams } from 'ag-grid-community'
  import { defineProps } from 'vue'

  const props = defineProps<{
    params: ICellRendererParams
  }>()

  const handleExpandClick = (e: MouseEvent) => {
    e.stopPropagation()

    const { node, api, colDef } = props.params

    if (node) {
      node.setSelected(true)
      node.setExpanded(!node.expanded)
      api.refreshCells({ rowNodes: [node], columns: [colDef.field!], force: true })
    }
  }

  const handleCellClick = (e: MouseEvent) => {
    const { node } = props.params
    if (e.target === e.currentTarget && node) {
      node.setSelected(true)
    }
  }
</script>


