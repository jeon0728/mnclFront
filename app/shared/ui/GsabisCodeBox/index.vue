<template>
  <InputWrapper
    ref="inputWrapperRef"
    v-model="input"
    :upperCase="upperCase"
    v-bind="restProps"
    @input="handleChange"
    @keydown="handleKeyDown"
    @focusin="handleFocus"
    @focusout="handleBlur"
  >
    <template #rightArea>
      <div
        tabindex="-1"
        @mousedown="handleMouseDownButton"
      >
        <slot name="button">
          <PhMagnifyingGlass
            :size="18"
            tabindex="-1"
            @click="() => openModal()"
          />
        </slot>
      </div>
    </template>
  </InputWrapper>
</template>
<script setup lang="ts">
  import { ref, watch, computed } from 'vue'
  import { forwardExpose } from 'zenith-pulse-vue'
  import type { GsabisCodeBoxEmits, GsabisCodeBoxProps } from '@/shared/ui/GsabisCodeBox/GsabisCodeBox.types'
  import { CodeBoxService } from '@/shared/utils/service'
  import { getDefaultModalType } from '@/shared/ui/GsabisCodeBox/GsabisCodeBox.utils'
  import { useModal } from '@/shared/ui/GsabisCodeBox/composables'
  import { PhMagnifyingGlass } from '@phosphor-icons/vue'

  const props = defineProps<GsabisCodeBoxProps>()
  const emits = defineEmits<GsabisCodeBoxEmits>()

  const {
    noClear, upperCase, onlyPopup, maxLength,
    modalType, menuCode, api: propsApi, title, pageSize = 100,
    modalWidth, modalHeight, valueNameType, menuPath, params,
    initSearch = true,
    ...rest
  } = props

  const restProps = computed( () => {
    const { modelValue: _mv, value: _v, ...others } = rest as any
    return others
  } )

  const {
    api: popupApi,
    menuCode: popupMenuCode,
    menuPath: popupMenuPath,
    params: popupParams,
    title: popupTitle,
  } = getDefaultModalType( modalType )

  const api = computed( () => propsApi || popupApi )

  const input = ref<string>( props?.modelValue || '' )
  const prevInput = ref<string>( props?.modelValue || '' )
  const active = ref<boolean>( false )
  const isCall = ref<boolean>( false )

  const inputWrapperRef = ref<HTMLInputElement | null>( null )

  watch(
    () => props?.modelValue,
    ( v ) => {
      input.value = v || ''
    }
  )

  const codeBoxModal = useModal( popupMenuCode || menuCode, {
    title: popupTitle || title,
    width: modalWidth || '920px',
    height: modalHeight,
    menuPath: popupMenuPath || menuPath,
  } )

  const openModal = ( data: any = {} ) => {
    const keyword = upperCase ? input.value?.toUpperCase() : input.value
  
    const param = {
      api: api.value,
      code: input.value,
      name: input.value,
      keyword,
      pageSize,
      upperCase,
      maxLength,
      initSearch,
      ...data,
      params: {
        ...( popupParams as any ),
        ...( params?.value || {} ),
      },
    }
  
    codeBoxModal( {
      param,
      onConfirm: ( res: Record<string, any> ) => {
        setValueAndOnComplete( res )
      
        inputWrapperRef.value?.select()
      },
      onCancel: async () => {
        if ( noClear ) return
        const data = await getCallCodeData( input.value )
        const codeValue = data.length === 1 ? data[ 0 ].value : ''
        input.value = codeValue
      
        emits( 'valueChanged', codeValue )
        emits( 'update:modelValue', codeValue )
      
        inputWrapperRef.value?.select()
      },
    } )
  }

  const handleKeyDown = async ( e: KeyboardEvent ) => {
    const target = e.currentTarget as HTMLInputElement | null
    const currentValue = target?.value ?? ''
  
    if ( e.key === 'F2' ) {
      openModal( { searchKeyword: currentValue } )
    }
  
    if ( e.key === 'Enter' && currentValue ) {
      e.preventDefault()
      await callCode( currentValue )
    }
  
    emits( 'keydown', e )
  }

  const handleChange = ( e ) => {
    const target = e.target as HTMLInputElement
    const v = target?.value ?? ''
  
    input.value = v
    emits( 'input', e )
    emits( 'update:modelValue', v )
  }

  const handleFocus = ( e: FocusEvent ) => {
    prevInput.value = input.value
    emits( 'focus', e )
  }

  const handleBlur = async ( e: FocusEvent ) => {
    if ( input.value === prevInput.value ) return
  
    if ( !input.value ) {
      setValueAndOnComplete()
      emits( 'focusout', e )
      return
    }

    // NOTE:
    // 일부 사용처는 "모달 선택 전용"으로만 사용하며 api/modalType을 주지 않습니다.
    // 이 경우 blur 시 자동 코드 조회(callCode)를 수행하면 매칭 실패로 모달이 자동으로 열려 UX가 어색합니다.
    // (모달은 돋보기 클릭/F2 등 명시적 액션에서만 열리도록)
    if ( !api.value ) {
      emits( 'focusout', e )
      return
    }

    await callCode( input.value )
    emits( 'focusout', e )
  }

  const getCallCodeData = async ( val: string ): Promise<Record<string, any>[]> => {
    // NOTE:
    // 일부 CodeBox 사용처는 "모달 선택 전용"으로만 사용하며 api/modalType을 주지 않습니다.
    // 이 경우 api.value가 undefined인데도 axios.post(undefined, ...)가 실행되면
    // Nuxt 라우트로 POST /.../undefined 요청이 발생합니다.
    if ( !api.value ) {
      isCall.value = false
      return []
    }

    const codeBoxService = CodeBoxService.of()
      .setApi( api.value )
      .setParams( {
        searchKeyword: val,
        code: val,
        currentPage: 0,
        pageSize,
        ...( popupParams as any ),
        ...( params || {} ),
      } )
  
    try {
      const { content } = await codeBoxService.codeList( { quiet: true } )
      return content
    } catch {
      return []
    } finally {
      isCall.value = false
    }
  }

  const callCode = async ( val: string ): Promise<void> => {
    if ( isCall.value ) return
    if ( onlyPopup ) {
      input.value = val || ''
      emits( 'update:modelValue', input.value )
      return
    }
  
    isCall.value = true
  
    const data = await getCallCodeData( val )
    const key = valueNameType || 'value'
    const codes = data.filter( d => String( d[ key ] ?? '' ).toUpperCase() === val.toUpperCase() )
    let item: Record<string, any> | undefined
  
    if ( data.length === 1 ) {
      item = data[ 0 ]
    } else if ( codes.length === 1 ) {
      item = codes[ 0 ]
    } else if ( noClear ) {
      return
    } else {
      return openModal()
    }
  
    setValueAndOnComplete( item )
  }

  const setValueAndOnComplete = ( item: Record<string, any> = {} ) => {
    const key = valueNameType || 'code'
    const v = item?.[ key ] || ''
  
    input.value = v
  
    emits( 'complete', item )
    emits( 'valueChanged', v )
    emits( 'update:modelValue', v )
  }

  const handleMouseDownButton = ( e: MouseEvent ) => {
    e.stopPropagation()
    e.preventDefault()
  
    inputWrapperRef.value?.focus()
  }

  defineExpose( forwardExpose( inputWrapperRef ) )

</script>