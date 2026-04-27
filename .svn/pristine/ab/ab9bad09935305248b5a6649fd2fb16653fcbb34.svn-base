// import { BaseModalProps } from '@/shared/types'
/**
 * 모달 컴포넌트 동적 임포트 매핑
 *
 * @description 모달 경로별로 컴포넌트를 동적으로 로드하는 매핑 객체
 * @example
 * const getModalComponent = modalCodeMap['/b/CmnCustModal']
 * const Component = await getModalComponent()
 * ```
 *
 * @performance 지연 로딩으로 번들 크기 최적화
 * @architecture 코드 스플리팅 기반 모듈 시스템
 */

export const modalCodeMap: Record<string, () => Promise<{ default: any }>> = {}