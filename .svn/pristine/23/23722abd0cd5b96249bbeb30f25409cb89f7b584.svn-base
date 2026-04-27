<template>
  <div class="gsabis-number-box-wrapper" :class="{ 'has-right-area': $slots.rightArea }">
    <NumberBox
      ref="numberRef"
      class="gsabis-number-box"
      :model-value="input"
      @update:model-value="handleUpdateModelValue"
      v-bind="defaultProps"
      v-on="listeners"
    />
    <div v-if="$slots.rightArea" class="number-box-right-area">
      <slot name="rightArea"/>
    </div>
  </div>
</template>

<script setup lang="ts">
  /**
   * Gsabis 프로젝트의 Number 컴포넌트
   *
   * @description
   * - 숫자 정보를 입력 받습니다
   * - 슬롯 기반 확장 가능한 구조를 지원합니다.
   * - 좌측/우측 영역을 커스터마이징할 수 있는 슬롯을 제공합니다.
   *
   * @example
   * ```vue
   * <!-- 기본 숫자 입력 -->
   * <NumberBox v-model="value" />
   *
   * <!-- 스피너 버튼 추가 -->
   * <NumberBox v-model="value">
   *   <template #rightArea>
   *     <div class="spinner-buttons">...</div>
   *   </template>
   * </NumberBox>
   * ```
   */
  import { forwardExpose, NumberBox } from 'zenith-pulse-vue'
  import type { GsabisNumberBoxProps, GsabisNumberBoxSlots } from './GsabisNumberBox.types'
  import { transformEventListeners } from '@/shared/utils'

  const props = withDefaults(defineProps<GsabisNumberBoxProps>(), {})
  const emits = defineEmits<{
    'update:modelValue': [value: string]
  }>()

  const { modelValue, ...rest } = props
  const defaultProps = computed(() => {
    return {
      ...rest
    }
  })

  const input = ref<GsabisNumberBoxProps['modelValue']>(modelValue)

  // props.modelValue가 변경되면 input 업데이트
  watch(
    () => props.modelValue,
    (v) => {
      if (v !== input.value) {
        input.value = v
      }
    },
    { immediate: true }
  )

  // NumberBox의 값 변경 핸들러
  const handleUpdateModelValue = (value: string) => {
    input.value = value
    emits('update:modelValue', value)
  }

  defineSlots<GsabisNumberBoxSlots>()

  const attrs = useAttrs()
  const listeners = transformEventListeners(attrs)

  const numberRef = ref()
  defineExpose(forwardExpose(numberRef))
</script>

<style scoped lang="scss" src="@/shared/assets/scss/components/ui/stepper.scss"></style>
