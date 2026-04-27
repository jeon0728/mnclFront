<template>
  <ModalOverlay
    class="none"
    :isVisible="props.isLoading"
  >
    <LoadingDots/>
  </ModalOverlay>
</template>
<script lang="ts" setup>
  import ModalOverlay from '@/shared/containers/Overlay/index.vue'
  import LoadingDots from './LoadingDots.vue'

  const props = defineProps<{ isLoading: boolean }>()
</script>