<template>
  <MainLayout>
    <NuxtPage #default="{ Component, route }">
      <component :is="Component" :key="getCacheKey(route)" />
    </NuxtPage>
  </MainLayout>
  <Modal />
</template>
<script lang="ts" setup>
  import { useSessionStore, useTabStore, useWhCdStore } from '@/shared/store'
  import { useBrowserTabManager } from '@/shared/composables'
  import { TRUE_VALUE } from '@/shared/constants/common/trueFalseValue'
  import Modal from '@/shared/containers/ModalPage/index.vue'

  useHead({ title: 'Gsabis2' })

  useBrowserTabManager()

  const tabStore = useTabStore()

  function getCacheKey(route: any) {
    const findTab = tabStore.tabData.find((tab) => tab.path === route.path)
    if (findTab) {
      return findTab.path + (findTab.version ?? 0)
    }
    return route.path + '0'
  }

  const whStore = useWhCdStore()
  const sessionStore = useSessionStore()

  onBeforeMount(() => {
    const whCd =
      whStore.whCds.find((c) => c.mainWhYn === TRUE_VALUE)?.code || whStore.whCds[0]?.code
    sessionStore.setSession({
      ...sessionStore.session,
      whCd
    })
  })
</script>
