<template>
  <li
    :class="`notify-wrapper ${ props.notifyType } outline${ active ? ' active' : '' }`"
    :style="{ top: `${ 6 + idx * 52 }px` }"
  >
    <div v-if="!!notifyType" class="notify-icon">
      <component
        :is="getIconComponentByType( props.notifyType )"
        :size="24"
        weight="fill"
      />
    </div>
    <div class="notify-message">{{ props.message }}</div>
    <div v-if="!notClose" class="notify-close">
      <PhX @click="() => onClickClose( notifyId! )"/>
    </div>
  </li>
</template>
<script lang="ts" setup>
  import '@/shared/assets/scss/components/containers/notify.scss'
  import type { NotifyItem } from '@/shared/types/store'
  import { PhWarningCircle, PhWarning, PhCheckCircle, PhX } from '@phosphor-icons/vue'
  import { useNotificationStore } from '@/shared/store'

  interface NotifyItemProps extends NotifyItem {
    idx: number
    notifyType: string
    onClick?: ( notifyId: string ) => void
  }

  const props = defineProps<NotifyItemProps>()
  const emits = defineEmits<{
    ( e: 'click', id: string ): void
  }>()

  const active = ref<boolean>( false )
  const { setRemoveNotification } = useNotificationStore()

  const getIconComponentByType = ( type: string ) => {
    switch ( type ) {
      case 'info': return PhWarningCircle
      case 'warning': return PhWarning
      case 'success': return PhCheckCircle
      case 'alert': return PhWarningCircle
      default: return null
    }
  }

  const onClickClose = ( id: string ) => {
    active.value = true
  
    setTimeout( () => {
      setRemoveNotification( props.notifyId! )
    }, 500 )
    emits( 'click', id )
  }

  onMounted( () => {
    const waitMs = props.durationMs ?? 3500
    setTimeout( () => {
      active.value = true
    
      setTimeout( () => {
        active.value = false
        setRemoveNotification( props.notifyId! )
      }, 500 )
    }, waitMs )
  } )
</script>