<template>
  <label class="label flex">
    {{ translatedSlotContent }}
  </label>
</template>

<script setup lang="ts">
  import '@/shared/assets/scss/components/ui/label.scss'
  import { useLanguage } from '@/shared/composables'
  import type { LabelProps, LabelSlots } from '@/shared/ui/Label/Label.types'

  const props = defineProps<LabelProps>()
  defineSlots<LabelSlots>()
  const lang = useLanguage()
  const slots = useSlots()

  const translatedSlotContent = computed( () => {
    const defaultSlot = slots.default?.()
    if ( defaultSlot && defaultSlot[ 0 ] && typeof defaultSlot[ 0 ].children === 'string' ) {
      return lang( defaultSlot[ 0 ].children )
    }
    return ''
  } )

</script>


