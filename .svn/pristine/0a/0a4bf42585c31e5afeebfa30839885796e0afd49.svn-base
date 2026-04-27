<template>
  <div
    v-if="isVisible"
    ref="overlayRef"
    class="modal-overlay"
    @keyup="handleKeyUp"
    :style="computedStyle"
    v-bind="$attrs"
    tabindex="-1"
  >
    <slot/>
  </div>
</template>

<script setup lang="ts">
  import '@/shared/assets/scss/components/containers/modal.scss'
  import { ref, watch, nextTick, computed } from 'vue'

  type ModalOverlayProps = {
    style?: Record<string, any> | string
    className?: string
    zIndex?: number
    isVisible?: boolean
    onKeyUpEscape?: () => void
  }

  const props = withDefaults( defineProps<ModalOverlayProps>(), {
    style: () => ( {} ),
    className: '',
    zIndex: 100,
    isVisible: false,
  } )

  const emit = defineEmits<{
    ( e: 'escape' ): void
  }>()

  const overlayRef = ref<HTMLDivElement | null>( null )

  const computedStyle = computed( () => {
    if ( typeof props.style === 'string' ) return props.style
    return { ...( props.style as Record<string, any> ), zIndex: props.zIndex }
  } )

  const focusIfVisible = async () => {
    if ( props.isVisible ) {
      await nextTick()
      overlayRef.value?.focus()
    }
  }

  watch( () => props.isVisible, () => {
    focusIfVisible()
  }, { immediate: true } )

  const handleKeyUp = ( e: KeyboardEvent ) => {
    if ( e.key === 'Escape' ) {
      props.onKeyUpEscape?.()
      emit( 'escape' )
    }
  }
</script>