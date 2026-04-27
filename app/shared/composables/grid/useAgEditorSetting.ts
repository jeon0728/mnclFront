export const useAgEditorSetting = ( refInput: Ref<HTMLInputElement>, initValue: any ) => {
  onMounted( async () => {
    await nextTick()
    refInput?.value?.select?.()
  } )

  const input = ref<string>( initValue )
  const parseValue = computed( {
    get: () => input?.value,
    set: ( value ) => {
      input.value = value
    }
  } )

  return {
    input, parseValue
  }
}