<template>
  <Teleport to="body">
    <div class="gsabis2-modal">
      <ModalPopup
        v-for="m in modals"
        :key="`modal-${m._id}`"
        :title="getParam(m, 'title') || ''"
        :width="getParam(m, 'width') || 400"
        :height="getParam(m, 'height') || 600"
        :full="getParam(m, 'full') || false"
        @cancel="() => {
          // ModalPopup(상단 X, ESC)로 닫힐 때는 cancel 처리만 호출됨.
          // 일부 모달은 onConfirm 후 onCancel을 연달아 호출하는데(닫기 목적),
          // 이 경우 onCancel까지 실행되면 confirm 결과가 덮어써질 수 있어 무시한다.
          if (isClosedByConfirm(m)) return
          m?.onCancel?.()
        }"
      >
        <template #default>
          <component
            :is="getAsyncComponent(m)"
            :param="m.param"
            :onConfirm="( data: any ) => {
              markClosedByConfirm(m)
              removeModal()
              m.onConfirm( data )
            }"
            :onCancel="
              () => {
                if (isClosedByConfirm(m)) return
                removeModal()
                m.onCancel()
              }
            "
          />
        </template>
      </ModalPopup>
      <!-- 필요 시 추가 UI들 (알림/메시지/팝오버/로딩/커맨드팔레트 등)을 여기에 배치 -->
      <!--
    <ModalCommandPalette />
    -->
      <ModalLoadingBar :is-loading="isLoading"/>
      <ModalNotify>
        <template #default>
          <NotifyItem
            v-for="({ notifyId, type, message, autoClose, notClose, icon, durationMs }, idx) in notifications"
            :key="idx"
            :idx="idx"
            :notifyId="notifyId"
            :notifyType="type"
            :message="message"
            :autoClose="autoClose"
            :notClose="notClose"
            :icon="icon"
            :durationMs="durationMs"
          />
        </template>
      </ModalNotify>
      <ModalMessage
        v-for="(m, idx) in messages"
        :key="idx"
        :message="m.message"
        :options="m.options"
        :resolve="m.resolve"
        :onConfirm="m.onConfirm"
        :onCancel="m.onCancel"
        :onYes="m.onYes"
        :onNo="m.onNo"
      />
    </div>
  </Teleport>
</template>

<script setup lang="ts">
  import ModalPopup from '@/shared/containers/Popup/index.vue'
  import ModalMessage from '@/shared/containers/Message/index.vue'
  import ModalNotify from '@/shared/containers/Notify/index.vue'
  import NotifyItem from '@/shared/containers/Notify/Notify.Item.vue'
  import ModalLoadingBar from '@/shared/containers/ModalLoadingBar/index.vue'
  import {
    useMessageStore,
    useModalStore,
    useNotificationStore,
    useLoadingStore
  } from '@/shared/store'
  import { storeToRefs } from 'pinia'
  import { defineAsyncComponent, watchEffect } from 'vue'

  const modalStore = useModalStore()
  const messageStore = useMessageStore()
  const notificationStore = useNotificationStore()
  const loadingStore = useLoadingStore()

  const { modals } = storeToRefs(modalStore)
  const { messages } = storeToRefs(messageStore)
  const { notifications } = storeToRefs(notificationStore)
  const { isLoading } = storeToRefs(loadingStore)
  const { removeModal } = modalStore

  // onConfirm 이후 모달에서 "닫기" 목적 onCancel이 연달아 호출되는 케이스를 방지하기 위한 플래그
  // (예: onConfirm 호출 후 props.onCancel을 같이 호출하는 모달)
  const markClosedByConfirm = (m: any) => {
    if (!m) return
    m.__closedByConfirm = true
  }
  const isClosedByConfirm = (m: any) => {
    return !!m?.__closedByConfirm
  }

  const getParam = (modal: any, key: string) => {
    const value = modal?.options?.[key] ?? modal?.param?.[key]
    // width, height는 숫자로 반환
    if ((key === 'width' || key === 'height') && typeof value === 'string') {
      return parseInt(value.replace(/[^0-9]/g, '')) || undefined
    }
    // 디버깅: width/height 값 확인
    if ((key === 'width' || key === 'height') && value) {
      console.log(
        `Modal ${key}:`,
        value,
        'from options:',
        modal?.options?.[key],
        'from param:',
        modal?.param?.[key]
      )
    }
    return value
  }

  // 모달 컴포넌트 캐시 (modal._id -> AsyncComponent)
  const componentCache = new Map()

  const getAsyncComponent = (modal: any) => {
    if (!modal._id || !modal.Component) return null

    // 이미 캐시된 컴포넌트가 있으면 재사용
    if (componentCache.has(modal._id)) {
      return componentCache.get(modal._id)
    }

    // 새로운 AsyncComponent 생성 및 캐싱
    const loader = typeof modal.Component === 'function' ? modal.Component : () => modal.Component

    const asyncComp = defineAsyncComponent({
      loader,
      suspensible: false
    })

    componentCache.set(modal._id, asyncComp)
    return asyncComp
  }

  // 모달이 제거되면 캐시에서도 제거
  watchEffect(() => {
    const modalIds = new Set(modals.value.map((m) => m._id))

    // 캐시에 있지만 modals에 없는 항목 제거
    for (const id of componentCache.keys()) {
      if (!modalIds.has(id)) {
        componentCache.delete(id)
      }
    }
  })

  watch(
    () => isLoading,
    (v) => {
      console.log('isOpen: ', v)
    },
    { deep: true }
  )
</script>
<style lang="scss" scoped>
  .gsabis2-modal {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    pointer-events: none;
  }
</style>
