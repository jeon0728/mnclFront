<template>
  <div class="flex h100p w100p" :style="{ alignItems: 'center' }">
    <div class="async-code-box-tag" v-if="!!value">
      {{ `[${ value || '' }] ${ nameValue || '' }` }}
    </div>
    <div v-else class="w100p"/>
    <PhCaretDown v-bind="defaultRenderProps" size="16"/>
    <PhMagnifyingGlass v-bind="defaultRenderProps" size="16"/>
  </div>
</template>
<script setup lang="ts">
  import type { AgRenderWrapperProps } from '../AgGrid.Types'
  import { PhCaretDown, PhMagnifyingGlass } from '@phosphor-icons/vue'

  const props = defineProps<AgRenderWrapperProps>()
  const {
    params: { value, paramProps }
  } = props
  const { color, iconColor, nameValue } = paramProps

  const defaultRenderProps = computed( () => {
    return {
      ...paramProps,
      color: color || iconColor,
    }
  } )

</script>
