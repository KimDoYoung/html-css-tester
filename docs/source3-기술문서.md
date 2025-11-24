# Source Code Viewer (source3.html) Developer Guide

이 문서는 `source3.html` 소스 코드 뷰어의 구조, 핵심 로직, 그리고 유지보수 방법을 설명합니다. 새로운 개발자가 프로젝트를 이해하고 기능을 확장하는 데 도움을 주기 위해 작성되었습니다.

## 1. 프로젝트 구조 (Architecture)

현재 이 프로젝트는 **단일 HTML 파일 (`source3.html`)** 로 구성되어 있습니다. 모든 HTML 구조, CSS 스타일, JavaScript 로직이 이 하나의 파일에 포함되어 있습니다.

### 파일 섹션 구분
- **CSS (`<style>`)**: 상단에 위치. 테마(Light/Dark), 레이아웃, 유틸리티 클래스 정의.
- **HTML (`<body>`)**:
  - **Header**: 컨트롤 박스 (폰트, 테마, 페이지 뷰 설정 등).
  - **Source Container**: 코드와 라인 번호를 담는 메인 컨테이너.
- **JavaScript (`<script>`)**: 하단에 위치. 모든 기능 구현.

## 2. 핵심 모듈 및 로직

### 2.1 멀티 페이지 뷰 (Multi-Page View)
긴 코드를 2단, 3단으로 나누어 보여주는 핵심 기능입니다.

- **진입점**: `switchToPageView(pageNum)` 함수.
- **작동 원리**:
  1. **원본 저장**: 최초 실행 시 `saveOriginalHTML()`로 원본 코드와 라인 번호를 메모리에 저장합니다.
  2. **초기화**: `restoreOriginalView()`를 호출하여 DOM을 깨끗한 상태로 되돌립니다.
  3. **분할 로직**: `splitCodeIntoColumns(columns)` 함수가 전체 라인 수를 계산하여 각 컬럼에 들어갈 라인을 분배합니다.
  4. **DOM 생성**: `div.code-column` 요소를 동적으로 생성하여 분할된 코드를 삽입합니다.
  5. **레이아웃 조정**: `.source-container`에 `page-2` 또는 `page-3` 클래스를 추가하여 `max-width`를 확장합니다 (115%, 125%).

### 2.2 커서 라인 하이라이트 (Line Highlight)
클릭한 라인을 강조하는 기능입니다.

- **이벤트 위임 (Event Delegation)**:
  - 멀티 페이지 뷰에서는 코드가 동적으로 생성되므로, 개별 라인에 이벤트를 걸지 않고 부모 컨테이너인 `.code-with-lines`에 하나의 이벤트 리스너를 등록하여 처리합니다.
  - `e.target.closest('.line')`을 사용하여 클릭된 요소를 판별합니다.
- **상태 유지**:
  - 페이지 뷰 전환 시(`switchToPageView`), `isLineHighlightEnabled` 플래그를 확인하여 기능이 켜져 있다면 즉시 `wrapCodeLines()`를 재호출하여 기능을 유지합니다.

### 2.3 검색 기능 (Search)

#### source3.html
- **제약 사항**: 검색 기능은 **1페이지 뷰에서만 동작**하도록 제한되어 있습니다 (`disableFeaturesForMultiPage`).
- **이유**: 멀티 페이지 뷰는 코드가 여러 DOM 덩어리로 쪼개지기 때문에, 브라우저의 기본 검색이나 단순 텍스트 매칭 로직으로는 하이라이팅 위치를 계산하기 복잡합니다.

#### source4.html (개선됨)
- **멀티 페이지 지원**: 2페이지, 3페이지 뷰에서도 검색 기능이 정상 작동합니다.
- **핵심 개선 사항**:
  1. **`searchText()` 함수**:
     - `querySelectorAll('.code-content code')`를 사용하여 모든 컬럼의 코드 요소를 선택
     - 각 컬럼을 순회하며 TreeWalker로 텍스트 노드를 찾고 검색어를 하이라이트
     - **DOM 구조 보존**: 기존 방식처럼 `splitCodeIntoColumns()`를 호출하여 컬럼을 재생성하지 않고, 기존 검색 하이라이트(`<mark>` 요소)만 제거
     - 이를 통해 컬럼 높이가 줄어드는 문제 해결
  
  2. **`clearSearch()` 함수**:
     - 검색 하이라이트만 제거하고 DOM 구조는 유지
     - 라인 하이라이트가 활성화되어 있었다면 자동으로 재적용
  
  3. **`saveOriginalHTML()` 함수**:
     - 멀티 페이지 모드(`.multi-column` 클래스 존재)에서는 원본 저장을 시도하지 않도록 가드 추가
     - 데이터 오염 방지
  
  4. **키보드 단축키**:
     - `Delete` 키: 검색 초기화
     - `Escape` 키: 검색 초기화
     - `Enter` 키: 다음 검색 결과로 이동
     - `Shift + Enter` 키: 이전 검색 결과로 이동

