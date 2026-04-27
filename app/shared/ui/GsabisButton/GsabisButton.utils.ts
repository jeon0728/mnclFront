import type { ButtonHotkey, ButtonType, ButtonVariant } from '@/shared/ui/GsabisButton/GsabisButton.types'
import {
  PhCheck,
  PhClockClockwise,
  PhCopy,
  PhDownloadSimple,
  PhEraser,
  PhFile,
  PhFloppyDisk,
  PhFunnel,
  PhLink,
  PhMagnifyingGlass,
  PhMicrosoftExcelLogo,
  PhMinus,
  PhNotePencil,
  PhPaperPlaneTilt,
  PhPencilSimpleLine,
  PhPlus,
  PhPrinter,
  PhTrash,
  PhUploadSimple,
  PhX
} from '@phosphor-icons/vue'


export const getFontIconByButtonType = ( buttonType: ButtonType ) => {
  const buttonTypeMap: Record<ButtonType, Component | string> = {
    search: PhMagnifyingGlass,
    save: PhFloppyDisk,
    send: PhPaperPlaneTilt,
    add: PhPlus,
    remove: PhMinus,
    delete: PhTrash,
    reset: PhClockClockwise,
    new: PhNotePencil,
    excel: PhMicrosoftExcelLogo,
    print: PhPrinter,
    link: '',
    select: PhCheck,
    copy: PhCopy,
    create: PhNotePencil,
    attach: PhLink,
    register: PhPencilSimpleLine,
    modify: PhEraser,
    cancel: PhX,
    filter: PhFunnel,
    upload: PhUploadSimple,
    download: PhDownloadSimple,
    file: PhFile
  }

  return buttonTypeMap[ buttonType ]
}

export const getButtonVariantByButtonType = ( buttonType: ButtonType ) => {
  const buttonTypeMap: Record<ButtonType, ButtonVariant> = {
    search: 'transactional',
    save: 'transactional',
    send: 'transactional',
    add: 'transactional',
    remove: 'normal',
    delete: 'delete',
    reset: 'normal',
    new: 'normal',
    excel: 'excel',
    print: 'functional',
    link: 'none',
    select: 'normal',
    copy: 'normal',
    create: 'transactional',
    attach: 'normal',
    register: 'transactional',
    modify: 'transactional',
    cancel: 'delete',
    filter: 'filter',
    upload: 'excel',
    download: 'excel',
    file: 'normal'
  }

  return buttonTypeMap[ buttonType ]
}

export const getButtonHotkeyByButtonType = ( buttonType: ButtonType ): string => {
  const buttonHotkeyMap: Partial<Record<ButtonType, ButtonHotkey>> = {
    search: 'F8',
    save: 'F3',
    delete: 'F4',
    new: 'F5',
    print: 'F6'
  }

  return buttonHotkeyMap[ buttonType ] || ''
}