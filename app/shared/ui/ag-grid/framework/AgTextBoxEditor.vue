<template>
  <AgEditorWrapper
    v-bind="props"
  >
    <template #component="wrapperProps">
      <TextBox
        ref="refInput"
        v-model="parseValue"
        v-bind="wrapperProps"
        :maxlength="wrapperProps?.maxLength"
      />
    </template>
  </AgEditorWrapper>
</template>

<script setup lang="ts">
  import type { AgGridCellEditorParams } from '../AgGrid.Types'
  import type { TextBoxProps } from 'zenith-pulse-vue/lib/ui'
  import AgEditorWrapper from '../wrapper/AgEditorWrapper.vue'
  import { useAgEditorSetting } from '@/shared/composables/grid/useAgEditorSetting'

  const props = defineProps<AgGridCellEditorParams<TextBoxProps>>()

  const { params } = props || {}
  const refInput = ref<any>( null )

  const { parseValue, input } = useAgEditorSetting( refInput, params.value )

  //@update:model-value="(val) => handleUpdate(val, wrapperProps)"
  // const handleUpdate = (val: string, wrapperProps: any) => {
  //   const regex = wrapperProps?.validationPattern
  //   if (!regex) return

  //   parseValue.value = val.replace(/[^a-zA-Z]/g, '')
  //   if (!regex.test(val)) {
  //     // 입력된 값을 정규식 허용 문자만 남기도록 필터링
  //     parseValue.value = ''
  //   }
  // }


  defineExpose( {
    getValue: () => {
      return input.value ?? ''
    }
  } )
</script>