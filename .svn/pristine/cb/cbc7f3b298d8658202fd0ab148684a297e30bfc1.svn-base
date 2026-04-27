<template>
  <div
    ref="wrapperRef"
    @keydown="handleWrapperKeyDown"
    @keyup="handleWrapperKeyUp"
  >
    <Popover
      :active="isOpen"
      :width="popoverStyle.width as number"
      :height="popoverStyle.height as number"
    >
      <template #component>
        <InputWrapper
          v-bind="$attrs"
          ref="inputRef"
          class="flex-1 async"
          v-model="displayInput"
          @change="handleChange"
          @focusin="handleFocus"
          @focusout="handleBlur"
          @keydown="handleKeyDown"
        >
          <template #leftArea v-if="item?.[defaultValueExpress]">
            <div
              v-if="item?.[defaultValueExpress]"
              class="async-code-box-tag"
            >
              {{ formatDisplay( displayValue, item ) }}
            </div>
          </template>
          <template #rightArea v-if="!hideRightArea">
            <div
              :size="16"
              v-show="isLoading"
            />
            <div class="ui-button-caret">
              <PhCaretDown
                tabindex="-1"
                :size="16"
                :style="{ cursor: readOnly ? 'default' : 'pointer' }"
                @click="handleDropdownClick"
                @mousedown="handleMouseDown"
              />
            </div>
            <div 
              class="ui-button-search"
              @click="openModal"
              @mousedown="handleMouseDown"
            >
              <PhMagnifyingGlass
                tabindex="-1"
                :size="16"
                weight="bold"
                :style="{ cursor: readOnly ? 'default' : 'pointer' }"
              />
            </div>
          </template>
        </InputWrapper>
      </template>
    
      <template #popover>
        <div :style="computedMaxHeight ? { maxHeight: `${computedMaxHeight}px`, overflowY: 'auto' } : {}">
          <AsyncCodeBoxItems
            :has-icon="false"
            :default-value-express="defaultValueExpress"
            :default-name-express="defaultNameExpress"
            :input="input"
            @update:is-open="( v ) => setIsOpen( v )"
            @click="handleChangeItem"
          />
        </div>
      </template>
    </Popover>
  </div>
</template>

