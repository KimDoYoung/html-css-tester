# md4.html 기술문서

## 📋 개요

`md4.html`은 마크다운 문서를 렌더링하고 다양한 뷰어 기능을 제공하는 단일 HTML 파일입니다. 서버 없이 브라우저에서 독립적으로 실행되며, 풍부한 UI/UX 기능을 제공합니다.

**버전**: 1.0  
**최종 수정일**: 2025-11-25  
**기반**: md3.html + 내보내기 기능

---

## 🎯 주요 기능

### 1. 마크다운 렌더링
- **GitHub Flavored Markdown** 지원
- **Syntax Highlighting**: Highlight.js 사용
- **반응형 디자인**: 데스크톱/모바일 최적화

### 2. 목차 (Table of Contents)
- **사이드 드로어 방식**: 좌측/우측 선택 가능
- **단축키**: F2로 토글
- **플로팅 버튼**: 스크롤 시 자동 표시
- **자동 생성**: H1~H6 헤딩 기반

### 3. 검색 기능
- **실시간 하이라이팅**: 검색어 강조 표시
- **네비게이션**: Enter(다음), Shift+Enter(이전)
- **카운터**: 현재 위치/전체 개수 표시
- **클리어**: Delete 키 또는 X 버튼

### 4. 코드 블록 복사
- **아이콘 버튼**: 각 코드 블록 우측 상단
- **클립보드 복사**: 원클릭 복사
- **피드백**: "복사됨!" 메시지 표시

### 5. 이미지 라이트박스
- **전체화면 보기**: 이미지 클릭 시 확대
- **닫기**: ESC, X 버튼, 오버레이 클릭
- **줌 커서**: 호버 시 확대 커서 표시

### 6. Raw 마크다운 보기
- **토글 방식**: `</>` 버튼으로 전환
- **전체 복사**: Raw 뷰에서 복사 버튼 제공
- **폰트 적용**: 컨트롤 박스 설정 반영

### 7. 내보내기 ⭐ (신규)
- **HTML 내보내기**: 스타일 포함 완전한 HTML 파일
- **PDF 내보내기**: html2pdf.js 사용, A4 용지

### 8. 컨트롤 박스
- **폰트 크기**: 증가/감소/초기화
- **폰트 선택**: Noto Sans KR, 맑은 고딕, 서울남산체, Courier New
- **배경색**: 5가지 프리셋
- **줄간격**: 조절 가능
- **다크모드**: 토글
- **전체화면**: 마크다운 영역 전체화면
- **설정 저장/초기화**: localStorage 사용

### 9. 모바일 지원
- **반응형 레이아웃**: 768px 이하 자동 전환
- **모바일 메뉴**: 햄버거 메뉴로 모든 기능 접근
- **터치 최적화**: 버튼 크기 및 간격 조정

---

## 🛠 기술 스택

### 외부 라이브러리
```html
<!-- Tailwind CSS -->
<script src="https://cdn.tailwindcss.com"></script>

<!-- Highlight.js (코드 하이라이팅) -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css">

<!-- html2pdf.js (PDF 내보내기) -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>

<!-- Google Fonts -->
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&display=swap" rel="stylesheet">
```

### 브라우저 API
- **localStorage**: 설정 저장
- **Clipboard API**: 복사 기능
- **Intersection Observer**: 스크롤 감지 (플로팅 버튼)
- **Blob & URL API**: 파일 다운로드

---

## 📐 아키텍처

### HTML 구조
```
body
├── header (문서 정보 토글)
├── markdown-container
│   ├── control-bar (컨트롤 박스)
│   │   ├── controls-desktop
│   │   └── controls-mobile
│   ├── doc-info-section (문서 정보)
│   └── markdown-body (렌더링된 마크다운)
├── lightbox-overlay (이미지 라이트박스)
├── toc-drawer (목차 드로어)
├── floating buttons (맨 위로, 목차)
└── script[type="text/plain"] (Raw 마크다운 소스)
```

### CSS 구조
- **반응형**: `@media (max-width: 768px)`
- **다크모드**: `body.dark-mode` 클래스
- **전체화면**: `body.fullscreen-mode` 클래스
- **상태 관리**: CSS 클래스 토글

### JavaScript 모듈
```javascript
// 주요 함수들
- toggleDocInfo()          // 문서 정보 토글
- updateFontSize()          // 폰트 크기 조정
- updateLineHeight()        // 줄간격 조정
- performSearch()           // 검색 실행
- toggleDarkMode()          // 다크모드 토글
- toggleFullscreen()        // 전체화면 토글
- generateTOC()             // 목차 생성
- toggleTOC()               // 목차 토글
- setTOCPosition()          // 목차 위치 설정
- addCopyButtons()          // 코드 복사 버튼 추가
- openLightbox()            // 라이트박스 열기
- displayRaw()              // Raw 마크다운 표시
- exportHTML()              // HTML 내보내기
- exportPDF()               // PDF 내보내기
```

---

## ⌨️ 단축키

| 키 | 기능 |
|---|---|
| **F2** | 목차 토글 |
| **Home** | 맨 위로 스크롤 |
| **PgUp/PgDn** | 페이지 이동 (브라우저 기본) |
| **Enter** | 검색 결과 다음 |
| **Shift+Enter** | 검색 결과 이전 |
| **Delete** | 검색어 클리어 |
| **ESC** | 라이트박스/TOC 닫기 |

---

## 💾 설정 저장

