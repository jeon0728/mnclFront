export interface LayoutProps {
  /** 레이아웃 높이 */
  height?: string
  /** 나머지 영역 100% 설정 */
  remain?: boolean
}

export interface LayoutSlots {
  default: () => any
}