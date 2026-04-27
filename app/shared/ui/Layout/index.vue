<template>
  <div
    v-bind="restProps"
    :class="layoutClass"
    :style="layoutStyle"
  >
    <slot/>
  </div>
</template>

<script setup lang="ts">
  import { computed, useAttrs } from 'vue'
  import type { LayoutProps, LayoutSlots } from './Layout.types'

  const props = defineProps<LayoutProps>()
  defineSlots<LayoutSlots>()

  const attrs = useAttrs()

  const { height, remain } = props
  const restProps = attrs

  const remainClass = remain ? ' flex-1' : ''

  const layoutClass = computed( () => {
    return `layout w100p${ height ? ' flex flex-column' : '' } ${ remainClass }`
  } )

  const layoutStyle = computed( () => ( {
    height: height === '*' ? '100%' : height
  } ) )
</script>
