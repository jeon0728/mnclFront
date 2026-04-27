<template>
  <div class="mncl-page">
    <h1 class="mncl-page__title">HBL Inquiry</h1>
    <!-- Search -->
    <div class="search-row">
      <span class="search-label">HBL No.</span>
      <div class="search-controls flex">
        <TextBox
          v-model="hblNo"
          add-container-class="search-input"
          placeholder="Insert HBL number here"
        />
        <Button class="accent sizeL" @click="handleSearch">search</Button>
      </div>
    </div>

    <!-- BL Info panel -->
    <div class="panel">
      <div class="panel-head">
        <div class="panel-head-icon">
          <img src="@/shared/assets/image/ClipboardText.svg" alt="check icon" />
        </div>
        <span class="panel-head-label">BL NO.</span>
        <span class="panel-head-value">{{ mnclRow?.hblNo ?? mnclRow?.blNo ?? '' }}</span>
      </div>
      <div class="panel-divider"></div>
      <div class="panel-body">
        <div class="bl-grid">
          <div
            v-for="card in blInfoCards"
            :key="card.label"
            class="bl-card"
            :class="{ span2: card.span2 }"
          >
            <span class="bl-card-label">{{ card.label }}</span>
            <span class="bl-card-value">{{ mnclRow?.[card.field] ?? '' }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom row -->
    <div class="bottom-row flex">
      <!-- Delivery Agent -->
      <div class="panel panel-delivery">
        <div class="panel-head">
          <div class="panel-head-icon">
            <img src="@/shared/assets/image/Handshake.svg" alt="hand shake icon" />
          </div>
          <span class="panel-head-label">DELIVERY AGENT</span>
        </div>
        <div class="panel-divider"></div>
        <div class="panel-body">
          <div class="agent-card">
            <div class="agent-card-title-row">
              <span class="agent-card-title">{{ mnclRow?.companyEng ?? '' }}</span>
            </div>
            <div class="agent-card-divider"></div>
            <div class="agent-card-body">
              <p>{{ mnclRow?.addEngSea ?? '' }}</p>
              <p>
                {{ mnclRow?.attnManSea ?? ''
                }}<template v-if="agentEmail"> &lt;{{ agentEmail }}&gt;</template>
              </p>
              <p v-if="agentFax">{{ agentFax }}</p>
              <p v-if="agentTel">{{ agentTel }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Local Charge -->
      <div class="panel panel-charge">
        <div class="panel-head">
          <div class="panel-head-icon">
            <img src="@/shared/assets/image/CurrencyCircleDollar.svg" alt="charge icon" />
          </div>
          <span class="panel-head-label">LOCAL CHARGE</span>
        </div>
        <div class="panel-divider"></div>
        <div class="panel-body scroll">
          <table class="charge-table">
            <colgroup>
              <col />
              <col />
              <col />
              <col />
              <col />
            </colgroup>
            <thead>
              <tr>
                <th>ITEM</th>
                <th class="center">CUR</th>
                <th class="right">PRICE</th>
                <th>PER</th>
                <th class="right">MN</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, idx) in mnclLocalChangeList" :key="idx">
                <td>{{ row.item ?? '' }}</td>
                <td class="center">{{ row.currCode ?? '' }}</td>
                <td class="right">{{ formatChargeNum(row.price) }}</td>
                <td>{{ row.per ?? '' }}</td>
                <td class="right">{{ formatChargeNum(row.min) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <!-- /bottom-row -->
  </div>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue'
  import {
    getMnclList,
    parseMnclSearchListBody,
    type MnclListDto,
    type MnclLocalChangeDto
  } from '@/ui/mncl/api'
  import { useHttp, usePage } from '@/shared/composables'

  useHead({ title: '조회' })

  type BlInfoCard = { label: string; field: keyof MnclListDto; span2?: boolean }

  const blInfoCards: readonly BlInfoCard[] = [
    { label: 'Destination', field: 'polName' },
    { label: 'Vessel', field: 'vesselName' },
    { label: 'Voyage', field: 'voyageNo' },
    { label: 'Cut Date', field: 'deliverDateTime' },
    { label: 'ETD', field: 'onboardDate' },
    { label: 'ETA', field: 'arrivalDate' },
    { label: 'T/S Tariff', field: 'companyEng', span2: true }
  ]

  const hblNo = ref('')
  const mnclRow = ref<MnclListDto | null>(null)
  const mnclLocalChangeList = ref<MnclLocalChangeDto[]>([])

  const [httpRequest] = useHttp()
  const { errorMessage } = usePage()

  /** null / undefined / 공백만 있으면 null */
  const pickText = (v: unknown): string | null => {
    if (v === null || v === undefined) return null
    const s = String(v).trim()
    return s === '' ? null : s
  }

  const agentEmail = computed(() => pickText(mnclRow.value?.emailSea))
  const agentFax = computed(() => pickText(mnclRow.value?.faxNoSea))
  const agentTel = computed(() => pickText(mnclRow.value?.telNoSea))

  const formatChargeNum = (v: number | string | undefined) => {
    if (v === null || v === undefined || v === '') return '—'
    const n = typeof v === 'number' ? v : Number(v)
    if (Number.isFinite(n))
      return n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    return String(v)
  }

  const handleSearch = async () => {
    const trimmed = hblNo.value?.trim() ?? ''
    if (!trimmed) {
      errorMessage('HBL No.를 입력해 주세요.')
      return
    }

    const { data, error } = await httpRequest(getMnclList({ hblNo: trimmed }))

    if (error) {
      errorMessage(error.message)
      return
    }

    const parsed = parseMnclSearchListBody(data)
    if (!parsed) {
      mnclRow.value = null
      mnclLocalChangeList.value = []
      return
    }

    mnclRow.value = parsed.mnclList
    mnclLocalChangeList.value = parsed.mnclLocalChangeList
  }
</script>

<style scoped lang="scss" src="@/shared/assets/scss/pages/list.scss"></style>
