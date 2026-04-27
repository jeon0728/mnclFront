<template>
  <div class="pagination-bar-container flex">
    <PhCaretDoubleLeft
      v-if="pages[0] !== '1'"
      class="pagination-bar-icon"
      @click="() => handleClick('1')"
    />
    <PhCaretLeft
      v-if="currentPage !== 1"
      class="pagination-bar-icon"
      @click="() => movePage(-1)"
    />
    <div
      v-for="(page, idx) in pages"
      :key="`${page}${idx}`"
      class="pagination-bar-page"
      :class="{ active: page === String(currentPage) }"
      @click="() => page !== REST_SEPARATOR && handleClick(page)"
    >
      {{ page }}
    </div>
    <PhCaretRight
      v-if="currentPage !== maxPage"
      class="pagination-bar-icon"
      fontIcon="mdi-chevron-right"
      @click="() => movePage(1)"
    />
  </div>
</template>
<script setup lang="ts">
  import { computed, ref, watch } from 'vue'
  import { PhCaretDoubleLeft, PhCaretLeft, PhCaretRight } from '@phosphor-icons/vue'

  const REST_SEPARATOR = '...'

  interface PaginationBarProps {
    //페이지네이션 개수
    displayPageCount?: number
    //총 아이템 개수
    totalItemCount: number
    //페이지당 아이템 개수
    maxItemCount?: 10 | 30 | 50 | 100
  }

  interface Emits {
    ( e: 'change', nextPage: string, currentPage: string ): void
    ( e: 'click', nextPage: string, currentPage: string ): void
  }

  const props = withDefaults( defineProps<PaginationBarProps>(), {
    displayPageCount: 10,
    maxItemCount: 100,
  } )
  const emit = defineEmits<Emits>()

  const pages = ref<string[]>( [] )
  const currentPage = ref<number>( 1 )
  const maxPage = ref<number>( 0 )

  const pageCount = computed( () => {
    // 총 페이지 = Math.ceil(총아이템/페이지당아이템)
    return Math.max( 1, Math.ceil( props.totalItemCount / props.maxItemCount ) )
  } )

  watch(
    () => props.totalItemCount,
    () => {
      // 총 아이템 변경 시 1페이지로
      const prev = currentPage.value
      currentPage.value = 1
      emit( 'change', String( 1 ), String( prev ) )
    },
    { immediate: true }
  )

  watch(
    () => [ props.totalItemCount, props.maxItemCount, currentPage.value ],
    () => {
      maxPage.value = pageCount.value
    
      if ( pageCount.value <= 1 ) {
        pages.value = [ '1' ]
        return
      }
    
      const allPages = Array.from( { length: pageCount.value }, ( _, i ) => String( i + 1 ) )
      if ( pageCount.value <= props.displayPageCount ) {
        pages.value = allPages
        return
      }
    
      const isLastRestSeparator =
        props.displayPageCount <= pageCount.value - currentPage.value + 1
    
      const displayPages = allPages.reduce<string[]>( ( acc, page ) => {
        const n = Number( page )
        if ( n < pageCount.value - props.displayPageCount + 1 && n < currentPage.value - 1 ) {
          return acc
        }
        const edge = currentPage.value === 1 ? props.displayPageCount - 2 : props.displayPageCount - 3
        if ( isLastRestSeparator && n >= currentPage.value + edge ) {
          return acc
        }
        acc.push( page )
        return acc
      }, [] )
    
      if ( isLastRestSeparator ) {
        displayPages.push( REST_SEPARATOR )
        displayPages.push( String( pageCount.value ) )
      }
    
      pages.value = displayPages
    },
    { immediate: true }
  )

  const movePage = ( pageDirection: number ) => {
    const atEdge =
      ( pageDirection === -1 && currentPage.value === 1 ) ||
      ( pageDirection === 1 && currentPage.value === maxPage.value )
    if ( atEdge ) return
    const next = currentPage.value + pageDirection
  
    emit( 'click', String( next ), String( currentPage.value ) )
    emit( 'change', String( next ), String( currentPage.value ) )
  
    currentPage.value = next
  }

  const handleClick = ( page: string ) => {
    const nextIndex = Number( page ) - 1
    if ( nextIndex === currentPage.value - 1 ) return
  
    emit( 'click', page, String( currentPage.value ) )
    emit( 'change', page, String( currentPage.value ) )
  
    currentPage.value = Number( page )
  }
</script>
<style src="@/shared/assets/scss/components/containers/pagination.scss"/>