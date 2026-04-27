<template>
  <div
    ref="itemRef"
    :class="[
      'select-items',
      'flex',
      { first: idx === 0 },
      { active: isActive },
      { 'paint-focus': isPaintFocus },
      `${idx}`
    ]"
    :style="selectItemStyle"
    tabindex="-1"
    :key="data[defaultValueExpress]"
    @click="onClick"
    @mousedown="handleMouseDown"
  >
    <slot name="itemLeftArea" class="select-icon"/>
    <span
      class="select-item"
      :title="data[defaultNameExpress]"
      tabindex="-1"
    >
      {{ `[${ data[ defaultValueExpress ] }] ${ data[ defaultNameExpress ] }` }}
    </span>
    <PhCheck
      v-if="isSelect"
      class="selected-item"
    />
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, watch } from 'vue'
  import { useFocusStore, useTagStore } from './AsyncCodeBox.store'
  import { UI_HEIGHT } from '@/shared/constants/common/ui'
  import { PhCheck } from '@phosphor-icons/vue'
  import { storeToRefs } from 'pinia'

  interface Props {
    data: Record<string, any>
    defaultValueExpress: string
    defaultNameExpress: string
    idx: number
    isActive?: boolean
  }

  interface Emits {
    ( e: 'click' ): void
  }

  const props = defineProps<Props>()
  const emit = defineEmits<Emits>()
  defineSlots<{
    itemLeftArea: () => any
  }>()

  const { focus } = storeToRefs( useFocusStore() )
  const { tags } = storeToRefs( useTagStore() )

  const itemRef = ref<HTMLDivElement>()
  const isPaintFocus = ref<boolean>( false )
  const isSelect = ref<boolean>( false )

  const selectItemStyle = computed( () => ( {
    height: `${ UI_HEIGHT }px`
  } ) )

  watch( [ () => focus.value, () => tags.value ], () => {
    isPaintFocus.value = focus.value === props.idx
    isSelect.value = tags.value.some( t =>
      t?.[ props.defaultValueExpress ] === props.data?.[ props.defaultValueExpress ]
    )
  
    // 포커스된 아이템이 보이도록 스크롤
    if (isPaintFocus.value && itemRef.value) {
      // requestAnimationFrame으로 확실하게 적용
      requestAnimationFrame(() => {
        if (itemRef.value) {
          itemRef.value.scrollIntoView({ block: 'nearest', inline: 'nearest' })
        }
      })
    }
  }, { immediate: true } )

  const onClick = () => {
    emit( 'click' )
  }

  const handleMouseDown = ( e: MouseEvent ) => {
    e.preventDefault()
    e.stopPropagation()
  }
</script>

<style scoped lang="scss">
@use '../../assets/scss/variable' as *;

.select-items {
  display: flex;
  align-items: center;
  padding: 0 8px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.select-items:hover {
  @include black('background-color', 80);
}

.select-items.active {
  background-color: #e3f2fd;
}

.select-items.paint-focus {
  @include colors('background-color', primary, 0, 0.1, #dbeaff);
  .select-item{
    @include colors('color', primary);
  }
}

.select-icon {
  margin-right: 8px;
  display: flex;
  align-items: center;
}

.select-item {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: $fs-xs;
  @include black('color', 30);
}

.selected-item {
  margin-left: 8px;
  @include colors('color', primary);
}
</style>