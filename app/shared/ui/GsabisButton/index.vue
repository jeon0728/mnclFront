<template>
  <Button
    :class="['gsabis-button', `${buttonVariant || getButtonVariantByButtonType(buttonType)}`]"
    v-bind="paramProps"
    v-on="listeners"
  >
    <template #leftArea>
      <template v-if="hasLeftAreaSlot">
        <slot name="leftArea"/>
      </template>
      <template v-else>
        <component
          v-if="buttonType || icon"
          :is="getFontIconByButtonType(buttonType)"
          :size="20"
          :class="['button__icon']"
        />
      </template>
    </template>
    <template v-for="(_, name) in filteredSlots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps"/>
    </template>
    <template #rightArea>
      <template>
        <slot name="rightArea"/>
      </template>
    </template>
    <!-- <template #rightArea>
      <template v-if="hasRightAreaSlot">
        <slot name="rightArea" />
      </template>
      <template v-else>
        {{ hotkeyName }}
      </template>
    </template> -->
  </Button>
</template>

<script setup lang="ts">
  /**
   * Gsabis 프로젝트의 버튼 컴포넌트
   *
   * @description
   * - 미리 정의된 버튼 타입(search, reset, excel 등)을 통해 일관된 UI를 제공합니다.
   * - 자동 아이콘 설정, 단축키 표시, 슬롯 기반 확장 가능한 구조를 지원합니다.
   * - 좌측/우측 영역을 커스터마이징할 수 있는 슬롯을 제공합니다.
   *
   * @example
   * ```vue
   * <!-- 기본 검색 버튼 -->
   * <Button buttonType="search" @click="handleSearch">
   *   검색
   * </Button>
   * ```
   *
   * @example
   * ```vue
   * <!-- 로딩 상태가 있는 엑셀 다운로드 버튼 -->
   * <Button
   *   buttonType="excel"
   *   :loading="isDownloading"
   *   @click="handleExcelDownload"
   * >
   *   엑셀 다운로드
   * </Button>
   * ```
   */
  import { Button } from 'zenith-pulse-vue'
  import type { GsabisButtonProps, GsabisButtonSlots } from './GsabisButton.types'
  import { transformEventListeners } from '@/shared/utils'
  import {
    getButtonHotkeyByButtonType,
    getButtonVariantByButtonType,
    getFontIconByButtonType
  } from '@/shared/ui/GsabisButton/GsabisButton.utils'

  const props = defineProps<GsabisButtonProps>()
  const { buttonType, buttonVariant, shortcut, loading, ...rest } = props

  defineSlots<GsabisButtonSlots>()
  const slots = useSlots()
  const filteredSlots = computed(() => {
    const filtered: Record<string, any> = {}

    Object.keys(slots).forEach((slotName) => {
      if (!['leftArea', 'rightArea'].includes(slotName)) {
        filtered[slotName] = slots[slotName]
      }
    })

    return filtered
  })

  const hasLeftAreaSlot = computed(() => !!slots.leftArea)
  const hasRightAreaSlot = computed(() => !!slots.rightArea)
  // const hotkeyName = computed( () => {
  //   const hotkey = getButtonHotkeyByButtonType( buttonType )
  //   if( !hotkey ) return ''
  //   return `(${hotkey})`
  // } )

  const paramProps = computed(() => {
    const isShortcut = typeof shortcut === 'boolean'
    return {
      ...rest,
      disabled: props.disabled
      // shortcut: isShortcut ? { key: getButtonHotkeyByButtonType( buttonType ) } : shortcut,
    }
  })

  const attrs = useAttrs()
  const listeners = transformEventListeners(attrs)
</script>
