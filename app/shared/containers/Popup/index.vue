<template>
  <Overlay :isVisible="!!props">
    <div
      tabindex="-1"
      class="modal-wrapper"
      @keydown="handleWrapperKeyDown"
      @mousemove="handleMouseMove"
      @mouseup="handleMouseUp"
      @mouseleave="handleMouseLeave"
    >
      <Layout height="*">
        <div
          class="modal"
          ref="modalRef"
          :class="{ grap: isGrab }"
          tabindex="-1"
          :style="modalWrapperStyle"
          @keyDown="handleWrapperKeyDown"
        >
          <div class="resizer se" @mousedown="(e) => handleResizerMouseDown(e, true, true)"/>
          <div class="resizer e" @mousedown="(e) => handleResizerMouseDown(e, true, false)"/>
          <div class="resizer s" @mousedown="(e) => handleResizerMouseDown(e, false, true)"/>
          <Layout class="modal__header">
            <section
              class="flex modal__title"
              @mousedown="handleMouseDown"
              @dblclick="handleDoubleClick"
            >
              <span>{{ title }}</span>
              <div class="title__icon">
                <div class="resize-icon">
                  <PhCards v-if="!!fullScreen" @click="fullScreen = false"/>
                  <PhFrameCorners v-else @click="fullScreen = true"/>
                </div>
                <div class="close-icon">
                  <PhX @click="handleCancel"/>
                </div>
              </div>
            </section>
          </Layout>
          <Layout class="modal__content">
            <slot name="default"/>
          </Layout>
        </div>
      </Layout>
    </div>
  </Overlay>
</template>
<script lang="ts" setup>
  import '@/shared/assets/scss/components/containers/modal.scss'
  import { Overlay } from '@/shared/containers'
  import { useModalStore } from '@/shared/store/modals'
  import { PhCards, PhFrameCorners, PhX } from '@phosphor-icons/vue'

  interface ModalWrapperProps {
    title?: string
    width?: number | string
    height?: number | string
    minWidth?: number
    minHeight?: number
    full?: boolean
  }

  const props = withDefaults(defineProps<ModalWrapperProps>(), {
    minWidth: 300,
    minHeight: 400,
    full: false
  })
  const emit = defineEmits<{ (e: 'cancel'): void }>()
  const { removeModal } = useModalStore()
  const modalRef = ref<HTMLDivElement>()

  const isGrab = ref(false)
  const fullScreen = ref(false)
  const isResize = ref(false)
  const isResizeX = ref(false)
  const isResizeY = ref(false)

  function getNumberPixel(pixel: string | number): number {
    return Number(String(pixel).replace(/[^0-9]/g, ''))
  }

  const size = reactive({
    width: typeof props.width === 'number' ? props.width : getNumberPixel(props.width || 400),
    height: typeof props.height === 'number' ? props.height : getNumberPixel(props.height || 600)
  })

  const initClient = reactive<Record<string, number>>({})
  const moveClient = reactive<Record<string, number>>({})
  const modalWrapperStyle = computed(() => ({
    width: fullScreen.value ? '99%' : `${size.width}px`,
    height: fullScreen.value ? '99%' : `${size.height}px`,
    left: fullScreen.value ? '9px' : `${moveClient.x}px`,
    top: fullScreen.value ? '3px' : `${moveClient.y}px`
  }))

  const handleResize = () => {
    const { width, height, left, top } = modalWrapperStyle.value

    if (!fullScreen.value && window.innerWidth < Number(width) + Number(left)) {
      fullScreen.value = true
    }
    if (!fullScreen.value && window.innerHeight < Number(height) + Number(top)) {
      fullScreen.value = true
    }
  }

  const handleWrapperKeyDown = (e: KeyboardEvent): void => {
    const { code } = e

    if (code === 'Escape') {
      handleCancel()
      e.preventDefault()
    }
  }

  const handleCancel = () => {
    removeModal()
    emit('cancel')
  }

  const handleMouseDown = (e: MouseEvent): void => {
    const { clientX: initialClientX, clientY: initialClientY } = e

    isGrab.value = true
    Object.assign(initClient, { initialClientX, initialClientY })
  }

  const handleMouseMove = (e: MouseEvent): void => {
    const { clientX, clientY } = e
    const { initialClientX, initialClientY } = initClient
    const moveClientX = clientX - initialClientX
    const moveClientY = clientY - initialClientY

    if (isGrab.value && !fullScreen.value && modalRef.value) {
      const { offsetTop, offsetLeft } = modalRef.value

      Object.assign(moveClient, {
        x: offsetLeft + moveClientX,
        y: offsetTop + moveClientY
      })
      Object.assign(initClient, {
        initialClientX: clientX,
        initialClientY: clientY
      })
    }

    if (isResize.value && !fullScreen.value) {
      handleResizerMouseMove(e)
    }
  }

  const handleMouseUp = (): void => {
    isGrab.value = false
    isResize.value = false
  }

  const handleMouseLeave = (e: MouseEvent): void => {
    isGrab.value = false
    isResize.value = false
    e.preventDefault()
  }

  const handleDoubleClick = (): void => {
    fullScreen.value = !fullScreen.value
  }

  const handleResizerMouseDown = (e: MouseEvent, x: boolean, y: boolean): void => {
    const { clientX: initialClientX, clientY: initialClientY } = e

    isResize.value = true
    isResizeX.value = x
    isResizeY.value = y

    Object.assign(initClient, { initialClientX, initialClientY })
  }

  const handleResizerMouseMove = (e: MouseEvent): void => {
    const { clientX, clientY } = e
    const { initialClientX, initialClientY } = initClient
    const resizeClientX = clientX - initialClientX
    const resizeClientY = clientY - initialClientY

    if (isResize.value) {
      const { width, height } = size

      if (isResizeX.value) {
        size.width = Math.max(props.minWidth, Number(width) + resizeClientX)
      }
      if (isResizeY.value) {
        size.height = Math.max(props.minHeight, Number(height) + resizeClientY)
      }

      Object.assign(initClient, {
        initialClientX: clientX,
        initialClientY: clientY
      })
    }
  }

  onMounted(() => {
    if (modalRef.value) {
      modalRef.value?.focus()

      const { innerWidth, innerHeight } = window
      const { width, height, left = 0, top = 0 } = modalWrapperStyle.value

      if (!fullScreen.value && innerWidth < Number(width) + Number(left)) {
        fullScreen.value = true
      }
      if (!fullScreen.value && innerHeight < Number(height) + Number(top)) {
        fullScreen.value = true
      }

      Object.assign(moveClient, {
        x: innerWidth / 2 - size.width / 2,
        y: innerHeight / 2 - size.height / 2
      })
    }

    window.addEventListener('resize', handleResize)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
  })
</script>
