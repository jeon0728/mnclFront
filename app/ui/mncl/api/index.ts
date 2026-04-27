import { axios } from '@/shared/utils'

/** 엑셀 업로드 API 응답 (백엔드 반환 필드와 동일) */
export interface MnclExcelUploadResponse {
  code: string
  message: string
  mnclLocalChangeListDtoList: unknown[]
  /** 엑셀에는 있으나 저장되지 않은 HBL 번호 목록 */
  missingHblNoList?: string[]
}

/** HBL 조회 단건 (백엔드 `mnclList` / `mncllist` 등) */
export interface MnclListDto {
  hblNo?: string
  blNo?: string
  polName?: string
  vesselName?: string
  voyageNo?: string
  deliverDateTime?: string
  onboardDate?: string
  arrivalDate?: string
  companyEng?: string
  fmcBondNo?: string
  /** 배송 에이전트 상세 문구 (있을 경우) */
  addEngSea?: string
  attnManSea?: string
  emailSea?: string
  faxNoSea?: string
  telNoSea?: string
}

/** LOCAL CHARGE 행 */
export interface MnclLocalChangeDto {
  item?: string
  currCode?: string
  price?: number | string
  per?: string
  min?: number | string
}

export interface MnclSearchListData {
  /** 단건 객체이거나 길이 1 배열로 내려올 수 있음 */
  mnclList?: MnclListDto | MnclListDto[] | null
  mncllist?: MnclListDto | MnclListDto[] | null
  mnclLocalChangeList?: MnclLocalChangeDto[]
}

export type MnclSearchListParsed = {
  mnclList: MnclListDto | null
  mnclLocalChangeList: MnclLocalChangeDto[]
}

/**
 * 백엔드가 단건을 객체로 줄 수도 있고, 길이 1 배열로 줄 수도 있음.
 * 배열을 그대로 쓰면 `mnclRow?.polName` 등이 모두 undefined 가 된다.
 */
export const normalizeMnclListSingle = (raw: unknown): MnclListDto | null => {
  if (raw === null || raw === undefined) return null
  if (Array.isArray(raw)) {
    const first = raw[0]
    if (first && typeof first === 'object') return first as MnclListDto
    return null
  }
  if (typeof raw === 'object') return raw as MnclListDto
  return null
}

/** `ResponseVo`(`data` 래핑) 또는 본문만 온 경우 모두 수용 */
export const parseMnclSearchListBody = (body: unknown): MnclSearchListParsed | null => {
  if (!body || typeof body !== 'object') return null
  const b = body as Record<string, unknown>
  const payload = b.data
  const inner =
    payload !== undefined && payload !== null && typeof payload === 'object'
      ? (payload as Record<string, unknown>)
      : b
  const single = normalizeMnclListSingle(inner.mnclList ?? inner.mncllist)
  const rawList = inner.mnclLocalChangeList
  const list = (Array.isArray(rawList) ? rawList : []) as MnclLocalChangeDto[]
  return { mnclList: single, mnclLocalChangeList: list }
}

export const getMnclList = async ( param: { hblNo: string } ) => {
  return await axios.post<MnclSearchListData>( `/api/mncl/search/list`, param )
}

/** 로컬 목록 조회 행 (등록 화면 테이블) */
export interface MnclLocalRegistRowDto {
  hblNo?: string
  inDateTime?: string
}

export interface MnclLocalListData {
  mnclLocalChangeList?: MnclLocalRegistRowDto[]
}

/** `ResponseVo`(`data` 래핑) 또는 본문만 온 경우 — 등록 화면 로컬 목록 */
export const parseMnclLocalListBody = (body: unknown): MnclLocalRegistRowDto[] => {
  if (!body || typeof body !== 'object') return []
  const b = body as Record<string, unknown>
  const inner =
    b.data !== undefined && b.data !== null && typeof b.data === 'object'
      ? (b.data as Record<string, unknown>)
      : b
  const list = inner.mnclLocalChangeList
  return Array.isArray(list) ? (list as MnclLocalRegistRowDto[]) : []
}

export const getMnclLocalList = async ( param: { fromDt: string; toDt: string } ) => {
  return await axios.post<MnclLocalListData>( `/api/mncl/search/local/list`, param )
}

export const uploadExcel = async ( param: FormData ) => {
  return await axios.multipart<MnclExcelUploadResponse>( `/api/mncl/excel/upload`, param )
}

export const downloadMnclTemplate = async () => {
  return await axios.get(`/api/mncl/excel/template`, {
    responseType: 'blob',
  })
}
