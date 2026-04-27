/**
 * SearchForm 컴포넌트 타입 정의
 */

import type { CodeBoxModalType } from '@/shared/ui/GsabisCodeBox/GsabisCodeBoxTypes'

/** `code`는 `asyncCode`와 동일(하위 호환) */
export type SearchFieldType =
  | 'text'
  | 'select'
  | 'multiselect'
  | 'asyncCode'
  | 'code'
  | 'codeModal'
  | 'date'

export interface SearchFormField {
  /** 필드 라벨 */
  label: string
  /** 필드 타입 (asyncCode|code=AsyncCodeBox, codeModal=GsabisCodeBox 모달전용, date) */
  type?: SearchFieldType
  /** v-model로 바인딩할 값 (ref 또는 reactive 속성) */
  modelValue: any
  /** placeholder 텍스트 */
  placeholder?: string
  /** SelectBox의 경우 source 옵션 */
  source?: 
  | Array<{ code: string; name: string }>
  | Ref<Array<{ code: string; name: string }>>
  | ComputedRef<Array<{ code: string; name: string }>>
  /** AsyncCodeBox의 경우 modalType */
  modalType?: CodeBoxModalType
  /** 각 입력 컴포넌트에 전달할 추가 props */
  props?: Record<string, any>
  /** TextBox 오른쪽에 표시할 아이콘 컴포넌트 (이벤트 없음) */
  rightIcon?: any
}

export interface SearchFormProps {
  /** 검색 필드 배열 */
  fields: SearchFormField[]
  /** 한 줄에 표시할 컬럼 수 (1, 2, 3, 4) */
  colCount?: 1 | 2 | 3 | 4 | 5
}

