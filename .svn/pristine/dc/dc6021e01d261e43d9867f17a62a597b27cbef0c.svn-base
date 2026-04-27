import { onBeforeUnmount, onMounted } from 'vue'

interface Shortcut {
  shortcutKey: string
  ctrl?: boolean
  alt?: boolean
}

/**
 * 전역 키보드 단축키를 등록하는 composable
 *
 * @param shortcut 단축키 정보 { shortcutKey: 's', ctrl: true, alt: false }
 * @param callback 단축키 실행 시 호출할 함수
 */
export function useGlobalShortcut(
  shortcut: Shortcut,
  callback: () => void
) {
  const handleKeyDown = ( e: KeyboardEvent ) => {
    const { ctrlKey, altKey, key } = e
    const { shortcutKey, ctrl, alt } = shortcut

    const isKeyCombination = ( requiredCtrl?: boolean, requiredAlt?: boolean ) => {
      const isCtrlPressed = requiredCtrl ? ctrlKey : true
      const isAltPressed = requiredAlt ? altKey : true
      return isCtrlPressed && isAltPressed && key === shortcutKey
    }

    if ( isKeyCombination( ctrl, alt ) ) {
      e.preventDefault()
      callback()
    }
  }

  onMounted( () => {
    window.addEventListener( 'keydown', handleKeyDown )
  } )

  onBeforeUnmount( () => {
    window.removeEventListener( 'keydown', handleKeyDown )
  } )
}
