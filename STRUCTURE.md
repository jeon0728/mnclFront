# Project Structure Overview

이 문서는 프로젝트의 전체 구조와 각 디렉토리의 역할, 주요 기능에 대한 상세한 설명을 제공합니다.

## 프로젝트 개요

이 프로젝트는 **Nuxt 4** 기반의 프론트엔드 애플리케이션으로, SSR을 비활성화한 SPA(Single Page Application) 방식으로 구성되어 있습니다. 주요 기술 스택은 다음과 같습니다:

- **프레임워크**: Nuxt 4.1.2 (SSR: false)
- **상태 관리**: Pinia 3.0.3
- **HTTP 클라이언트**: Axios 1.12.2
- **UI 라이브러리**: AG Grid Enterprise, Zenith Pulse Vue, Full Calendar
- **스타일**: SCSS
- **타입**: TypeScript

---

## 최상위 디렉토리 구조

### 설정 파일

- **`nuxt.config.ts`**: Nuxt 프레임워크 설정 파일

  - SSR 비활성화 (`ssr: false`)
  - API 프록시 설정 (`/api/**` → 백엔드 서버)

    **`api 호출시 flow`**
    [브라우저]
    ↓ axios.post('/api/v1/schedule/search/list', data)
    ↓ Axios 인터셉터 처리
    ↓ (Authorization 헤더 + 쿠키 포함)

    [Nuxt Dev Server (localhost:3000)]
    ↓ Nitro devProxy가 /api 경로 감지
    ↓ 프록시 처리

    [백엔드 서버 (127.0.0.1:8080)]
    ↓ /api/v1/schedule/search/list 처리
    ↓ 응답 반환

    [Nuxt Dev Server]
    ↓ 프록시를 통해 응답 전달

    [브라우저]
    ↓ Axios Response 인터셉터
    ↓ 컴포넌트에서 사용

  - 플러그인 등록 및 실행 순서 정의
  - 글로벌 CSS/SCSS 파일 로드
  - AG Grid, Pinia 등 모듈 설정

- **`tsconfig*.json`**: TypeScript 컴파일러 설정
- **`eslint.config.mjs`**: ESLint 린터 설정
- **`package.json`**: 프로젝트 의존성 및 스크립트 정의
- **`pnpm-lock.yaml`**: pnpm 패키지 매니저 락 파일

### 정적 자산

- **`public/`**: 정적 파일 디렉토리
  - `favicon.ico`: 파비콘
  - `policy/`: 개인정보처리방침, 이용약관 등 정책 문서 (한글/영문)
  - `robots.txt`: 검색 엔진 크롤러 설정

### 서버 사이드

- **`server/`**: Nuxt 서버 사이드 코드
  - **`healthcheck.get.ts`**: 헬스체크 API 엔드포인트
  - **`middleware/auth.ts`**: 서버 사이드 인증 미들웨어 (상세 설명은 하단 참조)

---

## 앱 엔트리 (`app/`)

### 루트 파일

- **`app.vue`**: 애플리케이션의 최상위 루트 컴포넌트
- **`app.config.ts`**: 앱 전역 설정 (비어있음)
- **`error.vue`**: 전역 에러 페이지 (에러 발생 시 표시)

### 레이아웃 (`app/layouts/`)

페이지 레벨의 레이아웃 템플릿을 정의합니다.

- **`default.vue`**: 기본 레이아웃 (메인 애플리케이션)
- **`login.vue`**: 로그인 페이지 레이아웃
- **`signup.vue`**: 회원가입 페이지 레이아웃

### 페이지 (`app/pages/`)

Nuxt의 파일 기반 라우팅 시스템입니다. 디렉토리 구조가 URL 경로로 자동 매핑됩니다.

- **`index.vue`**: 루트 경로 (`/`)
- **`login/index.vue`**: 로그인 페이지 (`/login`)
- **`signup/index.vue`**: 회원가입 페이지 (`/signup`)
- **`main/*`**: 메인 애플리케이션 페이지들

  - `main/corp/`: 회사 관리
  - `main/partner/`: 거래처 관리
  - `main/user/`: 사용자 관리
  - `main/schedule/`: 스케줄
  - 기타 도메인별 페이지들

- **`(main)/`**: 그룹 라우트 (레이아웃 공유)

---

## 공통 자원 (`app/shared/`)

프로젝트 전반에서 재사용되는 공통 리소스를 관리하는 디렉토리입니다.

### 자산 (`shared/assets/`)

