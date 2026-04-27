<template>
  <div class="grid-layout-manager-wrapper">
    <li class="grid-layout-manager-item flex">
      <!-- Default layout 핀 버튼 -->
      <template v-if="!isEdit">
        <PhPushPin
          v-if="isDefaultLayout"
          class="grid-layout-manager-button favorite"
          :size="16"
          @click="handleDefaultLayout"
        />
        <PhPushPin
          v-else
          weight="fill"
          class="grid-layout-manager-button favorite active"
          :size="16"
          @click="handleDefaultLayout"
        />
      </template>

      <!-- Layout 이름 input / label -->
      <template v-if="isEdit">
        <input
          ref="inputRef"
          class="grid-layout-manager-input"
          tabindex="0"
          v-model="name"
          @keyup="handleKeyUpInput"
          @blur="isEdit = false"
        />
      </template>
      <template v-else>
        <div
          :class="`grid-layout-manager-label w100p${name ? '' : ' empty-label'}`"
          @click.stop.prevent="emit('click', props.layout)"
          @dblclick.stop.prevent="isEdit = true"
        >
          {{ name || '입력 하세요' }}
        </div>
      </template>

      <!-- 삭제 버튼 -->
      <PhX
        v-if="!isEdit"
        class="grid-layout-manager-button"
        :size="16"
        @click="emit('delete', props.layout)"
      />
    </li>
  </div>
</template>

<script setup lang="ts">
  import { nextTick, ref, watch } from 'vue'
  import { CUD_FLAG_INSERT } from '@/shared/constants/ag-grid/cudFlag'
  import { TRUE_VALUE } from '@/shared/constants/common/trueFalseValue'
  import { PhPushPin, PhX } from '@phosphor-icons/vue'
  import type { GridLayoutItemProps } from '@/shared/ui/GridLayoutManager/GridLayoutManager.types'

  const props = defineProps<GridLayoutItemProps>()
  const emit = defineEmits<{
    ( e: 'click', layout: any ): void
    ( e: 'delete', layout: any ): void
    ( e: 'save', layout: any ): void
    ( e: 'input', input: string ): void
  }>()

  // state
  const isEdit = ref( false )
  const name = ref( props.layout.layoutName )
  const isDefaultLayout = ref( props.layout.defaultLayout === TRUE_VALUE )
  const inputRef = ref<HTMLInputElement | null>( null )

  watch(
    () => props.cudFlag,
    ( val ) => {
      if ( val === CUD_FLAG_INSERT ) {
        isEdit.value = true
      }
    },
    { immediate: true }
  )

  watch( isEdit, async ( val ) => {
    if ( val ) {
      await nextTick()
      inputRef.value?.select()
    }
  } )

  const handleKeyUpInput = ( e: KeyboardEvent ) => {
    switch ( e.code ) {
      case 'Enter':
        isEdit.value = false
        emit( 'save', {
          ...props.layout,
          layoutName: name.value,
          columnState: JSON.stringify( props.gridAdapter?.getColumnState() )
        } )
        break
      case 'Escape':
        name.value = props.layout.layoutName
        isEdit.value = false
        break
    }
  }

  const handleDefaultLayout = () => {
    isDefaultLayout.value = !isDefaultLayout.value
  // TODO: API 호출 필요 시 request(updateDefaultGridLayout(props.layout.id))
  }
</script>


