<template>
  <ModalOverlay :is-visible="true" @key-up-escape="setRemoveMessages">
    <div
      ref="wrapperRef"
      :class="['message-container', type, active ? 'active' : 'inactive']"
      :style="containerStyle"
      tabindex="-1"
      @keydown="handleKeydown"
      @keyup="handleKeyup"
      @blur="handleBlur"
    >
      <div class="message-top">
        <PhX
          class="message-icon-close"
          color="#808080"
          :size="20"
          :style="{ cursor: 'pointer' }"
          @click="handleClose"
        />
      </div>

      <div class="message-header">
        <component :is="getIconComponentByType(type)"/>
        {{ title || (type === 'yesnocancel' ? 'QUESTION' : type.toUpperCase()) }}
      </div>

      <div class="message-content">
        <component v-if="renderContent" :is="renderContent"/>
        <template v-else>{{ message }}</template>
      </div>

      <!-- class: 0이면(버튼이 한개면) 포커스 붙이지 않기 -->
      <div class="message-footer flex">
        <div
          v-for="(buttonProps, idx) in getButtonsPropByType(type)"
          :key="`${buttonProps.children}${idx}`"
          v-bind="$attrs"
          :class="{ focus: focusButtonIndex === idx && getButtonsPropByType(type).length -1 !== 0 }"
          @click="(e) => buttonProps?.onClick?.(e)"
        >
          {{ buttonProps.children }}
        </div>
      </div>
    </div>
  </ModalOverlay>
</template>

<script setup lang="ts">
  import { ref, onMounted, onUnmounted, nextTick, type CSSProperties } from 'vue'
  import ModalOverlay from '../Overlay/index.vue'
  import { type MessageData, useMessageStore } from '@/shared/store'
  import { useLanguage } from '@/shared/composables'
  import { PhCheckCircle, PhWarningCircle, PhWarning, PhX } from '@phosphor-icons/vue'

  const props = defineProps<MessageData>()

  const { setRemoveMessages } = useMessageStore()

  const lang = useLanguage()

  const { type, title, renderContent, isBlurClose = false } = props.options

  const wrapperRef = ref<HTMLDivElement>()
  const active = ref<boolean>(false)
  const focusButtonIndex = ref<number>(0)
  const containerStyle = ref<CSSProperties>({
    width: window.innerWidth < 800 ? '90%' : '230px'
  })

  // 모달이 뜨기 "전에" 눌린 Enter를 떼는 keyup이 들어와 자동으로 OK 처리되는 버그 방지:
  // 모달 내부에서 Enter keydown을 한번이라도 받기 전까지는 첫 Enter keyup을 무시한다.
  const hasSeenEnterKeydown = ref(false)

  let resizeTimer: NodeJS.Timeout | null = null

  const handleResize = () => {
    if (resizeTimer) clearTimeout(resizeTimer)

    resizeTimer = setTimeout(() => {
      containerStyle.value = {
        width: window.innerWidth < 800 ? '95%' : '230px'
      }
    }, 300)
  }

  const getIconComponentByType = (type: any) => {
    switch (type) {
      case 'info':
      case 'yesnocancel':
      case 'question':
        return {
          render: () =>
            h(PhWarningCircle, {
              weight: 'fill',
              size: 24,
              style: { transform: 'rotate(180deg)' }
            })
        }
      case 'warning':
        return {
          render: () =>
            h(PhWarning, {
              weight: 'fill',
              size: 24
            })
        }
      case 'success':
        return {
          render: () =>
            h(PhCheckCircle, {
              weight: 'fill',
              size: 24
            })
        }
      case 'error':
        return {
          render: () =>
            h(PhWarningCircle, {
              weight: 'fill',
              size: 24
            })
        }
      default:
        return null
    }
  }

  const getButtonsPropByType = (type: any): any => {
    const buttons: any[] = []

    const handleClickResolve = (value: boolean | string) => {
      props.resolve(value as boolean)
      setRemoveMessages()
    }

    switch (type) {
      case 'question':
        buttons.push({
          children: lang('confirm'),
          onClick: () => handleClickResolve(true)
        })
        buttons.push({
          children: lang('cancel'),
          onClick: () => handleClickResolve(false)
        })
        break

      case 'info':
      case 'warning':
      case 'error':
        buttons.push({
          children: lang('ok'),
          onClick: () => handleClickResolve(true)
        })
        break

      case 'yesnocancel':
        buttons.push({
          children: lang('yes'),
          onClick: () => handleClickResolve('yes')
        })
        buttons.push({
          children: lang('no'),
          onClick: () => handleClickResolve('no')
        })
        buttons.push({
          children: lang('cancel'),
          onClick: () => handleClickResolve('cancel')
        })
        break

      default:
        buttons.push({
          children: lang('확인'),
          onClick: () => handleClickResolve(true)
        })
    }

    return buttons
  }

  const handleClose = () => {
    active.value = false
    setRemoveMessages()
  }

  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') hasSeenEnterKeydown.value = true
  }

  const handleKeyup = (e: KeyboardEvent) => {
    const { key, code } = e
    const buttonsProps = getButtonsPropByType(type)

    if (key === 'Escape') {
      handleClose()
      return
    }

    if (key === 'ArrowRight' || key === 'ArrowLeft') {
      const focusIdx = focusButtonIndex.value + (key === 'ArrowRight' ? 1 : -1)

      if (
        (key === 'ArrowRight' && focusButtonIndex.value === buttonsProps.length - 1) ||
        (key === 'ArrowLeft' && focusButtonIndex.value === 0)
      )
        return

      focusButtonIndex.value = focusIdx
    }

    if (key === 'Enter') {
      if (!hasSeenEnterKeydown.value) {
        // 로그인에서 Enter를 누른 채로 열린 메시지의 "Enter 떼기(keyup)"는 무시
        // 이후 사용자가 모달에서 실제로 Enter를 누르면(keydown) 정상 동작
        hasSeenEnterKeydown.value = true
        return
      }
      buttonsProps[focusButtonIndex.value]?.onClick?.(e)
      return
    }

    if (code === 'Space') {
      buttonsProps[focusButtonIndex.value]?.onClick?.(e)
    }
  }

  const handleBlur = () => {
    if (isBlurClose) handleClose()
  }

  onMounted(async () => {
    await nextTick()

    if (wrapperRef.value) {
      wrapperRef.value.focus()

      setTimeout(() => {
        active.value = true
      })
    }

    window.addEventListener('resize', handleResize)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
    if (resizeTimer) clearTimeout(resizeTimer)
  })
</script>

<style scoped lang="scss" src="@/shared/assets/scss/components/ui/message-modal.scss"></style>