#### 폰트 (`assets/fonts/`)

- **NotoSansCJKKR**: 한글 폰트 패밀리 (Bold, Light, Medium, Regular)
- **pretendard**: Pretendard 폰트 (woff2)

#### 이미지 (`assets/image/`)

- 로고 이미지 (`logo.png`, `logo.svg`, `logo-login.svg`)
- 로그인 배경 이미지 (`login-bg-temp.png`)

#### 스타일 (`assets/scss/`)

SCSS 파일 구조:

- **`global.scss`**: 전역 스타일 진입점
- **`_variable.scss`**: 전역 SCSS 변수
- **`_fonts.scss`**: 폰트 정의
- **`_table.scss`**: 테이블 공통 스타일
- **`variables/`**: 세부 변수 파일들 (색상, 간격, 타이포그래피 등)
- **`mixins/`**: 재사용 가능한 SCSS 믹스인
- **`functions/`**: SCSS 함수
- **`components/`**: 컴포넌트별 스타일 파일들 (32개 파일)
- **`help/`**: 도움말 관련 스타일

#### 템플릿 (`assets/templetes/`)

재사용 가능한 Vue 컴포넌트 템플릿들:

- `allocationInner.vue`, `blTempleteInner.vue`, `bookingCard.vue`, `bookingTable.vue`
- `cardHead.vue`, `cardMoreBottom.vue`, `contentsInputInner.vue`
- `header.vue`, `logoUpdater.vue`, `profile.vue`
- `sidemenuMo.vue`, `sidemenuPC.vue`
- `siRegister.vue`, `siRegisterGrid.vue`, `siStatus.vue`

### API 클라이언트 (`shared/api/`)

- **`getCommonCodesAsClient.ts`**: 공통 코드 조회 API (클라이언트 사이드)

### Composables (`shared/composables/`)

Vue 3 Composition API 기반의 재사용 가능한 로직입니다.

#### API 관련 (`composables/api/`)

- **`commonCodes.ts`**: 공통 코드 조회 composable
- **`corpOptions.ts`**: 법인 옵션 조회
- **`serverInit.ts`**: 서버 초기화 데이터 조회
- **`w7Common.ts`**: W7 공통 기능

#### 코드 관리 (`composables/code/`)

- **`useCommonCodes.ts`**: 공통 코드 사용 훅
- **`index.ts`**: 코드 관련 composables 통합 export

#### 공통 (`composables/common/`)

11개의 공통 composables:

- **`useHttp.ts`**: HTTP 요청 처리 및 로딩 상태 관리 (상세 설명은 하단 참조)
- 기타 공통 유틸리티 composables

#### 그리드 (`composables/grid/`)

AG Grid 관련 composables (4개 파일)

#### 모달 (`composables/modal/`)

- **`useMessage.ts`**: 메시지 모달 관리
- **`useNotify.ts`**: 알림 관리
- **`index.ts`**: 모달 관련 composables 통합

#### 모델 (`composables/model/`)

데이터 모델 관련 composables (10개 파일)

### 상수 (`shared/constants/`)

#### AG Grid (`constants/ag-grid/`)

AG Grid 설정 및 상수 (2개 파일)

#### 공통 (`constants/common/`)

- 인증 관련 상수 (`auth.ts`)
- 참/거짓 값 상수 (`trueFalseValue.ts`)
- 기타 공통 상수들 (6개 파일, 1개 JSON)

#### 제어 (`constants/control/`)

컨트롤 관련 상수 (3개 파일)

#### 메뉴 (`constants/menu.ts`)

애플리케이션 메뉴 구조 정의

#### 모달 (`constants/modal/`)

- **`modalCode.ts`**: 모달 코드 상수

#### 타입 (`constants/types/`)

타입 관련 상수 (1개 파일)

### 컨테이너 (`shared/containers/`)

페이지 레벨의 복합 UI 컴포넌트입니다.

- **`Card/`**: 카드 컨테이너 컴포넌트
- **`CommandPalette/`**: 명령 팔레트
- **`MainContent/`**: 메인 콘텐츠 영역
- **`MainHeader/`**: 메인 헤더
- **`Menu/`**: 메뉴 컴포넌트 (6개 파일)
- **`Message/`**: 메시지 표시 컴포넌트
- **`Modal/`**: 모달 컨테이너
- **`ModalLoadingBar/`**: 모달 로딩 바
- **`ModalPage/`**: 모달 페이지
- **`Notify/`**: 알림 컴포넌트
- **`Overlay/`**: 오버레이
- **`PaginationBar/`**: 페이지네이션 바
- **`Popup/`**: 팝업 컴포넌트
- **`Profile/`**: 프로필 컴포넌트
- **`RouterTab/`**: 라우터 탭
- **`SearchForm/`**: 검색 폼
- **`Tab/`**: 탭 컴포넌트