### localStorage 키
```javascript
'mdViewerSettings': {
    fontSize: number,        // 폰트 크기 (px)
    lineHeight: number,      // 줄간격
    fontFamily: string,      // 폰트 패밀리
    darkMode: boolean,       // 다크모드 여부
    bgColor: string,         // 배경색 (hex)
    tocPosition: string      // 목차 위치 ('left' | 'right')
}
```

### 저장/로드 시점
- **저장**: "설정 저장" 버튼 클릭
- **로드**: 페이지 로드 시 자동
- **초기화**: "설정 초기화" 버튼 클릭 → 페이지 새로고침

---

## 📤 내보내기 기능

### HTML 내보내기
```javascript
// 동작 방식
1. 현재 페이지의 모든 CSS 규칙 수집
2. 렌더링된 마크다운 HTML 추출
3. 완전한 HTML 문서 생성
4. Blob으로 변환 후 다운로드

// 출력 파일
- 파일명: markdown-export.html
- 인코딩: UTF-8
- 스타일: 모든 CSS 인라인 포함
```

### PDF 내보내기
```javascript
// html2pdf.js 옵션
{
    margin: 10,                          // 여백 (mm)
    filename: 'markdown-export.pdf',     // 파일명
    image: { 
        type: 'jpeg', 
        quality: 0.98 
    },
    html2canvas: { 
        scale: 2,                        // 해상도 (2배)
        useCORS: true                    // 외부 이미지 허용
    },
    jsPDF: { 
        unit: 'mm', 
        format: 'a4', 
        orientation: 'portrait'          // 세로 방향
    }
}

// 주의사항
- 복잡한 레이아웃은 깨질 수 있음
- 외부 이미지는 CORS 정책 영향 받음
- 한글 폰트는 시스템 폰트 사용
```

---

## 🎨 스타일 커스터마이징

### 주요 CSS 변수
```css
/* 폰트 */
--font-size: 16px;
--line-height: 1.6;
--font-family: 'Noto Sans KR', sans-serif;

/* 색상 */
--bg-color: #ffffff;
--text-color: #333333;
--border-color: #e1e4e8;
--highlight-color: #fff3cd;

/* 다크모드 */
body.dark-mode {
    --bg-color: #1a1a1a;
    --text-color: #e6e6e6;
    --border-color: #444;
}
```

### 반응형 브레이크포인트
```css
/* 모바일 */
@media (max-width: 768px) {
    .controls-desktop { display: none; }
    .controls-mobile { display: flex; }
}

/* 데스크톱 */
@media (min-width: 769px) {
    .controls-desktop { display: flex; }
    .controls-mobile { display: none; }
}
```

---

## 🔧 확장 가능성

### 추가 가능한 기능
1. **마크다운 편집기**: 실시간 미리보기
2. **북마크**: 특정 위치 저장
3. **읽기 진행률**: 스크롤 진행 표시
4. **인쇄 스타일**: 최적화된 인쇄 레이아웃
5. **테마 선택**: 다양한 색상 테마
6. **글자 수 카운터**: 문서 통계

### 서버 연동 시
```javascript
// API 엔드포인트 예시
GET  /api/markdown/raw?file=sample.md    // Raw 마크다운 가져오기
POST /api/markdown/save                   // 마크다운 저장
GET  /api/markdown/list                   // 파일 목록
```

---

## 🐛 알려진 제약사항

1. **PDF 내보내기**
   - 복잡한 CSS 레이아웃은 완벽하게 변환되지 않을 수 있음
   - 외부 이미지는 CORS 정책에 따라 포함되지 않을 수 있음
   - 파일 크기가 큰 문서는 생성 시간이 오래 걸림

2. **브라우저 호환성**
   - Clipboard API: HTTPS 또는 localhost에서만 동작
   - html2pdf.js: 최신 브라우저 권장 (IE 미지원)

3. **모바일**
   - 전체화면 모드는 일부 모바일 브라우저에서 제한적
   - 터치 제스처는 기본 구현만 제공

---

## 📝 버전 히스토리

### v1.0 (2025-11-25)
- ✅ 기본 마크다운 렌더링
- ✅ 목차 (좌/우 선택 가능)
- ✅ 검색 기능
- ✅ 코드 복사
- ✅ 이미지 라이트박스
- ✅ Raw 마크다운 보기
- ✅ 컨트롤 박스 (폰트, 색상, 다크모드 등)
- ✅ 설정 저장/로드
- ✅ HTML/PDF 내보내기
- ✅ 모바일 최적화

---

## 📚 참고 자료

- [Tailwind CSS](https://tailwindcss.com/)
- [Highlight.js](https://highlightjs.org/)
- [html2pdf.js](https://github.com/eKoopmans/html2pdf.js)
- [GitHub Flavored Markdown](https://github.github.com/gfm/)
- [Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API)

---

## 👨‍💻 개발자 노트

### 코드 구조
- 단일 HTML 파일로 구성 (독립 실행)
- 외부 의존성: CDN 라이브러리만 사용
- 모든 로직은 클라이언트 사이드에서 처리

### 성능 최적화
- 이벤트 위임 사용 (코드 복사 버튼)
- Debounce/Throttle 미적용 (필요시 추가)
- 이미지 Lazy Loading 미적용 (필요시 추가)

### 보안 고려사항
- XSS 방지: `escapeHtml()` 함수 사용
- 사용자 입력 검증: 검색어 이스케이프 처리
- CORS: 외부 리소스 로드 시 주의

---

**문서 끝**
