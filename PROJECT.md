# mnclFront — 프로젝트 스펙 및 빌드 가이드

## 개요

| 항목 | 내용 |
|------|------|
| 프로젝트명 | **mnclFront** |
| 레포지토리 종류 | `private` 패키지 (npm publish 대상 아님) |
| 모듈 시스템 | ESM (`"type": "module"`) |
| 실행 환경 | **Node.js 22 이상** (README 및 운영 기준 필수) |

## 기술 스택 (요약)

| 영역 | 사용 기술 |
|------|-----------|
| 프레임워크 | **Nuxt 4** (`^4.1.2` — 빌드 시점에 Nuxt 4.2.x 등으로 해석될 수 있음) |
| UI 런타임 | **Vue 3** (`^3.5.22`) · **Vue Router 4** |
| 상태 관리 | **Pinia 3** + `@pinia/nuxt` |
| 번들러 / 도구 체인 | **Vite 7** (Nuxt 번들 내장) · **Nitro 2** · **TypeScript 5.x** |
| 스타일 | **Sass / sass-embedded** |
| 렌더링 모드 | **CSR (SPA)** — `ssr: false` |
| 산출물 형태 | Nitro **`preset: static`** — 정적 사이트(프리렌더 포함) 출력 |

실제 빌드에 포함된 버전은 `npm list nuxt vite vue` 또는 빌드 로그 상단 표기를 참고하면 된다.

## 주요 기능 라이브러리

업무·UI 기능을 위해 다음 등이 포함되어 있다.

- **데이터그리드:** AG Grid Community / Enterprise, `ag-grid-vue3`
- **차트:** ApexCharts, `vue3-apexcharts`
- **캘린더:** FullCalendar (`@fullcalendar/vue3` 등)
- **엑셀:** `xlsx`
- **HTTP:** `axios` (공용 유틸·플러그인과 연동)
- **UI/아이콘:** `@mdi/font`, `@phosphor-icons/vue`, `zenith-pulse-vue`
- **기타:** `dayjs`, `uuid`, `@ag-grid-community/locale` 등

## 소스 구조 (요약)

| 경로 | 역할 |
|------|------|
| `app/` | Nuxt **소스 루트** (페이지, 컴포넌트, 플러그인, 스토어, SCSS 등) |
| `app/pages/` | 파일 기반 라우트 (예: `/mncl/list`, `/mncl/regist`) |
| `app/ui/` | 화면 단위 UI (예: MNCL 목록·등록) |
| `app/shared/` | 공용 레이아웃, 컨테이너, 플러그인, 유틸, 스타일 |
| `nuxt.config.ts` | Nuxt / Nitro / Vite / 프록시 / 런타임 설정 |
| `tsconfig*.json` | TypeScript 프로젝트 참조 (`@/*` → `app/*`) |

루트 `/`는 `/mncl/list`로 리다이렉트되도록 설정되어 있다.

## 환경 변수

| 변수 | 용도 |
|------|------|
| `NUXT_API_BASE` | API 베이스 URL. 미설정 시 `http://127.0.0.1:8080` (또는 `/api` 프록시 대상 `http://127.0.0.1:8080/api`)가 기본값으로 쓰인다. |

`.env`는 Git에 포함되지 않는다. 로컬·배포 환경에 맞게 파일을 두면 된다.

## API 프록시

- **개발:** `nitro.devProxy`로 `/api` → 백엔드(기본 `NUXT_API_BASE` 또는 `http://127.0.0.1:8080/api`)로 프록시된다.
- **런타임:** `routeRules`의 `/api/**` 프록시가 설정되어 있다. 정적 배포 시 실제 동작은 호스팅 환경(동일 출처 프록시, 별도 게이트웨이 등)과 맞춰야 한다.

## 의존성 설치

README 기준 **pnpm** 사용을 가정한다. Node 22+에서 실행한다.

```bash
pnpm install
```

npm을 쓰는 경우:

```bash
npm install
```

`postinstall`에 `nuxt prepare`가 있어 설치 후 Nuxt 타입·아티팩트가 준비된다.

## 개발 서버

| 명령 | 설명 |
|------|------|
| `pnpm dev` / `npm run dev` | 기본 포트(보통 **3000**)로 개발 서버 |
| `pnpm dev:local` / `npm run dev:local` | **포트 2000**으로 개발 서버 (`nuxt dev -p 2000`) |

## 프로덕션 빌드

| 명령 | 설명 |
|------|------|
| `pnpm build` / `npm run build` | 프로덕션 빌드 (`nuxt build`) — Nitro **static** 프리셋으로 클라이언트 빌드 + 정적 출력 생성 |
| `pnpm generate` / `npm run generate` | `nuxt generate` (정적 생성 전용 워크플로가 필요할 때) |
| `pnpm preview` / `npm run preview` | 빌드 결과 미리보기 (`nuxt preview`) |

현재 설정(`ssr: false`, `preset: static`)에서는 `build` 실행 시 라우트가 프리렌더되며, 로그에 **“Generated public .output/public”** 이 출력된다.

## 빌드 산출물 위치

실제 배포·웹 서버로 올려야 하는 **정적 루트**는 다음과 같다.

| 경로 | 설명 |
|------|------|
| **`.output/public/`** | **배포용 정적 파일** — `index.html`, `/mncl/list`, `/mncl/regist` 등 HTML, `_nuxt/` 번들, `policy/`, `robots.txt` 등이 생성된다. |

빌드 로그에서도 다음과 같이 안내한다.

- 미리보기 예: `npx serve .output/public`

추가로 알아두면 좋은 디렉터리:

| 경로 | 설명 |
|------|------|
| `.nuxt/` | Nuxt가 생성하는 내부 빌드·타입용 (개발/빌드 시 갱신, Git 제외) |
| `node_modules/.cache/nuxt/.nuxt/dist/client/` | Vite 클라이언트 빌드 캐시 경로가 될 수 있음 (**직접 배포 대상 아님**) |
| `.output/` | Nitro 전체 출력 디렉터리. **정적 호스팅은 보통 `.output/public`만** 서빙 |

`.gitignore`에 `dist`, `.output`, `.nuxt` 등이 포함되어 있어 저장소에는 올라가지 않으며, CI·배포 파이프라인에서 빌드 후 해당 산출물을 사용하면 된다.

## 품질 도구

- **ESLint:** `@nuxt/eslint`, Vue/ Nuxt 규칙
- **`vue-tsc`:** 타입 검사용으로 devDependency에 포함 (스크립트는 `package.json`에 없을 수 있음 — 필요 시 `vue-tsc --noEmit` 등으로 실행)

---

문서 기준일: 2026-04-28. 버전 번호는 `package.json` 및 실제 설치된 `node_modules`와 빌드 로그를 함께 확인하는 것이 가장 정확하다.