### 레이아웃 (`shared/layouts/`)

재사용 가능한 레이아웃 컴포넌트입니다.

- **`LoginLayout/`**: 로그인 레이아웃
- **`MainLayout/`**: 메인 레이아웃
- **`ModalLayout/`**: 모달 레이아웃
- **`PageLayout/`**: 페이지 레이아웃

### 플러그인 (`shared/plugins/`)

Nuxt 플러그인은 애플리케이션 초기화 시 자동으로 실행됩니다.

#### 실행 순서

1. **`ag-grid.ts`**: AG Grid 라이브러리 초기화
2. **`axios.ts`**: Axios 인스턴스를 Nuxt 앱에 등록 (`$axios`로 접근 가능)
3. **`ui.ts`** (client): UI 라이브러리 초기화
4. **`common.client.ts`** (client): 공통 클라이언트 사이드 초기화
5. **`logout-on-unload.client.ts`** (client): 브라우저 종료 시 로그아웃 처리
6. **`init.client.ts`** (client): 애플리케이션 초기 데이터 로딩
   - 사용자 정보 조회
   - 메뉴 데이터 로딩
   - 세션 정보 설정
   - 법인 정보 설정

### Props (`shared/props/`)

- **`index.ts`**: 공통 props 정의
- **`page.ts`**: 페이지 관련 props

### 스토어 (`shared/store/`)

Pinia 기반 전역 상태 관리 스토어입니다.

- **`session.ts`**: 사용자 세션 정보 관리
- **`corp.ts`**: 법인 정보 관리
- **`menu.ts`**: 메뉴 상태 관리
- **`tab.ts`**: 탭 상태 관리
- **`modals.ts`**: 모달 상태 관리
- **`page.ts`**: 페이지 상태 관리
- **`link.ts`**: 링크 상태 관리
- **`logo.ts`**: 로고 상태 관리
- **`mobile.ts`**: 모바일 상태 관리
- **`wh.ts`**: 창고 코드 관리
- **`types/`**: 스토어 타입 정의

### 타입 (`shared/types/`)

- **`index.d.ts`**: 전역 타입 정의
- **`vue.d.ts`**: Vue 관련 타입 확장

### UI 컴포넌트 (`shared/ui/`)

재사용 가능한 수준의 UI 컴포넌트입니다.

#### AG Grid (`ui/ag-grid/`)

AG Grid 관련 컴포넌트

#### 그리드 레이아웃 (`ui/GridLayoutManager/`)

그리드 레이아웃 관리 컴포넌트

#### Gsabis 컴포넌트 시리즈

프로젝트 전용 UI 컴포넌트 라이브러리:

- **`GsabisAsyncCodeBox/`**: 비동기 코드 박스 (6개 파일)
- **`GsabisButton/`**: 버튼 컴포넌트
- **`GsabisCheckBox/`**: 체크박스
- **`GsabisCodeBox/`**: 코드 박스
- **`GsabisDateBox/`**: 날짜 입력 박스
- **`GsabisGridButton/`**: 그리드 버튼
- **`GsabisModalButton/`**: 모달 버튼
- **`GsabisMultiSelectBox/`**: 다중 선택 박스
- **`GsabisNumberBox/`**: 숫자 입력 박스
- **`GsabisSelectBox/`**: 선택 박스
- **`GsabisTimeBox/`**: 시간 입력 박스

#### 기타

- **`Label/`**: 라벨 컴포넌트
- **`Layout/`**: 레이아웃 컴포넌트

### 유틸리티 (`shared/utils/`)

#### HTTP (`utils/http/`)

HTTP 통신 관련 유틸리티입니다.

- **`Axios.ts`**: CustomAxios 클래스 (상세 설명은 하단 참조)
- **`axiosUtil.ts`**: Axios 인터셉터 및 유틸리티 함수
- **`Fetch.ts`**: Fetch API 래퍼 (사용하지 않고 있음.)
- **`FormBuilder.ts`**: 폼 데이터 빌더
- **`index.ts`**: HTTP 유틸리티 통합 export

