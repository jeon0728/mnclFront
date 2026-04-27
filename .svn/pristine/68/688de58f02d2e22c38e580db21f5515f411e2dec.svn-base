import { useLanguage, useLink, useSession } from './index'
import { useMessage, useNotify } from '../modal'
import { useCurrentPageStore } from '@/shared/store'
import { storeToRefs } from 'pinia'
import type { PageBaseProps } from '@/shared/types/app/page'
import { useCommonCodes } from '@/shared/composables/code'

/**
 * 페이지 만들때 필요한 composable을 모아둔 composable
 *
 * @description
 * - 페이지 사용시 필요한 값들을 가지고 있습니다
 * - 세션, 다국어처리, 메세지, 알림등을 가지고 있습니다.
 * - 공통코드 다국어 처리를 합니다.
 *
 * @example
 * ```typescript
 * const { lang, session, currentPage, successMessage } = usePage()
 * ```
 */
export const usePage = ( props: PageBaseProps = {} ) => {
  const { codes, ...propsRest } = props || {}

  const lang = useLanguage()
  const messages = useMessage()
  const session = useSession()
  const notify = useNotify()
  const link = useLink()
  const commonCodes = useCommonCodes( codes )
  const { currentPage } = storeToRefs( useCurrentPageStore() )

  return {
    lang, session, link,
    currentPage,
    ...messages, ...notify,
    commonCodes, ...propsRest
  }
}