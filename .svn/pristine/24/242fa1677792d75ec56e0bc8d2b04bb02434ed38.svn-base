<template>
  <Popover :active="isOpen">
    <template #component>
      <InputWrapper
        ref="inputRef"
        v-model="input"
        :title="input"
        placeholder="Input Grid Layout..."
        actions
        @focus="() => handleFocusInput()"
        @focusout="isOpen = false"
      >
        <template #leftArea>
          <template v-if="input">
            <svg width="0" height="0" style="position:absolute">
              <defs>
                <linearGradient :id="gradientId" x1="0" y1="0" x2="100%" y2="0">
                  <stop stop-color="#AAAAAA"/>
                  <stop offset="1" stop-color="#206BDC"/>
                </linearGradient>
              </defs>
            </svg>
            <PhToggleRight
              :size="20"
              weight="fill"
              :style="{ fill: `url(#${gradientId})` }"
            />
          </template>
          <template v-else>
            <svg width="0" height="0" style="position:absolute">
              <defs>
                <linearGradient :id="gradientId" x1="0" y1="0" x2="100%" y2="0">
                  <stop stop-color="#AAAAAA"/>
                  <stop offset="1" stop-color="#206BDC"/>
                </linearGradient>
              </defs>
            </svg>
            <PhToggleLeft
              :size="20"
              :style="{ fill: `url(#${gradientId})` }"
            />
          </template>
        </template>
        <template #rightArea>
          <PhArrowsClockwise
            class="reset"
            tabindex="-1"
            @click.stop="() => { props.gridAdapter?.resetColumnState(); input = '' }"
          />
          <PhCaretDown
            tabindex="-1"
            @click.stop="() => isOpen = !isOpen"
            @focusout="isOpen = false"
          />
        </template>
      </InputWrapper>
    </template>

    <template #popover>
      <div
        class="grid-layout-manager-container"
        @mousedown.stop.prevent
      >
        <GridLayoutItems
          :menuId="props.menuId"
          :gridName="props.gridName"
          :gridAdapter="props.gridAdapter"
          :gridPresets="dataGridPresets"
          @input="val => input = val"
        />
        <div
          class="grid-layout-manager-add-row"
          @click.stop="() => handleAddLayout()"
        >
          <PhPencilSimpleLine :size="16"/>
          새 프리셋 추가
        </div>
      </div>
    </template>
  </Popover>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { getGridLayoutList } from '@/shared/ui/GridLayoutManager/api/gridLayoutApi'
  import { TRUE_VALUE } from '@/shared/constants/common/trueFalseValue'
  import type { ColumnState } from 'ag-grid-community'
  import { useHttp, useSession } from '@/shared/composables'
  import { PhArrowsClockwise, PhCaretDown, PhPencilSimpleLine, PhToggleLeft, PhToggleRight } from '@phosphor-icons/vue'
  import GridLayoutItems from '@/shared/ui/GridLayoutManager/GridLayoutItems.vue'
  import type { GridLayoutManagerProps } from '@/shared/ui/GridLayoutManager/GridLayoutManager.types'
  import '@/shared/assets/scss/components/ui/grid-layout-manager.scss'
  import { CUD_FLAG_INSERT } from '@/shared/constants/ag-grid/cudFlag'

  const props = defineProps<GridLayoutManagerProps>()

  const session = useSession()
  const [ request ] = useHttp()

  const input = ref<string>( '' )
  const isOpen = ref<boolean>( false )
  const inputRef = ref<HTMLInputElement | null>( null )
  const lastMenuId = ref<number | string | null>( null )

  const gradientId = `gradient-${ Math.random().toString( 36 ).slice( 2, 9 ) }`
  const dataGridPresets = ref<any[]>( [] )

  onMounted( () => {
    handleSearchLayout()
  } )

  const handleSearchLayout = async () => {
    const userId = session( 'userId' )
    const corpId = session( 'corpId' )
    const { data: { gridPresets } } = await request<{ gridPresets: any[] }>(
      getGridLayoutList( {
        menuId: props.menuId,
        gridName: props.gridName,
        userId,
        corpId
      } ),
      { noLoading: true }
    )

    dataGridPresets.value = gridPresets || []
    applyDefaultLayout( gridPresets || [] )
  }

  const applyDefaultLayout = ( data: any[] ) => {
    const { columnState, layoutName } = data.find( d => d.defaultLayout === TRUE_VALUE ) || {}
    if ( columnState ) {
      props.gridAdapter?.applyColumnState( JSON.parse( columnState ) as ColumnState[] )
    }
    if ( layoutName ) {
      input.value = layoutName
    }
  }

  const handleAddLayout = () => {
    dataGridPresets.value.push( {
      id: null,
      menuId: props.menuId,
      gridName: props.gridName,
      layoutName: '',
      cudFlag: CUD_FLAG_INSERT,
    } )
  }

  const handleFocusInput = () => {
    inputRef.value?.select()
  }
</script>


