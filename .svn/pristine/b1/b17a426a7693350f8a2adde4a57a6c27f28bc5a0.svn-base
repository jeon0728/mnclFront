import type { PropType } from 'vue'
import type { SourceData } from '@/shared/types/constants'

/**
 * 공통 페이지 Props를 정의하는 객체
 *
 * @description
 * - 모든 페이지에서 공통으로 사용되는 props들을 정의합니다
 * - defineComponent에서 스프레드 연산자로 사용할 수 있습니다
 *
 * @example
 * ```
 * export default defineComponent({
 *   props: {
 *     ...commonPageProps,
 *     // 페이지별 추가 props
 *     title: String,
 *     isLoading: Boolean
 *   }
 * })
 * ```
 *
 * @returns {object} Vue 컴포넌트에서 사용할 수 있는 props 정의 객체
 */

export const pageProps = {
  commonCodes: {
    type: Object as PropType<SourceData[]>,
    required: true
  }
}