<script setup lang="ts">
  import {
    ref,
    computed,
    watch,
    onBeforeUnmount,
    type CSSProperties
  } from 'vue'
  import { useRouter } from 'vue-router'
  import { Popover } from 'zenith-pulse-vue'
  import { InputWrapper } from '@/shared/ui'
  import AsyncCodeBoxItems from './AsyncCodeBox.Items.vue'
  import { useFocusStore, useItemStore } from './AsyncCodeBox.store'
  import { axios } from '@/shared/utils'
  import { formatDisplay, getDefaultDisplayValue } from './AsyncCodeBox.util'
  import { PhCaretDown, PhMagnifyingGlass } from '@phosphor-icons/vue'
  import { useModal } from '@/shared/ui/GsabisCodeBox/composables'
  import { getDefaultModalType } from '@/shared/ui/GsabisCodeBox/GsabisCodeBox.utils'
  import type { AsyncCodeBoxProps, AsyncCodeBoxEmits } from '@/shared/ui/GsabisAsyncCodeBox/AsyncCodeBox.type'

  const props = withDefaults( defineProps<AsyncCodeBoxProps & { hideRightArea?: boolean }>(), {
    hideRightArea: false,
    defaultValueExpress: 'code',
    defaultNameExpress: 'name',
    valueNameType: 'value',
    menuPath: '/b/CmnCommonModal',
    pageSize: 100,
    displayValue: () => getDefaultDisplayValue(),
  } )

  const emit = defineEmits<AsyncCodeBoxEmits>()

  const computedMaxHeight = computed(() => {
    if (props.maxPopoverHeight) {
      if (typeof props.maxPopoverHeight === 'number') {
        return props.maxPopoverHeight
      }
      return parseInt(props.maxPopoverHeight as string) || 400
    }
    return undefined
  })

  const router = useRouter()
  const { clear, increment, decrement, getFocus } = useFocusStore()
  const { getItems, getItemByIndex, setItems } = useItemStore()

  const wrapperRef = ref<HTMLElement>()
  const inputRef = ref<HTMLInputElement>()
  const isInternalChange = ref<boolean>( false )
  const isModalClose = ref<boolean>( false )

  const displayInput = ref<string>( '' )
  const input = ref<string>( props.modelValue || '' )
  const item = ref<Record<string, any> | null>( null )
  const isOpen = ref<boolean>( false )
  const isLoading = ref<boolean>( false )
  const popoverStyle = ref<CSSProperties>( { maxHeight: '200px' } )

  const {
    api: popupApi,
    menuCode: popupMenuCode,
    menuPath: popupMenuPath,
    params: popupParams,
    title: popupTitle,
    commonCodeParams
  } = getDefaultModalType( props.modalType )

  const defaultParams = {
    code: '',
    value: '',
    custDiv: ''
  }

  const api = computed( () => props.api || popupApi )

  const codeBoxModal = useModal( popupMenuCode || props.menuCode, {
    title: popupTitle || props.title,
    width: props.modalWidth || '920px',
    height: props.modalHeight || '640px',
    menuPath: popupMenuPath || props.menuPath,
  }, commonCodeParams )

  const updateItemValue = ( v: string, init = false ) => {
    if ( !!v && init ) {
      item.value = {
        ...item.value,
        [ props.defaultValueExpress ]: v
      }
      if ( init ) {
        displayInput.value = '' // 필요에 따라 초기화
      }
    }
  }

  updateItemValue( props.modelValue, true )

  watch( () => props.modelValue, ( newVal ) => {
    updateItemValue( newVal, false )
  } )

  // 라우트 변경 시 팝업 닫기
  watch( () => router.currentRoute.value.path, () => {
    if ( isOpen.value ) {
      isOpen.value = false
      setItems( [] )
      displayInput.value = ''
    }
  } )

  let debounceTimer: NodeJS.Timeout | null = null

  watch( displayInput, ( newValue, _, onInvalidate ) => {
    if ( !newValue ) return
  
    if ( debounceTimer ) {
      clearTimeout( debounceTimer )
    }
  
    debounceTimer = setTimeout( async () => {
      const keyword = newValue || item.value?.[ props.defaultValueExpress ] || ''
    
      await setCodeData( keyword )
      debounceTimer = null
    }, 300 )
  
    onInvalidate( () => {
      if ( debounceTimer ) {
        clearTimeout( debounceTimer )
        debounceTimer = null
      }
    } )
  
  } )

  const setCodeData = async ( keyword: string ) => {
    if ( !keyword ) {
      setItems( [] )
      return
    }
  
    isOpen.value = false
    isLoading.value = true
  
    const res = await axios.post( api.value, {
      ...defaultParams,
      ...props.params,
      keyword: keyword.toUpperCase()
    } )
    //const codes = res.data
    const { data: codes } = res.data
  
    const inputByLowerCase = keyword.toLowerCase()
    const data = codes.filter( ( { code = '', name = '' } ) =>
      code.toLowerCase().includes( inputByLowerCase ) ||
      name.toLowerCase().includes( inputByLowerCase )
    )
  
    setItems( data || [] )
    isOpen.value = true
    isLoading.value = false
  
    // maxPopoverHeight가 설정된 경우 Popover height를 undefined로 설정
    if (props.maxPopoverHeight) {
      popoverStyle.value = {
        ...popoverStyle.value,
        height: undefined,
      }
    } else {
      popoverStyle.value = {
        ...popoverStyle.value,
        height: 20 * ( getItems().length || 1 ) + 10,
      }
    }
  
    clear()
  }

  const handleWrapperKeyDown = ( e: KeyboardEvent ) => {
    const { code } = e
  
    if ( code === 'F2' ) {
      !isModalClose.value && openModal()
      return
    }
  
    if ( ![ 'ArrowDown', 'ArrowUp' ].includes( code ) ) return
  
    const flipSign = code === 'ArrowDown' ? 1 : -1
    const focus = getFocus()
    const isEdge = flipSign > 0 && getItems().length <= focus + 1 ||
      flipSign < 0 && focus <= 0
  
    if ( isEdge ) return
  
    flipSign > 0 ? increment() : decrement()
  
    e.preventDefault()
    e.stopPropagation()
  }

  const handleWrapperKeyUp = ( e: KeyboardEvent ) => {
    const { code } = e
  
    if ( code === 'Backspace' ) {
      if ( !displayInput.value ) {
        item.value = {}
        emit( 'update:modelValue', '' )
        emit( 'change', { target: { value: '' }, value: '' } )
      }
      setItems( [] )
      popoverStyle.value = {
        ...popoverStyle.value,
        height: 30,
      }
      isOpen.value = false
      return
    }
  
    if ( isOpen.value && code === 'Escape' ) {
      isOpen.value = false
    }
  }

  const handleChangeItem = ( data: Record<string, any> ) => {
    const value = data?.[ props.defaultValueExpress ] || ''
  
    isInternalChange.value = true
    isOpen.value = false
  
    if ( value === item.value?.[ props.defaultValueExpress ] ) {
      input.value = ''
      return
    }
  
    displayInput.value = ''
    item.value = data
    setItems( [] )
    popoverStyle.value = {
      ...popoverStyle.value,
      height: 30,
    }
  
    emit( 'change', { target: { value }, value } )
    emit( 'update:modelValue', value )
    emit( 'complete', data )

    if (typeof props.onComplete === 'function') {
      props.onComplete(data)
    }
  
    emit( 'valueChanged', value, true )
  }

  const handleChange = ( e: Event ) => {
    const target = e.target as HTMLInputElement
    const inputValue = target.value
  
    isInternalChange.value = false
  
    if ( isInternalChange.value ) {
      emit( 'change', { target: { value: inputValue }, value: inputValue } )
    }
  }

  const handleKeyDown = ( e: KeyboardEvent ) => {
    const { key } = e
  
    if ( key === 'Enter' ) {
      const data = getItemByIndex( getFocus() )
    
      emit( 'valueChanged', data?.[ props.valueNameType ] )
      handleChangeItem( data )
    
      e.preventDefault()
      e.stopPropagation()
    }
  }

  const handleFocus = async () => {
    isInternalChange.value = true
  }

  const handleBlur = () => {
    const data = getItems()?.[ getFocus() ]
  
    if ( data && displayInput.value ) {
      emit( 'valueChanged', data?.[ props.defaultValueExpress ] )
      emit( 'complete', data )
      isOpen.value = false
      return
    }
  
    if ( !item.value?.[ props.defaultValueExpress ] ) {
      isInternalChange.value = true
      emit( 'change', { target: { value: '' }, value: '' } )
      emit( 'complete', { [ props.defaultNameExpress ]: '' } )
    }
  }

  const handleDropdownClick = () => {
    handleFocus()
    isOpen.value = !isOpen.value
  }

  const handleMouseDown = ( e: MouseEvent ) => {
    e.stopPropagation()
    e.preventDefault()
  }

  const openModal = ( data: any = {} ) => {
    const keyword = props.upperCase ? displayInput.value.toUpperCase() : displayInput.value
    const param = {
      api: api.value,
      code: input.value,
      name: input.value,
      keyword,
      pageSize: props.pageSize,
      upperCase: props.upperCase,
      maxLength: props.maxLength,
      initSearch: props.initSearch ?? true,
      ...data,
      params: {
        ...defaultParams,
        ...popupParams,
        ...props.params
      },
    }
  
    isModalClose.value = true
  
    codeBoxModal( {
      param,
      onConfirm: ( res ) => {
        handleChangeItem( res )
        isModalClose.value = false
        inputRef.value?.select()
      },
      onCancel: async () => {
        if ( props.noClearCode ) return
      
        const data = await getCallCodeData( input.value )
        const codeValue = data.length === 1 ? data[ 0 ].value : ''
      
        input.value = codeValue
        !codeValue && emit( 'complete', {} )
        emit( 'valueChanged', codeValue )
      
        isModalClose.value = false
        inputRef.value?.select()
      },
    } )
  }

  const getCallCodeData = async ( value: string ): Promise<Record<string, any>[]> => {
    const { data } = await axios.post( api.value, {
      ...defaultParams,
      ...popupParams,
      ...props.params
    } )
    const codes = data
    const inputByLowerCase = value.toLowerCase()
  
    return codes.filter( ( { code, name } ) =>
      code.toLowerCase().includes( inputByLowerCase ) ||
      name.toLowerCase().includes( inputByLowerCase )
    )
  }

  const setIsOpen = ( value: boolean ) => {
    isOpen.value = value
  }

  // 외부 클릭 감지
  const handleClickOutside = ( event: MouseEvent ) => {
    const target = event.target as Node
    if ( wrapperRef.value && !wrapperRef.value.contains( target ) ) {
      isOpen.value = false
      setItems( [] )
    }
  }

  // isOpen 상태에 따라 외부 클릭 리스너 관리
  watch( isOpen, ( newValue ) => {
    if ( newValue ) {
      // 팝업이 열릴 때만 리스너 등록
      setTimeout( () => {
        document.addEventListener( 'click', handleClickOutside )
      }, 0 )
    } else {
      // 팝업이 닫힐 때 리스너 제거
      document.removeEventListener( 'click', handleClickOutside )
    }
  } )

  // 컴포넌트 언마운트 시 정리
  onBeforeUnmount( () => {
    document.removeEventListener( 'click', handleClickOutside )
  
    if ( debounceTimer ) {
      clearTimeout( debounceTimer )
      debounceTimer = null
    }
  } )
</script>

<style scoped lang="scss" src="@/shared/assets/scss/components/ui/asyncbox.scss"></style>