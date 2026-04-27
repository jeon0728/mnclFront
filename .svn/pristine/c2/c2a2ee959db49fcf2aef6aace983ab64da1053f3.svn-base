<template>
  <MultiSelectBox
    ref="selectRef"
    class="gsabis-select-box"
    v-model="input"
    v-bind="defaultProps"
    v-on="listeners"
  >
    <template #rightArea="{ onClick }">
      <PhCaretDown size="18" @click="onClick"/>
    </template>
    <!--  <template #itemRightArea="{ data }">-->
    <!--  </template>-->
    <template v-for="(_, name) in filteredSlots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps"/>
    </template>
  </MultiSelectBox>
</template>

<script setup lang="ts">
  import { forwardExpose, MultiSelectBox } from 'zenith-pulse-vue'
  import type { GsabisSelectBoxProps, GsabisSelectBoxSlots } from '../GsabisSelectBox/GsabisSelectBox.types'
  import { transformEventListeners } from '@/shared/utils'
  import { PhCaretDown } from '@phosphor-icons/vue'

  const props = withDefaults( defineProps<GsabisSelectBoxProps>(), {
    focusOpen: true,
    defaultValueExpress: 'code',
  } )
  const { modelValue, ...rest } = props
  const defaultProps = computed( () => {
    return {
      ...rest,
    }
  } )

  const input = ref<GsabisSelectBoxProps[ 'modelValue' ]>( modelValue )
  watch( () => props.modelValue, ( v ) => {
    input.value = v
  } )

  defineSlots<GsabisSelectBoxSlots>()
  const slots = useSlots()
  const filteredSlots = computed(() => {
    const filtered: Record<string, any> = {}
  
    Object.keys(slots).forEach(slotName => {
      if (![ 'rightArea' ].includes(slotName)) {
        filtered[slotName] = slots[slotName]
      }
    })
  
    return filtered
  } )

  const attrs = useAttrs()
  const listeners = transformEventListeners( attrs )

  const selectRef = ref()
  defineExpose( forwardExpose( selectRef ) )
</script>

<style lang="scss">
.select-box-item {
  svg path {
    fill: #046BFB;
  }
}
</style>