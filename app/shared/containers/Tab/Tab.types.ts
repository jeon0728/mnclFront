export interface TabItem {
  key?: string
  name: string
  isFullHeight?: boolean
}

export interface TabProps {
  tabData: TabItem[]
  mode?: 'default' | 'flex'
}