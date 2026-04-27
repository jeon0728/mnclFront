<template>
  <header class="header">
    <div class="header-inner">
      <div class="header-title flex" style="cursor: pointer" @click="onClickHome">
        <img v-if="isDefaultLogo" src="@/shared/assets/image/logo.svg" alt="logo" height="24"/>
        <img v-else :src="logoUrl" alt="logo" height="36"/>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
  import {
    useLogoStore, useMenuStore, menuList, getMenuMap 
  } from '@/shared/store'
  import { useRouter } from 'vue-router'

  const router = useRouter()
  const menuStore = useMenuStore()

  const logoStore = useLogoStore()

  const logoUrl = computed(() => logoStore.getLogoUrl)

  // 기본 로고인지 확인 (storeLogo가 기본 로고 경로 문자열이거나 잘못된 경로인 경우)
  const isDefaultLogo = computed(() => {
    const storeLogo = logoStore.getLogoUrl
    return (
      storeLogo === '/shared/assets/image/logo.png' ||
      !storeLogo ||
      storeLogo.startsWith('/shared/')
    )
  })

  const onClickHome = () => {
    const menuId = menuStore.selectHome(menuList.value)
    const menuUrl = getMenuMap(menuId).menuUrl
    menuStore.selectMenu(menuId)
    router.push(menuUrl)
  }
</script>

<style src="@/shared/assets/scss/components/containers/header.scss"/>
