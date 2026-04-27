<template>
  <TimeBox
    ref="timeRef"
    class="gsabis-time-box"
    v-model="input"
    v-bind="defaultProps"
    v-on="listeners"
  >
    <template #rightArea>
      <PhClock size="18"/>
    </template>
    <template v-for="(_, name) in filteredSlots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps"/>
    </template>
  </TimeBox>
</template>

<script setup lang="ts">
/**
 * Gsabis 프로젝트의 Time 컴포넌트
 *
 * @description
 * - 시간 정보를 입력 받습니다
 * - 슬롯 기반 확장 가능한 구조를 지원합니다.
 * - 좌측/우측 영역을 커스터마이징할 수 있는 슬롯을 제공합니다.
 *
 * @example
 * ```vue
 * <!-- 기본 검색 버튼 -->
 * <TimeBox v-model="">
 *   검색
 * </TimeBox>
 * ```

 */
  import { forwardExpose, TimeBox } from 'zenith-pulse-vue'
  import type { GsabisTimeBoxProps, GsabisTimeBoxSlots } from './GsabisTimeBox.types'
  import { transformEventListeners } from '@/shared/utils'
  import { PhClock } from '@phosphor-icons/vue'

  const props = withDefaults( defineProps<GsabisTimeBoxProps>(), {} )
  const { modelValue, ...rest } = props
  const defaultProps = computed( () => {
    return {
      ...rest,
    }
  } )

  const input = ref<GsabisTimeBoxProps[ 'modelValue' ]>( modelValue )
  watch( () => props.modelValue, ( v ) => {
    input.value = v
  } )

  defineSlots<GsabisTimeBoxSlots>()
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

  const timeRef = ref()
  defineExpose( forwardExpose( timeRef ) )
</script>