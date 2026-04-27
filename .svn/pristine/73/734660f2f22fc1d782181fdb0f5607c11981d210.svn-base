import {
  CheckBox,
  GridLayoutManager,
  GsabisAsyncCodeBox,
  GsabisButton,
  GsabisCheckBox,
  GsabisCodeBox,
  GsabisDateBox,
  GsabisGridButton,
  GsabisModalButton,
  GsabisSelectBox,
  GsabisMultiSelectBox,
  GsabisTimeBox,
  GsabisNumberBox,
  InputWrapper,
  Label,
  Layout,
  NumberBox,
  PasswordBox,
  Popover,
  RadioGroup,
  Textarea,
  TextBox,
} from '@/shared/ui'
import { Card, Tab } from '@/shared/containers'
import { createUIPlugin } from 'zenith-pulse-vue'

export default defineNuxtPlugin( async ( { vueApp } ) => {
  /** Zenith Pulse Vue */
  vueApp.component( 'TextBox', TextBox )
  vueApp.component( 'NumberBox', GsabisNumberBox )
  vueApp.component( 'DateBox', GsabisDateBox )
  vueApp.component( 'CodeBox', GsabisCodeBox )
  vueApp.component( 'InputWrapper', InputWrapper )
  vueApp.component( 'Popover', Popover )
  vueApp.component( 'RadioGroup', RadioGroup )
  vueApp.component( 'PasswordBox', PasswordBox )
  vueApp.component( 'Textarea', Textarea )
  vueApp.component( 'TimeBox', GsabisTimeBox )
  vueApp.component( 'AsyncCodeBox', GsabisAsyncCodeBox )

  /** UI */
  vueApp.component( 'CheckBox', GsabisCheckBox )
  vueApp.component( 'SelectBox', GsabisSelectBox )
  vueApp.component( 'MultiSelectBox', GsabisMultiSelectBox )
  vueApp.component( 'Button', GsabisButton )
  vueApp.component( 'GridButton', GsabisGridButton )
  vueApp.component( 'ModalButton', GsabisModalButton )
  vueApp.component( 'GridLayoutManager', GridLayoutManager )

  vueApp.component( 'Layout', Layout )
  vueApp.component( 'Label', Label )

  /** Containers */
  vueApp.component( 'Card', Card )
  vueApp.component( 'Tab', Tab )

  /** pulse vue config */
  vueApp.use( createUIPlugin( {
    inputWrapper: {
      height: 32,
    }
  } ))
} )

declare module 'vue' {
  export interface GlobalComponents {
    InputWrapper: typeof InputWrapper
    SelectBox: typeof GsabisSelectBox
    MultiSelectBox: typeof GsabisMultiSelectBox
    TextBox: typeof TextBox
    NumberBox: typeof GsabisNumberBox
    PasswordBox: typeof PasswordBox
    Popover: typeof Popover
    DateBox: typeof GsabisDateBox
    CodeBox: typeof GsabisCodeBox
    Button: typeof GsabisButton
    GridButton: typeof GsabisGridButton
    Textarea: typeof Textarea
    TimeBox: typeof GsabisTimeBox
    AsyncCodeBox: typeof GsabisAsyncCodeBox

    Layout: typeof Layout
    Card: typeof Card
    Tab: typeof Tab
    CheckBox: typeof CheckBox
    RadioGroup: typeof RadioGroup
    Label: typeof Label
    GridLayoutManager: typeof GridLayoutManager
  }
}

