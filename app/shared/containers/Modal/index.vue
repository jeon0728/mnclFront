<template>
  <Overlay 
    v-for="modal in modals" 
    :key="`modal-${modal._id}`"
    :isVisible="!!modal"
  >
    <component
      :is="getAsyncComponent( modal )"
      :param="modal.param"
      :onConfirm="modal.onConfirm"
      :onCancel="modal.onCancel"
    />
  </Overlay>
</template>
<script lang="ts" setup>
  import '@/shared/assets/scss/components/containers/modal.scss'
  import { Overlay } from '@/shared/containers'
  import { useModalStore } from '@/shared/store/modals'
  import { storeToRefs } from 'pinia'
  import { defineAsyncComponent, shallowRef, watchEffect } from 'vue'

  const modalStore = useModalStore()
  const { modals } = storeToRefs( modalStore )

  // 모달 컴포넌트 캐시 (modal._id -> AsyncComponent)
  const componentCache = new Map()

  const getAsyncComponent = ( modal: any ) => {
    if ( !modal._id || !modal.Component ) return null
  
    // 이미 캐시된 컴포넌트가 있으면 재사용
    if ( componentCache.has( modal._id ) ) {
      return componentCache.get( modal._id )
    }
  
    // 새로운 AsyncComponent 생성 및 캐싱
    const loader = typeof modal.Component === 'function' 
      ? modal.Component 
      : () => modal.Component
    
    const asyncComp = defineAsyncComponent( {
      loader,
      suspensible: false
    } )
  
    componentCache.set( modal._id, asyncComp )
    return asyncComp
  }

  // 모달이 제거되면 캐시에서도 제거
  watchEffect( () => {
    const modalIds = new Set( modals.value.map( m => m._id ) )
  
    // 캐시에 있지만 modals에 없는 항목 제거
    for ( const id of componentCache.keys() ) {
      if ( !modalIds.has( id ) ) {
        componentCache.delete( id )
      }
    }
  } )

</script>


