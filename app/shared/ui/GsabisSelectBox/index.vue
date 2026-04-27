<template>
  <div 
    :class="uniqueClass"
    :style="{ '--popover-max-height': popoverMaxHeight }"
  >
    <SelectBox
      ref="selectRef"
      class="gsabis-select-box"
      :modelValue="input"
      @update:modelValue="handleUpdateModelValue"
      v-bind="defaultProps"
      v-on="listeners"
    >
      <template #rightArea="{ onClick }">
        <PhCaretDown size="18" @click="onClick"/>
      </template>
      <template v-for="(_, name) in filteredSlots" #[name]="slotProps">
        <slot :name="name" v-bind="slotProps"/>
      </template>
    </SelectBox>
  </div>
</template>

<script setup lang="ts">
  import { forwardExpose, SelectBox } from 'zenith-pulse-vue'
  import type { GsabisSelectBoxProps, GsabisSelectBoxSlots } from './GsabisSelectBox.types'
  import { transformEventListeners } from '@/shared/utils'
  import { PhCaretDown } from '@phosphor-icons/vue'
  import { onMounted } from 'vue'

  const props = withDefaults( defineProps<GsabisSelectBoxProps>(), {
    focusOpen: true,
    defaultValueExpress: 'code',
    maxPopoverHeight: '300px',
    maxVisibleItems: 10,
  } )
  const { modelValue, maxPopoverHeight, maxVisibleItems, disabled, addContainerClass, ...rest } = props

  const uniqueId = `gsabis-select-${Math.random().toString(36).substr(2, 9)}`
  const uniqueClass = `gsabis-select-wrapper-${uniqueId}`

  const popoverMaxHeight = computed(() => {
    // maxVisibleItems가 설정되어 있으면 항목 개수 기반으로 높이 계산
    if (props.maxVisibleItems) {
      const itemHeight = 36 // 각 항목의 높이 (padding 포함)
      return `${props.maxVisibleItems * itemHeight}px`
    }
  
    // 아니면 maxPopoverHeight 사용
    if (typeof props.maxPopoverHeight === 'number') {
      return `${props.maxPopoverHeight}px`
    }
    return props.maxPopoverHeight
  })



  const defaultProps = computed( () => {
    // addContainerClass 병합 (외부에서 전달된 클래스와 uniqueId 결합)
    const containerClass = props.addContainerClass 
      ? `${props.addContainerClass} ${uniqueId}`.trim()
      : uniqueId
  
    return {
      ...rest,
      source: props.source,
      disabled: props.disabled,
      addContainerClass: containerClass,
      popover: {
        ...props.popover,
        'data-select-id': uniqueId // data attribute로 연결
      }
    }
  } )

  const emit = defineEmits<{ 'update:modelValue': [value: any] }>()

  const input = ref<GsabisSelectBoxProps[ 'modelValue' ]>( props.modelValue )

  watch( () => props.modelValue, ( v ) => {
    if (v !== input.value) {
      input.value = v
    }
  }, { immediate: true } )

  watch( input, ( v ) => {
    if (v !== props.modelValue) {
      emit( 'update:modelValue', v )
    }
  } )

  defineSlots<GsabisSelectBoxSlots>()
  const slots = useSlots()
  const filteredSlots = computed(() => {
    const filtered: Record<string, any> = {}

    Object.keys(slots).forEach(slotName => {
      if (![ 'rightArea' ].includes(slotName)) {
        filtered[slotName] = slots[slotName]
      }
    })

    return filtered
  } )

  const attrs = useAttrs()
  const allListeners = transformEventListeners( attrs )
  const { 'update:modelValue': _omitUpdate, ...listeners } = allListeners

  const handleUpdateModelValue = (value: any) => {
    input.value = value
    emit('update:modelValue', value)
  }

  const selectRef = ref()
  const inputElementRef = ref<HTMLInputElement>()
  const observerRef = ref<MutationObserver>()

  onMounted(() => {
    nextTick(() => {
      // SelectBox 내부 input 요소 찾기
      let inputElement = selectRef.value?.inputWrapperRef?.input
    
      if (!inputElement && selectRef.value?.$el) {
        inputElement = selectRef.value.$el.querySelector('input')
      }
    
      if (inputElement) {
        inputElementRef.value = inputElement
      
        // 키보드 이벤트 처리
        inputElement.addEventListener('keydown', (e: KeyboardEvent) => {
          // 열려있는 팝오버 찾기
          const popover = Array.from(document.querySelectorAll('.popover')).find(
            el => (el as HTMLElement).offsetParent !== null && el.querySelector('.select-box-item')
          ) as HTMLElement | undefined
        
          if (!popover) return
        
          // 위/아래 화살표 키 - 포커스된 항목 스크롤
          if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
            requestAnimationFrame(() => {
              const focusedItem = popover.querySelector('.select-box-item.focus, .select-box-item:hover, .select-box-item.active')
              if (focusedItem) {
                (focusedItem as HTMLElement).scrollIntoView({ block: 'nearest', inline: 'nearest' })
              }
            })
            return
          }
        
          // Enter 키 - 선택
          if (e.key === 'Enter') {
            const focusedItem = popover.querySelector('.select-box-item.focus, .select-box-item:hover, .select-box-item.active')
            if (!focusedItem) return
          
            e.preventDefault()
            e.stopPropagation()
          
            const itemText = (focusedItem as HTMLElement).textContent?.trim() || ''
          
            // source에서 매칭되는 항목 찾기
            if (props.source && itemText) {
              const matchedItem = props.source.find(item => 
                itemText.includes(item.name) || itemText.includes(item.code)
              )
            
              if (matchedItem) {
                const codeValue = matchedItem[props.defaultValueExpress || 'code']
              
                // 값 직접 업데이트
                input.value = codeValue
                emit('update:modelValue', codeValue)
              
                // 팝오버 닫기
                nextTick(() => {
                  (focusedItem as HTMLElement).click()
                })
              }
            }
          }
        }, { capture: true })
      }
    
      // 팝오버 스타일 적용 함수
      const applyPopoverStyle = () => {
        // 짧은 지연 후 팝오버 찾기
        requestAnimationFrame(() => {
          const popovers = document.querySelectorAll('.popover')
          popovers.forEach((popover) => {
            const popoverElement = popover as HTMLElement
            // 보이는 팝오버이고 select-box-item이 있으면 적용
            if (popoverElement.offsetParent !== null && popoverElement.querySelector('.select-box-item')) {
              // CSS 변수도 함께 설정 (CSS에서 사용)
              popoverElement.style.setProperty('--popover-max-height', popoverMaxHeight.value)
              // 인라인 스타일 직접 설정 (더 높은 우선순위)
              popoverElement.style.maxHeight = popoverMaxHeight.value
              popoverElement.style.overflowY = 'auto'
              popoverElement.style.overflowX = 'hidden'
            }
          })
        })
      }
    
      // MutationObserver로 팝오버 생성 감지
      const observer = new MutationObserver(() => {
        applyPopoverStyle()
      })
    
      observerRef.value = observer
      observer.observe(document.body, { 
        childList: true, 
        subtree: true 
      })
    
      // input 이벤트에도 스타일 적용
      if (inputElement) {
        inputElement.addEventListener('focus', applyPopoverStyle)
        inputElement.addEventListener('click', applyPopoverStyle)
      }
    })
  })

  // 컴포넌트 언마운트 시 observer 정리
  onUnmounted(() => {
    if (observerRef.value) {
      observerRef.value.disconnect()
    }
  })

  defineExpose( forwardExpose( selectRef ) )
</script>

<style lang="scss" src="@/shared/assets/scss/components/ui/selectbox.scss"></style>