<template>
  <div class="router-tab">
    <div class="router-tab__header-wrapper">
      <ul ref="tabWrapperRef" class="router-tab__header">
        <li
          v-for="({ key, name }, idx) in tabStore.tabData.filter((t) => !!t.name)"
          :key="key"
          :class="`router-tab__header__list${
            isCurrentTab(key) ? '' : ' tab-no-active'
          }${getOrdinaryTabClassName(idx)}`"
          @click.stop="handleChangeCurrentTab(key)"
        >
          <PhHouseLine v-if="key === 'home'" class="mr-2"/>
          <div class="list__title" :title="name">{{ name }}</div>
          <span
            v-if="name !== 'Home'"
            class="ml-2 list__icon"
            @click.stop="handleCloseClick(key, idx)"
          >
            ✕
          </span>
        </li>
        <li class="router-tab__actions">
          <div class="router-tab__actions-delete" @click.stop="handleClearTab">Close All</div>
        </li>
      </ul>
    </div>
    <div class="router-tab__body-wrapper">
      <slot/>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { nextTick, onMounted, ref, watch } from 'vue'
  import { useRoute } from 'vue-router'
  import { menuMap, useTabStore } from '@/shared/store'
  import { useLanguage, useLink } from '@/shared/composables'
  import { PhHouseLine } from '@phosphor-icons/vue'
  import type { RouterTabProps } from './RouterTab.types'
  import { Tab } from '..'

  const props = defineProps<RouterTabProps>()

  const tabStore = useTabStore()
  const { tabData, addTabData, removeTabData, clearTabData, increaseTabCount, getTabDataByKey } =
    tabStore
  const link = useLink()
  const lang = useLanguage()

  const activeTab = ref<string>()
  const tabWrapperRef = ref<HTMLElement | null>(null)

  const route = useRoute()

  const isCurrentTab = computed(() => (key: string) => activeTab.value === key)

  const getOrdinaryTabClassName = (tabIndex: number) => {
    let tabClassName = ''
    if (tabIndex === 0) tabClassName += ' first'
    if (tabIndex === tabData.length - 1) tabClassName += ' last'
    return tabClassName
  }

  const handleChangeCurrentTab = async (tabCode: string) => {
    if (activeTab.value === tabCode) return
    await link(tabCode, {})
    activeTab.value = tabCode
  }

  const handleCloseClick = async (key: string, idx: number) => {
    if (activeTab.value === key) {
      const tabCode = tabData[idx - 1]?.key || 'home'
      await link(tabCode, {})
      activeTab.value = tabCode
    }

    removeTabData(key)
  }

  const handleClearTab = async () => {
    const tabCode = 'home'
    await link(tabCode, {})
    clearTabData()
    nextTick(() => {
      activeTab.value = tabCode
    })
  }

  const setWrapperScrollEventListener = () => {
    const listener = (e: WheelEvent) => {
      if (!tabWrapperRef.value) return
      tabWrapperRef.value.scrollLeft += e.deltaY
    }
    tabWrapperRef.value?.addEventListener('wheel', listener)
    return () => tabWrapperRef.value?.removeEventListener('wheel', listener)
  }

  watch(
    () => tabStore._currentTab,
    (newCurrentTab) => {
      activeTab.value = newCurrentTab?.menuId

      const tabItem = getTabDataByKey(newCurrentTab.menuId)
      if (!tabItem.key && newCurrentTab.menuId) {
        addTabData({
          key: newCurrentTab.menuId,
          name: lang(newCurrentTab.menuNm),
          path: newCurrentTab.menuUrl,
          count: 0
        })
      }
    },
    { immediate: true }
  )

  onMounted(() => {
    const tab = Object.keys(menuMap.value)
      .map((key) => menuMap.value[key])
      .find(({ menuId }) => menuId === route.path)
    if (!tab && route.path !== '/') return
    const menuId = route.path === '/' ? 'home' : tab?.menuId

    handleChangeCurrentTab(menuId)

    const removeWrapperScrollEventListener = setWrapperScrollEventListener()
    onUnmounted(() => {
      removeWrapperScrollEventListener()
    })
  })
</script>

<style src="@/shared/assets/scss/components/containers/router-tab.scss"/>
