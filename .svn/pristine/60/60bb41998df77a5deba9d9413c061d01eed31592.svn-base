<template>
  <div :class="`z-tab${ getClassNameByMode( mode ) }`">
    <div class="z-tab__header-wrapper">
      <ul class="z-tab__header">
        <li
          v-for="({ key, name }) in tabDataWrap"
          :key="key"
          :class="`z-tab__header__list ${isActiveTab(key) ? '' : ' tab-no-active'}`"
          @click.stop="() => handleTitleClick(key)"
        >
          {{ name }}
        </li>
      </ul>
    </div>

    <div class="z-tab__body-wrapper">
      <Layout height="*" class="z-tab__body">
        <div
          v-for="({ key, name, isFullHeight }) in tabDataWrap"
          :key="key"
          :ref="el => { if(el) tabBodyRefs[key] = el as HTMLElement }"
          :class="`body__element${isActiveTab(key) ? '' : ' tab-no-active'}${isFullHeight ? ' full-height' : ''}`"
        >
          <slot :name="key || name"/>
        </div>
      </Layout>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed, nextTick, ref } from 'vue'
  import type { TabProps } from './Tab.types'

  /**
   * 탭(Tab) UI 컴포넌트
   *
   * @component
   * @description
   * - 여러 콘텐츠를 탭 형태로 구성할 수 있는 컴포넌트입니다.
   * - 각 탭의 콘텐츠는 named slot으로 전달받습니다.
   *
   * @example
   * ```vue
   * <!-- 기본 탭 사용 -->
   * <Tab
   *   :tabData="[
   *     { key: 'tab1', name: '첫 번째 탭' },
   *     { key: 'tab2', name: '두 번째 탭', isFullHeight: true }
   *   ]"
   *   @change="handleTabChange"
   * >
   *   <template #tab1>
   *     <div>첫 번째 탭 콘텐츠</div>
   *   </template>
   *   <template #tab2>
   *     <div>두 번째 탭 콘텐츠 (풀 높이)</div>
   *   </template>
   * </Tab>
   * ```
   */
  defineOptions({
    name: 'Tab'
  } )

  const props = withDefaults( defineProps<TabProps>(), {
    mode: 'default',
  } )
  const { tabData, mode } = props

  const emit = defineEmits<{
    ( e: 'change', key: string ): void
  }>()

  const tabDataWrap = computed( () =>
    tabData
      .filter( f => typeof f === 'object' )
      .map( d => ( { ...d, key: d.key || d.name } ) )
  )

  const activeTabKey = ref<string>( tabDataWrap.value[ 0 ]?.key || tabDataWrap.value[ 0 ]?.name )
  const tabBodyRefs = ref<Record<string, HTMLElement>>( {} )

  const isActiveTab = ( key: string ) => activeTabKey.value === key

  const getClassNameByMode = ( mode: string ) => {
    const classNameByMode: Record<typeof mode, string> = {
      default: ' default-tab',
      flex: ' flex-tab'
    }
    return classNameByMode[ mode ] || ''
  }

  const handleTitleClick = ( key: string ) => {
    activeTabKey.value = key
    emit( 'change', key )

    if ( mode === 'flex' ) {
      const tabBodyElement = tabBodyRefs.value[ key ]
      const parentElement = document.querySelector( '.z-tab__body-wrapper' ) as HTMLElement
      if ( !parentElement || !tabBodyElement ) return

      const parentRect = parentElement.getBoundingClientRect()
      const childRect = tabBodyElement.getBoundingClientRect()
      const scrollOffset = childRect.top - parentRect.top + parentElement.scrollTop

      nextTick( () => {
        parentElement.scrollTo( {
          top: scrollOffset,
          behavior: 'smooth'
        } )
      } )
    }
  }
</script>


<style src="@/shared/assets/scss/components/containers/tab.scss"/>
