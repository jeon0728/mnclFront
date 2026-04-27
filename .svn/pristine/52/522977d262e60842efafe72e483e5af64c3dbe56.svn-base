<template>
  <CheckBox
    ref="checkRef"
    class="gsabis-check-box"
    v-model="input"
    v-bind="rest"
    v-on="listeners"
  />
</template>

<script setup lang="ts">
  import { transformEventListeners } from '@/shared/utils'
  import { CheckBox, forwardExpose } from 'zenith-pulse-vue'
  import type { GsabisCheckBoxProps } from '@/shared/ui/GsabisCheckBox/GsabisCheckBox.types'
  import { FALSE_VALUE, TRUE_VALUE } from '@/shared/constants/common/trueFalseValue'
  import type { GsabisTimeBoxProps } from '@/shared/ui/GsabisTimeBox/GsabisTimeBox.types'

  const props = withDefaults( defineProps<GsabisCheckBoxProps>(), {
    defaultTrueExpression: TRUE_VALUE, defaultFalseExpression: FALSE_VALUE,
  } )
  const { modelValue, ...rest } = props

  const input = ref<GsabisTimeBoxProps[ 'modelValue' ]>( modelValue )
  watch( () => props.modelValue, ( v ) => {
    input.value = v
  } )

  const attrs = useAttrs()
  const listeners = transformEventListeners( attrs )

  const checkRef = ref()
  defineExpose( forwardExpose( checkRef ) )
</script>