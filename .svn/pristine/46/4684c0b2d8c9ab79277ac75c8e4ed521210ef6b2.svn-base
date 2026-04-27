<template>
  <Button
    class="grid-button"
    v-bind="paramProps"
    v-on="listeners"
  >
    <template v-for="(_, name) in filteredSlots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps"/>
    </template>
  </Button>
</template>
<script setup lang="ts">
/**
 * Gsabis 프로젝트의 모달 검색 버튼 컴포넌트
 *
 * @description
 * - 기본 사용방법은 <Button> 과 동일
 * - Card 의 영역 안에서 그리드 위에서 사용
 * - 높이가 기존 버튼과 다름
 */
  import { transformEventListeners } from '@/shared/utils'
  import type { GsabisButtonProps, GsabisButtonSlots } from '@/shared/ui/GsabisButton/GsabisButton.types'
  import { GRID_BUTTON_HEIGHT } from '@/shared/constants/control/button'

  const props = withDefaults( defineProps<GsabisButtonProps>(), {
    height: GRID_BUTTON_HEIGHT,
  } )
  const { style = {}, ...rest } = props

  const paramProps = computed( () => {
    return {
      ...rest,
      style: { ...style, minHeight: `${GRID_BUTTON_HEIGHT}px`, minWidth: '0px' }
    }
  } )

  defineSlots<GsabisButtonSlots>()
  const slots = useSlots()
  const filteredSlots = computed(() => {
    const filtered: Record<string, any> = {}

    Object.keys(slots).forEach(slotName => {
      if (![ 'leftIcon' ].includes(slotName)) {
        filtered[slotName] = slots[slotName]
      }
    })

    return filtered
  } )

  const attrs = useAttrs()
  const listeners = transformEventListeners( attrs )
</script>