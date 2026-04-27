<template>
  <div class="page-layout popup">
    <div class="page-layout__layout-top pb-2" v-if="!!$slots.actions">
      <slot name="actions"/>
    </div>
  
    <div class="page-layout__search" v-if="!!$slots.search">
      <slot name="search"/>
    </div>
    <div class="page-layout__no-search" v-else/>
  
    <div class="page-layout__content">
      <slot name="content"/>
    </div>

    <div class="page-layout__layout-bottom">
      <slot name="actionsbottom"/>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import '@/shared/assets/scss/components/containers/modal.scss'

  const props = defineProps({
    title: {
      type: String,
      default: ''
    }
  })

  defineSlots<{
    actions: () => any,
    search: () => any,
    content: () => any,
    actionsbottom: () => any,
  }> ()

</script>
