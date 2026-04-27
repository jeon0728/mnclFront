<template>
  <DateBox
    ref="dateRef"
    class="gsabis-date-box"
    v-model="input"
    v-bind="defaultProps"
    v-on="listeners"
  >
    <template #rightArea="{ onClick }">
      <PhCalendarBlank size="18" @click="onClick"/>
    </template>
    <template v-for="(_, name) in filteredSlots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps"/>
    </template>
  </DateBox>
</template>

<script setup lang="ts">
/**
 * Gsabis 프로젝트의 Date 컴포넌트
 *
 * @description
 * - 날짜 정보를 입력 받습니다
 * - 슬롯 기반 확장 가능한 구조를 지원합니다.
 * - 좌측/우측 영역을 커스터마이징할 수 있는 슬롯을 제공합니다.
 *
 * @example
 * ```vue
 * <!-- 기본 검색 버튼 -->
 * <DateBox v-model="">
 *   검색
 * </DateBox>
 * ```
 */
  import { DateBox, forwardExpose } from 'zenith-pulse-vue'
  import type { GsabisDateBoxProps, GsabisDateBoxSlots } from './GsabisDateBox.types'
  import { transformEventListeners } from '@/shared/utils'
  import { PhCalendarBlank } from '@phosphor-icons/vue'

  const props = withDefaults( defineProps<GsabisDateBoxProps>(), {} )
  const { modelValue, disabled, addContainerClass, ...rest } = props
  const defaultProps = computed( () => {
    return {
      ...rest,
      disabled: props.disabled,
      // addContainerClass가 명시적으로 전달되도록 보장
      addContainerClass: props.addContainerClass || '',
    }
  } )

  const input = ref<GsabisDateBoxProps[ 'modelValue' ]>( modelValue )
  watch( () => props.modelValue, ( v ) => {
    input.value = v
  } )

  defineSlots<GsabisDateBoxSlots>()
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

  const dateRef = ref()
  defineExpose( forwardExpose( dateRef ) )
</script>