#### 그리드 (`utils/grid/`)

AG Grid 관련 유틸리티 (11개 파일)

#### 원시 타입 (`utils/premitive/`)

원시 타입 처리 유틸리티 (10개 파일)

#### 리포트 (`utils/report/`)

리포트 생성 유틸리티 (2개 파일)

#### 서비스 (`utils/service/`)

서비스 레이어 유틸리티 (2개 파일)

#### 지원 (`utils/support/`)

지원 유틸리티 (2개 파일)

#### 타입 (`utils/types/`)

- **`axios.ts`**: Axios 관련 타입 정의 (`ResponseVo`, `ErrorVo` 등)

---

## 도메인 UI (`app/ui/`)

비즈니스 도메인별로 구분된 UI 컴포넌트 및 로직입니다. 각 도메인은 독립적인 폴더로 관리됩니다.

### 도메인 구조

각 도메인 폴더는 일반적으로 다음과 같은 구조를 가집니다:

```
app/ui/{domain}/
├── api/           # 도메인별 API 클라이언트
├── data/          # 도메인별 데이터/상수
├── dto/           # 도메인별 DTO 타입
├── {Domain}.vue   # 메인 컴포넌트
├── {Domain}.Grid.vue  # 그리드 컴포넌트
└── ...            # 기타 도메인별 컴포넌트
```

### 주요 도메인

- **`corp/`**: 회사 관리 도메인
- **`partner/`**: 거래처 관리 도메인
- **`user/`**: 사용자 관리 도메인
- **`userAuth/`**: 사용자 권한 관리 도메인
- **`hscode/`**: HS 코드 관리 도메인
- **`schedule/`**: 스케줄 관리 도메인
  - `Schedule.vue`: 메인 스케줄 컴포넌트
  - `Schedule.Calendar.vue`: 캘린더 뷰
  - `Schedule.Grid.vue`: 그리드 뷰
  - `Vessel.Detail.Panel.vue`: 상세 패널
- **`sc/`**: SC(Shipping Contract) 관련 도메인
- **`tmplt/`**: 템플릿 관리 도메인
- **`login/`**: 로그인 도메인
- **`signup/`**: 회원가입 도메인
- **`dev/`**: 개발/테스트용 도메인
- **`modals/`**: 도메인별 모달 컴포넌트

---

## HTTP 통신: Axios 상세 설명

### CustomAxios 클래스 (`shared/utils/http/Axios.ts`)

프로젝트의 HTTP 통신은 `CustomAxios` 클래스를 통해 중앙 집중식으로 관리됩니다.

#### 주요 특징

1. **싱글톤 인스턴스**: `export default new CustomAxios()`로 전역 인스턴스 제공
2. **기본 설정**:

   - 타임아웃: 180초 (180,000ms)
   - 기본 헤더: `Accept: application/json`, `Content-Type: application/json; charset=utf-8`
   - `withCredentials: true`: 쿠키 자동 전송

3. **인터셉터 자동 적용**: `createAxiosInterceptor`를 통해 요청/응답 인터셉터 자동 설정

#### 제공 메서드

```typescript
// GET 요청
axios.get<R>(url, config?)

// POST 요청
axios.post<R, D>(url, data, config?)

// PUT 요청
axios.put<R, D>(url, data, config?)

// DELETE 요청
axios.delete<R>(url, config?)

// 멀티파트 파일 업로드
axios.multipart<R>(url, formData, config?)

// 파일 다운로드
axios.downloadFile(fileId, config?)
```

#### 사용 예시

```typescript
import axios from '@/shared/utils/http/Axios'

// GET 요청
const { data } = await axios.get<User[]>('/api/users')

// POST 요청
const { data } = await axios.post<CreateUserResponse, CreateUserRequest>('/api/users', {
  name: 'John',
  email: 'john@example.com'
})

// 파일 업로드
const formData = new FormData()
formData.append('file', file)
const { data } = await axios.multipart('/api/upload', formData)

// 파일 다운로드
await axios.downloadFile(123)
```

### Axios 인터셉터 (`shared/utils/http/axiosUtil.ts`)

#### 요청 인터셉터 (Request Interceptor)

**기능**: 모든 HTTP 요청 전에 자동으로 실행됩니다.

1. **인증 토큰 자동 추가**:
   - `sessionStorage`에서 `ACCESS_TOKEN` 조회
   - 존재 시 `Authorization: Bearer {token}` 헤더 자동 추가

