<template>
  <div class="flex h100p w100p" :style="{ alignItems: 'center' }">
    <div
      class="w100p"
      :style="textStyle"
    >
      {{ value }}
    </div>
    <slot
      name="component"
      v-bind="defaultRenderProps"
      @click="onClick"
      @doubleClick="onDoubleClick"
    />
  </div>
</template>
<script lang="ts" setup>
  import type { AgRenderWrapperProps } from '@/shared/ui/ag-grid/AgGrid.Types'
  import type { CSSProperties } from 'vue'

  const props = defineProps<AgRenderWrapperProps>()
  const { params: { paramProps = {}, value } } = props || {}
  const {
    textAlign = 'left',
    color, textColor, iconColor,
    onClick,
    onDoubleClick
  } = paramProps

  const textStyle = ref<CSSProperties>( {
    textAlign,
    color: color || textColor,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  } )

  const defaultRenderProps = computed( () => {
    return {
      ...paramProps,
      color: color || iconColor,
    }
  })
</script>