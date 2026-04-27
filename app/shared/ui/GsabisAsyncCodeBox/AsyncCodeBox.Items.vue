<template>
  <span
    ref="wrapperRef"
    class="select-item-wrapper"
  >
    <template v-if="items.length !== 0">
      <AsyncCodeBoxItem
        v-for="( data, idx) in items"
        :key="`${ data[ props.defaultValueExpress ]}${ idx }` "
        v-bind="$attrs"
        :data="data"
        :idx="idx"
        :default-value-express="props.defaultValueExpress"
        :default-name-express="props.defaultNameExpress"
        :is-active="data[ props.defaultNameExpress ] === input"
        @click="() => onClick(data)"
      />
    </template>
  
    <div
      v-else
      class="no-rows-to-show"
      tabindex="-1"
      @click="() => setIsOpen(false)"
    >
      No Rows To Show
    </div>
  </span>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import AsyncCodeBoxItem from './AsyncCodeBox.Item.vue'
  import { useItemStore } from './AsyncCodeBox.store'
  import { storeToRefs } from 'pinia'

  interface Props {
    input?: string
    defaultValueExpress: string
    defaultNameExpress: string
    hasIcon?: boolean
  }

  interface Emits {
    ( e: 'update:is-open', value: boolean ): void
    ( e: 'click', data: Record<string, any> ): void
  }

  const props = defineProps<Props>()
  const emit = defineEmits<Emits>()

  const itemStore = useItemStore()
  const { items } = storeToRefs( itemStore )

  const wrapperRef = ref<HTMLSpanElement>()

  const setIsOpen = ( value: boolean ) => {
    emit( 'update:is-open', value )
  }

  const onClick = ( data: Record<string, any> ) => {
    emit( 'click', data )
  }
</script>

<style scoped lang="scss">
@use '../../assets/scss/variable' as *;

.select-item-wrapper {
  display: block;
}

.no-rows-to-show {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 4px;
  padding: 4px 16px 0;
  border-radius: $rS;
  text-align: center;
  font-size: $fs-xs;
  font-weight: 500;
  cursor: pointer;
  user-select: none;
  @include black('color', 20);
  > svg {
    flex-shrink: 0;
    @include black('color', 40);
  }
}

.no-rows-to-show:hover {
  background-color: transparent;
}
</style>