```typescript
config.headers['Authorization'] = `Bearer ${accessToken}`
```

#### 응답 인터셉터 (Response Interceptor)

**성공 응답 처리**:

- 기본적으로 `response` 객체를 그대로 반환
- 필요 시 `response.data`만 반환하도록 커스터마이징 가능

**에러 응답 처리**:

1. **401 Unauthorized (인증 실패)**:

   - 자동 토큰 갱신 시도
   - `sessionStorage`에서 `CORP_ID` 조회
   - `/api/auth/v1/access/token/{corpId}` 엔드포인트로 새 액세스 토큰 요청
   - 토큰 갱신 성공 시 원래 요청 자동 재시도
   - 토큰 갱신 실패 시 `/login`으로 리디렉션

2. **기타 에러**:

   - 서버에서 전달된 `x-error-code` 헤더가 있으면 에러 메시지에 추가
   - `data.unknown` 플래그가 있으면 Promise를 pending 상태로 유지 (에러 무시)
   - 그 외의 경우 에러 객체 반환

3. **네트워크 에러**:
   - "인터넷 연결을 확인해주세요." 메시지와 함께 에러 반환

#### 파일 다운로드 처리

파일 다운로드는 별도의 Axios 인스턴스를 사용합니다:

- `responseType: 'arraybuffer'`: 바이너리 데이터 수신
- `axiosResponseSuccessInterceptorByFile`: 파일 전용 응답 인터셉터
- `processDownloadFile`: 다운로드된 파일을 브라우저에 저장
  - `Content-Disposition` 헤더에서 파일명 추출
  - Blob URL 생성 후 자동 다운로드 트리거

### useHttp Composable (`shared/composables/common/useHttp.ts`)

HTTP 요청의 로딩 상태를 자동으로 관리하는 composable입니다.

#### 주요 기능

1. **로딩 상태 관리**: 요청 시작/종료 시 자동으로 로딩 상태 업데이트
2. **전역 로딩 바 연동**: `useLoadingStore`와 연동하여 전역 로딩 모달 표시
3. **에러 처리**: try-catch로 에러를 안전하게 처리하고 반환

#### 사용 예시

```typescript
import { useHttp } from '@/shared/composables/common/useHttp'
import axios from '@/shared/utils/http/Axios'

const [request, isLoading] = useHttp()

// 기본 사용 (로딩 바 표시)
const { data, error } = await request(axios.get('/api/users'))

// 로딩 바 없이 요청
const { data, error } = await request(axios.get('/api/users'), { noLoading: true })

// 로딩 상태 확인
if (isLoading.value) {
  console.log('요청 중...')
}
```

#### 반환 타입

```typescript
type RequestResult<T> = {
  data: T | null
  error: Error | null
}
```

---

## 미들웨어 상세 설명

### 서버 사이드 미들웨어 (`server/middleware/auth.ts`)

Nuxt의 서버 사이드 미들웨어로, 모든 요청이 라우트 핸들러에 도달하기 전에 실행됩니다.

#### 주요 기능

1. **경로 필터링**:

   - `/api/**`: API 요청은 미들웨어를 통과 (백엔드로 프록시)
   - `/_nuxt/**`: Nuxt 빌드 자산은 통과
   - 정적 파일 (확장자 포함): 통과

2. **인증 상태 확인**:

   - 쿠키에서 `REFRESH_TOKEN` 확인
   - 쿠키에서 `session_valid` 플래그 확인

3. **인증 로직**:

   **케이스 1: Refresh Token은 있지만 session_valid가 없는 경우**

   - 브라우저 종료로 인한 세션 만료로 간주
   - 제외된 경로가 아니면 `/login`으로 리디렉션

   **케이스 2: 로그인 상태 (Refresh Token + session_valid)**

   - `/login` 또는 `/signup` 접근 시 홈(`/`)으로 리디렉션
   - 그 외 경로는 정상 진행

   **케이스 3: 비로그인 상태**

   - `/login`은 정상 진행
   - 제외된 경로(`/register`, `/forgot-password`, `/public` 등)는 정상 진행
   - 그 외 경로는 `/login`으로 리디렉션

#### 제외된 경로 (Excluded Paths)

```typescript
const excludedPaths = ['/login', '/register', '/forgot-password', '/public']
```

이 경로들은 인증 없이 접근 가능합니다.

#### 실행 시점

- **서버 사이드**: Nuxt 서버에서 실행 (SSR이 활성화된 경우)
- **프로덕션**: 정적 사이트 생성 시에도 작동
- **개발 모드**: `nuxt dev` 실행 시 작동

