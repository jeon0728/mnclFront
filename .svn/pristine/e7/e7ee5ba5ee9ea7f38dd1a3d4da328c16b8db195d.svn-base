import { useLanguage } from '@/shared/composables'
import type { SourceMap } from '@/shared/types/app'

export function useCommonCodes ( commonCodes: SourceMap = {} ) {
  const lang = useLanguage()
  const transCommonCodes = ref( commonCodes )

  const newCommonCodes = {}

  onBeforeMount( () => {
    Object.keys( commonCodes ).forEach( key => {
      newCommonCodes[ key ] = commonCodes[ key ].map( d => {
        d.name = lang( d.name )
        return d
      } )
    } )

    transCommonCodes.value = newCommonCodes
  } )

  return transCommonCodes
}