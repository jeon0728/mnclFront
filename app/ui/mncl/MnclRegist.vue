<template>
  <div class="mncl-page">
    <h1 class="mncl-page__title">LOCAL CHARGE</h1>
    <!-- Search -->
    <div class="search-row">
      <span class="search-label">조회기간</span>
      <div class="search-controls flex">
        <DateBox v-model="fromDt" add-container-class="search-input" />
        <DateBox v-model="toDt" add-container-class="search-input" />
        <Button class="accent sizeL" @click="handleSearch">search</Button>
      </div>
      <Button class="sizeL right" buttonType="download" @click="handleDownloadTemplate">
        Excel 양식 다운로드
      </Button>
      <Button class="sizeL" buttonType="upload" @click="openExcelPicker">
        Excel 업로드
      </Button>
      <input
        ref="excelRef"
        type="file"
        :style="{ display: 'none' }"
        @change="handleUploadExcel"
      />
    </div>

    <div class="panel panel-charge">
      <div class="panel-head">
        <div class="panel-head-icon">
          <img src="@/shared/assets/image/CurrencyCircleDollar.svg" alt="charge icon" />
        </div>
        <span class="panel-head-label">LOCAL CHARGE 등록</span>
      </div>
      <div class="panel-divider"></div>
      <div class="panel-body scroll">
        <table class="charge-table">
          <colgroup>
            <col v-for="(_, i) in registListColumns" :key="i" />
          </colgroup>
          <thead>
            <tr>
              <th v-for="col in registListColumns" :key="col.field" :class="col.thClass">
                {{ col.label }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, idx) in mnclLocalChangeList" :key="idx">
              <td v-for="col in registListColumns" :key="col.field" :class="col.tdClass">
                {{ row[col.field] ?? '' }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import {
    downloadMnclTemplate,
    getMnclLocalList,
    parseMnclLocalListBody,
    uploadExcel,
    type MnclExcelUploadResponse,
    type MnclLocalRegistRowDto
  } from '@/ui/mncl/api'
  import { DISPLAY_DATE_UNIT } from '@/shared/constants/control/unit'
  import { usePage, useHttp } from '@/shared/composables'
  import { DateUtil, FormBuilder } from '@/shared/utils'

  type RegistListColumn = {
    field: keyof MnclLocalRegistRowDto
    label: string
    thClass?: string
    tdClass?: string
  }

  const registListColumns: readonly RegistListColumn[] = [
    { field: 'hblNo', label: 'BL NO.' },
    { field: 'inDateTime', label: '업데이트 일시', thClass: 'center', tdClass: 'center' }
  ]

  const excelRef = ref<HTMLInputElement | null>(null)

  const todayForDateBox = () => DateUtil.getTodayDate(DISPLAY_DATE_UNIT)
  const fromDt = ref(todayForDateBox())
  const toDt = ref(todayForDateBox())
  const mnclLocalChangeList = ref<MnclLocalRegistRowDto[]>([])

  const resetSearchPeriodToToday = () => {
    const t = todayForDateBox()
    fromDt.value = t
    toDt.value = t
  }

  onMounted(resetSearchPeriodToToday)
  onActivated(resetSearchPeriodToToday)

  useHead({ title: '등록' })

  const [httpRequest] = useHttp()
  const { questionMessage, errorMessage, successNotify } = usePage()

  const clearExcelInput = () => {
    if (excelRef.value) excelRef.value.value = ''
  }

  const openExcelPicker = () => {
    excelRef.value?.click()
  }

  const notifyExcelUploadOutcome = (data: MnclExcelUploadResponse) => {
    if (data.code === '0000') {
      const baseMsg = data.message || '엑셀 업로드가 완료되었습니다.'
      const missingList = data.missingHblNoList
      const hasMissing = Array.isArray(missingList) && missingList.length > 0
      const missing = hasMissing ? `\n저장되지 않은 HBL: ${missingList.join(', ')}` : ''
      successNotify(baseMsg + missing, {
        durationMs: hasMissing ? 6500 : 4500
      })
    } else {
      errorMessage(data.message || '엑셀 업로드에 실패했습니다.')
    }
  }

  const downloadBlobAsFile = (blob: Blob, filename: string) => {
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    link.click()
    window.URL.revokeObjectURL(url)
  }

  const handleSearch = async () => {
    const { data, error } = await httpRequest(
      getMnclLocalList({ fromDt: fromDt.value, toDt: toDt.value })
    )
    if (error) {
      errorMessage(error.message)
      return
    }
    mnclLocalChangeList.value = parseMnclLocalListBody(data)
  }

  const handleUploadExcel = async (e: Event) => {
    const target = e.target as HTMLInputElement
    const file = target.files?.item(0)
    if (!file) return

    const isConfirm = await questionMessage('엑셀 파일을 업로드하시겠습니까?')
    if (!isConfirm) {
      clearExcelInput()
      return
    }

    const form = FormBuilder.create().appendFile('file', file).appendJson('param', null).build()

    const { data, error } = await httpRequest(uploadExcel(form))

    if (error) {
      errorMessage(error.message)
    } else if (data) {
      notifyExcelUploadOutcome(data)
    }

    clearExcelInput()
  }

  const handleDownloadTemplate = async () => {
    try {
      const response = await downloadMnclTemplate()
      const blob = new Blob([response.data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      })
      downloadBlobAsFile(blob, 'MNCL_업로드양식.xlsx')
    } catch {
      errorMessage('양식 다운로드에 실패했습니다.')
    }
  }
</script>

<style scoped lang="scss" src="@/shared/assets/scss/pages/regist.scss"></style>