---

## 공통 vs 도메인 사용 기준

### 공통 (`shared/`)

다음 조건 중 하나 이상을 만족하는 경우 `shared/`에 위치합니다:

- 둘 이상의 도메인에서 사용
- 전체 애플리케이션에서 사용
- 재사용 가능한 범용 컴포넌트/유틸리티
- 전역 상태 관리 (스토어)
- 공통 API 클라이언트

### 도메인 (`app/ui/{domain}/`)

다음 조건을 만족하는 경우 도메인 폴더에 위치합니다:

- 특정 비즈니스 도메인에만 종속
- 해당 도메인에서만 사용되는 컴포넌트
- 도메인별 API 클라이언트
- 도메인별 DTO/타입

### 페이지 (`app/pages/`)

- 라우트 엔트리 포인트
- 비즈니스 로직은 composable/store/api에 위임
- 최소한의 프레젠테이션 로직만 포함

---

## 스타일 가이드

### SCSS 파일 구조

1. **글로벌 변수/믹스인**:

   - `shared/assets/scss/_variable.scss`: 전역 변수
   - `shared/assets/scss/mixins/`: 믹스인
   - `shared/assets/scss/functions/`: 함수

2. **컴포넌트 스타일**:

   - 컴포넌트 전용: `<style scoped>` 사용
   - 공통 컴포넌트 스타일: `shared/assets/scss/components/`

3. **새 SCSS 추가 시**:
   - 용도(기초/컴포넌트/헬퍼)를 명확히 구분
   - 파일명에 용도를 반영 (예: `_component-button.scss`)

---

## 스토어 가이드

### 스토어 위치

- `shared/store/<domain>.ts` 형식으로 명명
- 각 스토어 상단에 목적/주 사용 페이지 주석 작성 권장

### 스토어 예시

```typescript
// shared/store/session.ts
export const useSessionStore = defineStore('session', {
  state: () => ({
    _session: {} as Session
  }),
  getters: {
    session: (state) => state._session,
    getSession: (state) => (key: keyof Session) => state._session?.[key]
  },
  actions: {
    setSession(session: Session) {
      this._session = session
    }
  }
})
```

### 스토어 의존성

- 스토어 간 의존 그래프는 주석이나 README에 문서화 권장

---

## 추가 권장사항

### 네이밍 규칙

- **공통 컴포넌트**: `Shared*` 접두사 (예: `SharedButton`)
- **도메인 컴포넌트**: 도메인명 접두사 (예: `CorpGrid`, `UserForm`)

### 파일 추가 시

1. 어느 레이어에 둘지 결정 (`shared` vs `app/ui/{domain}`)
2. 파일 상단에 목적 주석 작성
3. 필요 시 이 문서에 한 줄 메모 추가

### API 호출 패턴

- 도메인별 API는 `app/ui/{domain}/api/`에 위치
- 공통 API는 `shared/api/`에 위치
- 가능하면 API 호출 로직을 `shared/api` 또는 별도 `services` 계층으로 이동 권장

---

## 프로젝트 실행 및 빌드

### 개발 서버 실행

```bash
pnpm dev          # 기본 포트 (3000)
pnpm dev:local    # 포트 2000
```

### 빌드

```bash
pnpm build        # 프로덕션 빌드
pnpm generate     # 정적 사이트 생성
pnpm preview      # 빌드 결과 미리보기
```

### 환경 변수

- `NUXT_API_BASE`: 백엔드 API 베이스 URL (기본값: `http://127.0.0.1:8080`)

---

## 주요 기술 스택 요약

| 카테고리        | 기술               | 버전           |
| --------------- | ------------------ | -------------- |
| 프레임워크      | Nuxt               | 4.1.2          |
| 상태 관리       | Pinia              | 3.0.3          |
| HTTP 클라이언트 | Axios              | 1.12.2         |
| 그리드          | AG Grid Enterprise | 33.3.0         |
| UI 라이브러리   | Zenith Pulse Vue   | 3.0.0-alpha.30 |
| 스타일          | SCSS               | 1.93.2         |
| 타입            | TypeScript         | 5.9.2          |
| 패키지 매니저   | pnpm               | -              |

---

이 문서는 프로젝트의 구조와 주요 기능에 대한 개요를 제공합니다. 더 자세한 내용은 각 디렉토리의 실제 코드를 참조하시기 바랍니다.
