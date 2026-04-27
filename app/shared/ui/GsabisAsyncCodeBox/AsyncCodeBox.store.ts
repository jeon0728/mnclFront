import { defineStore } from 'pinia'
import type { UseFocusStore, UseItemStore, UseTagStore } from './AsyncCodeBox.type'

export const useFocusStore = defineStore('asyncCodeBoxFocus', (): UseFocusStore => {
  const focus = ref(0)

  const increment = () => focus.value++
  const decrement = () => focus.value--
  const clear = () => focus.value = 0
  const setFocus = (value: number) => focus.value = value
  const getFocus = () => focus.value

  return {
    focus,
    increment,
    decrement,
    clear,
    setFocus,
    getFocus
  }
})

export const useItemStore = defineStore('asyncCodeBoxItem', (): UseItemStore => {
  const items = ref<Record<string, any>[]>([])

  const setItems = (newItems: Record<string, any>[]) => {
    items.value = newItems
  }

  const getItems = () => items.value
  const getItemByIndex = (idx: number) => items.value?.[idx]

  return {
    items,
    setItems,
    getItems,
    getItemByIndex
  }
})

export const useTagStore = defineStore('asyncCodeBoxTag', (): UseTagStore => {
  const tags = ref<Record<string, any>[]>([])

  const addTag = (tag: Record<string, any>) => {
    tags.value = [...tags.value, tag]
  }

  const removeTag = (code: string) => {
    tags.value = tags.value.filter(d => d.code !== code)
  }

  const toggleTag = (tag: Record<string, any>, key: string) => {
    const tagValue = tag?.[key]
    const isExist = tags.value.some(t => t?.[key] === tagValue)

    tags.value = isExist
      ? tags.value.filter(t => t?.[key] !== tagValue)
      : [...tags.value, tag]
  }

  const getTags = () => tags.value
  const setTags = (newTags: Record<string, any>[]) => {
    tags.value = newTags
  }

  return {
    tags,
    addTag,
    removeTag,
    toggleTag,
    getTags,
    setTags
  }
})