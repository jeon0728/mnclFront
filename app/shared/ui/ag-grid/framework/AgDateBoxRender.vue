<template>
  <AgEditRenderWrapper
    v-bind="defaultProps"
  >
    <template #component="componentProps">
      <PhCalendarDots v-bind="componentProps" size="16"/>
    </template>
  </AgEditRenderWrapper>
</template>

<script setup lang="ts">
  import AgEditRenderWrapper from '../wrapper/AgEditRenderWrapper.vue'
  import type { AgRenderWrapperProps } from '../AgGrid.Types'
  import { PhCalendarDots } from '@phosphor-icons/vue'

  const props = defineProps<AgRenderWrapperProps>()
  const { params: { value, formatValue }, ...rest } = props

  const defaultProps = computed( () => ( {
    ...rest,
    params: {
      ...props.params,
      value: formatValue( value ) || value
    }
  } ) )
</script>