- **작동 방식**:
  1. 사용자가 검색어를 입력하고 Enter를 누름
  2. 기존 검색 하이라이트가 있다면 DOM에서 제거 (컬럼 재생성 없이)
  3. 모든 컬럼의 코드 요소에 대해 TreeWalker로 텍스트 노드 탐색
  4. 정규식으로 검색어와 일치하는 부분을 찾아 `<mark class="search-highlight">` 요소로 감쌈
  5. 모든 일치 항목을 `searchMatches` 배열에 저장
  6. 첫 번째 일치 항목으로 스크롤하고 `current` 클래스 추가

## 3. 상태 관리 (State Management)

주요 상태는 전역 변수로 관리됩니다.

| 변수명 | 설명 |
|:--- |:--- |
| `currentSettings` | 폰트 크기, 폰트 종류, 줄 간격, 배경색 등 현재 설정값 객체 |
| `currentPageView` | 현재 페이지 뷰 모드 (1, 2, 3) |
| `isLineHighlightEnabled` | 커서 라인 기능 활성화 여부 (Boolean) |
| `originalCodeHTMLContent` | 원본 코드 내용 (복원용) |
| `originalLineNumbersHTML` | 원본 라인 번호 HTML (복원용) |
| `searchMatches` | 검색 결과 배열 (source4.html) |
| `currentMatchIndex` | 현재 선택된 검색 결과 인덱스 (source4.html) |
| `lastSearchQuery` | 마지막 검색어 (source4.html) |

## 4. 유지보수 및 확장 가이드

### 새로운 기능을 추가하려면?
1. **UI 추가**: `<header>` 섹션에 버튼이나 컨트롤을 추가합니다.
2. **이벤트 연결**: `<script>` 하단 `// Event Listeners` 섹션에 핸들러를 추가합니다.
3. **멀티 페이지 호환성 확인**:
   - 기능이 DOM 구조에 의존한다면, `switchToPageView` 함수 내에서 해당 기능이 유지되거나 비활성화되도록 처리해야 합니다.
   - 동적으로 생성되는 요소라면 **이벤트 위임** 패턴을 사용하세요.

### 리팩토링 제안 (Future Improvements)
현재 파일이 약 2,500라인에 달하므로, 관리를 위해 다음과 같이 분리하는 것을 권장합니다.

1. **CSS 분리**: `style.css`로 분리.
2. **JS 분리**: `app.js` 또는 기능별 모듈(`view.js`, `search.js`, `settings.js`)로 분리.
3. **모듈 시스템 도입**: ES Modules를 사용하여 전역 변수 사용을 줄이고 의존성을 명확히 관리.

## 5. 디버깅 팁
- **로그**: 주요 동작마다 `console.log('🎛️ Control Box: ...')` 또는 `console.log('📄 Multi-Page View: ...')` 형태의 로그가 남도록 되어 있습니다. 개발자 도구 콘솔을 확인하세요.
- **DOM 복원**: 화면이 깨졌을 때는 `restoreOriginalView()`를 콘솔에서 직접 호출하여 초기 상태로 되돌릴 수 있습니다.

## 6. source4.html 추가 사항

`source4.html`은 `source3.html`을 기반으로 하며, 다음과 같은 개선 사항이 추가되었습니다:

### 6.1 한글 주석
- 모든 영어 주석이 한글로 번역되어 한국어 사용 개발자의 유지보수가 용이합니다.

### 6.2 멀티 페이지 검색 지원
- 2페이지, 3페이지 뷰에서도 검색 기능이 완전히 작동합니다.
- DOM 구조를 보존하는 방식으로 구현되어 성능이 우수하고 버그가 없습니다.

### 6.3 주요 차이점 요약

| 기능 | source3.html | source4.html |
|:---|:---|:---|
| 주석 언어 | 영어 | 한글 |
| 멀티 페이지 검색 | 비활성화 | 완전 지원 |
| 검색 초기화 | X 버튼만 | X 버튼, Delete, Escape |
| DOM 보존 | 부분적 | 완전 보존 |

### 6.4 유지보수 시 주의사항
- **검색 기능 수정 시**: `searchText()`와 `clearSearch()` 모두 DOM 구조를 보존하는 방식을 유지해야 합니다. `splitCodeIntoColumns()`를 호출하면 컬럼 높이가 줄어드는 문제가 발생할 수 있습니다.
- **새로운 기능 추가 시**: 멀티 페이지 뷰와의 호환성을 반드시 테스트하세요. `querySelectorAll`을 사용하여 모든 컬럼을 처리해야 합니다.
