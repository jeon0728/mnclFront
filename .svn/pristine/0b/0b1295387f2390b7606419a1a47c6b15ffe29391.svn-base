<template>
  <div class="search-form" @keydown.enter.prevent="emitSubmit">
    <div
      v-for="(field, index) in fields"
      :key="index"
      class="search-form-field"
      :class="`col-${colCount}`"
    >
      <Label class="search-form-label">{{ field.label }}</Label>
      <TextBox
        v-if="field.type === 'text' || !field.type"
        :model-value="unwrapRef(field.modelValue)"
        @update:model-value="(val) => setRefValue(field.modelValue, val)"
        :placeholder="field.placeholder || '---'"
        v-bind="field.props || {}"
        :upper-case="field.props?.id === 'userId'"
      >
        <template v-if="field.rightIcon" #rightArea>
          <component :is="field.rightIcon" />
        </template>
      </TextBox>
      <SelectBox
        v-else-if="field.type === 'select'"
        :model-value="unwrapRef(field.modelValue)"
        @update:model-value="(val) => setRefValue(field.modelValue, val)"
        :source="resolvedSource(field)"
        :placeholder="field.placeholder || '---'"
        v-bind="field.props || {}"
      />
      <MultiSelectBox
        v-else-if="field.type === 'multiselect'"
        :key="`${resolvedSource(field).length}-${unwrapRef(field.modelValue)}`"
        :model-value="unwrapRef(field.modelValue)"
        @update:model-value="(val) => setRefValue(field.modelValue, val)"
        :source="resolvedSource(field)"
        :placeholder="field.placeholder || '---'"
        v-bind="field.props || {}"
      />
      <GsabisCodeBox
        v-else-if="field.type === 'codeModal'"
        v-model="field.modelValue"
        :placeholder="field.placeholder || '---'"
        v-bind="codeModalRestProps(field)"
        @complete="(d) => field.props?.onComplete?.(d)"
      />
      <GsabisAsyncCodeBox
        v-else-if="field.type === 'asyncCode' || field.type === 'code'"
        v-model="field.modelValue"
        :modalType="field.modalType ?? field.props?.modalType"
        :placeholder="field.placeholder || '---'"
        v-bind="field.props || {}"
      />
      <DateBox
        v-else-if="field.type === 'date'"
        v-model="field.modelValue"
        v-bind="field.props || {}"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  /**
   * @vue/component
   * @description
   *  - 재사용 가능한 검색 폼 컴포넌트
   *  - Label이 위에, 입력 필드가 아래에 배치되는 레이아웃
   *  - 1개 이상의 검색 필드를 유연하게 배치 가능
   *
   * @example
   * <SearchForm :fields="searchFields" :colCount="3" />
   *
   * const searchFields = [
   *   {
   *     label: '템플릿 이름',
   *     type: 'text',
   *     modelValue: searchParams.tmpltName,
   *     placeholder: '---'
   *   },
   *   {
   *     label: 'Shipper',
   *     type: 'text',
   *     modelValue: searchParams.shipper,
   *     placeholder: '---'
   *   }
   * ]
   */
  import { computed } from 'vue'
  import { GsabisAsyncCodeBox, GsabisCodeBox } from '@/shared/ui'
  import type { SearchFormField, SearchFormProps } from './SearchForm.types'

  /** GsabisCodeBox에는 onComplete prop이 없고 @complete만 있으므로 v-bind에서 제외 */
  const codeModalRestProps = (field: SearchFormField) => {
    const p = field.props
    if (!p) return {}
    const { onComplete: _omit, ...rest } = p
    return rest
  }

  const props = withDefaults(defineProps<SearchFormProps>(), {
    colCount: 3
  })

  const emit = defineEmits<{
    /** 검색조건 입력 후 Enter 시 */
    (e: 'submit'): void
  }>()

  // props 변화를 감시
  const fields = computed(() => props.fields)

  const emitSubmit = () => emit('submit')

  // ref 객체를 unwrap하는 헬퍼 함수
  const unwrapRef = (value: any) => {
    if (value && typeof value === 'object' && 'value' in value) {
      return value.value
    }
    return value
  }

  const setRefValue = (ref: any, value: any) => {
    if (ref && typeof ref === 'object' && 'value' in ref) {
      ref.value = value
    } else {
      // ref가 아닌 경우 직접 할당 (reactive 속성 등)
      if (typeof ref === 'function') {
        ref(value)
      } else {
        // 일반 값인 경우 (이론적으로는 발생하지 않아야 함)
        console.warn('SearchForm: modelValue가 ref도 함수도 아닙니다', ref)
      }
    }
  }

  const resolvedSource = (field: any) => {
    const src = unwrapRef(field.source)
    return Array.isArray(src) ? src : []
  }
</script>

<style lang="scss" src="@/shared/assets/scss/components/containers/input-label.scss"></style>
