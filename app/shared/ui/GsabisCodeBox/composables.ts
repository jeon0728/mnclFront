'use client'

import { useModalMapStore } from '@/shared/store'
import { useModalStore } from '@/shared/store/modals'
import type { ModalOptions } from '@/shared/types/store'
import type { BaseModalProps } from '@/shared/types'
import type { CodeMap } from '@/shared/types/app'
import { getCommonCodeAsClient } from '@/shared/api/getCommonCodesAsClient'
import { modalCodeMap } from '@/shared/constants/modal/modalCode'
import { useLanguage } from '@/shared/composables'

type UseModal = ( menuCode: string, modalOptions: ModalOptions, commonCodeParams?: CodeMap[] ) =>
  <TParam extends Record<string, any>, TConfirm = any, TCancel = any>( options: BaseModalProps<TParam, TConfirm, TCancel> ) => void
export const useModal: UseModal = ( menuCode, modalOptions, commonCodeParams ) => {
  const { addModal } = useModalStore()
  const { modalMap } = useModalMapStore()
  const { menuPath: directPath } = modalOptions
  const lang = useLanguage()
  const { menuPath, menuName } = modalMap[ menuCode ] || {}
  const modalPath = menuPath || directPath

  return async ( options ) => {
    const getModalComponent = modalCodeMap[ modalPath ] || ( () => import( '~/ui/modals/default/index.vue' ) )
    const { param, onConfirm, onCancel } = options
    
    // 컴포넌트는 함수로 유지 (defineAsyncComponent에서 처리)
    const Component = getModalComponent

    // 공통코드 선언
    let commonCodes = {}
    if ( commonCodeParams ) {
      commonCodes = await getCommonCodeAsClient( commonCodeParams ) || {}
      Object.keys( commonCodes ).forEach( key => {
        commonCodes[ key ] = commonCodes[ key ].map( d => {
          d.name = lang( d.name )
          return d
        } )
      } )
    }

    // Promise 이후
    addModal( {
      Component,
      options: { ...modalOptions }, param: { ...param, commonCodes },
      onConfirm, onCancel
    } )
  }
}

