# Help Modal 및 SVG Sprite 구현 가이드

이 문서는 `csv8.html`에 구현된 **SVG Sprite 시스템**과 **도움말 모달(Help Modal)** 기능을 다른 뷰어(Image, Markdown, PDF 등)에 적용하기 위한 가이드입니다.

---

## 1. SVG Sprite 시스템 구현

SVG Sprite를 사용하면 아이콘 코드를 한곳에서 관리하고 중복을 제거할 수 있습니다.

### 1.1. SVG Symbol 정의 추가
`<body>` 태그 바로 아래에 모든 아이콘을 정의한 SVG 블록을 추가합니다.

```html
<body>
    <!-- SVG Sprite Definitions -->
    <svg style="display: none;">
        <defs>
            <!-- 다운로드 -->
            <symbol id="icon-download" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
            </symbol>
            <!-- 화살표 (아래) -->
            <symbol id="icon-chevron-down" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path>
            </symbol>
            <!-- 메뉴 -->
            <symbol id="icon-menu" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </symbol>
            <!-- 정보 (i) -->
            <symbol id="icon-info" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </symbol>
            <!-- 검색 -->
            <symbol id="icon-search" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </symbol>
            <!-- 닫기 (X) -->
            <symbol id="icon-close" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </symbol>
            <!-- 컬럼 선택 -->
            <symbol id="icon-columns" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"></path>
            </symbol>
            <!-- 자동 맞춤 -->
            <symbol id="icon-autofit" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>
            </symbol>
            <!-- 저장 -->
            <symbol id="icon-save" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </symbol>
            <!-- 초기화 -->
            <symbol id="icon-reset" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
            </symbol>
            <!-- 도움말 (?) -->
            <symbol id="icon-help" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </symbol>
            <!-- 정렬 -->
            <symbol id="icon-sort" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"></path>
            </symbol>
            <!-- 다크 모드 (달) -->
            <symbol id="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
            </symbol>
            <!-- 도움말 타이틀 아이콘 -->
            <symbol id="icon-help-title" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </symbol>
            <!-- 외부 링크 -->
            <symbol id="icon-external-link" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
            </symbol>
        </defs>
    </svg>
```

### 1.2. 아이콘 사용 방법
기존의 `<svg><path ...></svg>` 코드를 아래와 같이 교체합니다.

```html
<!-- 예시: 다운로드 아이콘 -->
<svg width="14" height="14"><use href="#icon-download"/></svg>

<!-- 예시: 클래스 적용 -->
<svg class="w-4 h-4 mr-2"><use href="#icon-download"/></svg>
```

---

## 2. 도움말 모달 (Help Modal) 구현

### 2.1. CSS 스타일 추가
`<style>` 태그 내에 다음 CSS를 추가합니다.

```css
/* Help Modal Styles */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease, visibility 0.3s ease;
}
.modal-overlay.open {
    opacity: 1;
    visibility: visible;
}
.modal-content {
    background-color: white;
    width: 90%;
    max-width: 500px;
    border-radius: 12px;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    overflow: hidden;
    transform: translateY(20px);
    transition: transform 0.3s ease;
}
.modal-overlay.open .modal-content {
    transform: translateY(0);
}
.modal-header {
    padding: 16px 20px;
    border-bottom: 1px solid #e5e7eb;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.modal-title {
    font-size: 1.125rem;
    font-weight: 600;
    color: #111827;
    display: flex;
    align-items: center;
    gap: 8px;
}
.close-modal-btn {
    background: none;
    border: none;
    cursor: pointer;
    color: #6b7280;
    padding: 4px;
    border-radius: 4px;
    transition: color 0.2s, background-color 0.2s;
}
.close-modal-btn:hover {
    color: #111827;
    background-color: #f3f4f6;
}
.modal-body {
    padding: 20px;
    max-height: 60vh;
    overflow-y: auto;
}
.help-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 16px;
}
.help-item {
    display: flex;
    gap: 12px;
    align-items: flex-start;
}
.help-icon {
    flex-shrink: 0;
    width: 32px;
    height: 32px;
    background-color: #eff6ff;
    color: #3b82f6;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.help-text h4 {
    margin: 0 0 4px 0;
    font-size: 0.95rem;
    font-weight: 600;
    color: #374151;
}
.help-text p {
    margin: 0;
    font-size: 0.875rem;
    color: #6b7280;
    line-height: 1.5;
}
.modal-footer {
    background-color: #f9fafb;
}
.help-more-link:hover {
    text-decoration: underline !important;
}

/* Dark Mode for Modal */
body.dark-mode .modal-content {
    background-color: #1f2937;
    border: 1px solid #374151;
}
body.dark-mode .modal-header {
    border-bottom-color: #374151;
}
body.dark-mode .modal-title {
    color: #f3f4f6;
}
body.dark-mode .close-modal-btn {
    color: #9ca3af;
}
body.dark-mode .close-modal-btn:hover {
    color: #f3f4f6;
    background-color: #374151;
}
body.dark-mode .help-icon {
    background-color: #1e3a8a;
    color: #60a5fa;
}
body.dark-mode .help-text h4 {
    color: #e5e7eb;
}
body.dark-mode .help-text p {
    color: #9ca3af;
}
body.dark-mode .modal-footer {
    background-color: #111827;
    border-top-color: #374151 !important;
}
```

### 2.2. HTML 구조 추가
`<body>` 태그의 맨 끝(스크립트 로드 전)에 모달 HTML을 추가합니다.

```html
<!-- Help Modal -->
<div id="helpModal" class="modal-overlay">
    <div class="modal-content">
        <div class="modal-header">
            <h3 class="modal-title">
                <svg width="20" height="20" class="text-blue-500"><use href="#icon-help-title"/></svg>
                뷰어 사용 팁 <!-- 뷰어 이름에 맞게 수정 -->
            </h3>
            <button type="button" class="close-modal-btn" id="closeHelpModal" title="닫기">
                <svg width="20" height="20"><use href="#icon-close"/></svg>
            </button>
        </div>
        <div class="modal-body">
            <ul class="help-list" id="helpList">
                <!-- Dynamic Content -->
            </ul>
        </div>
        <div class="modal-footer" style="padding: 16px 20px; border-top: 1px solid #e5e7eb; text-align: right;">
            <a href="/aview/help/viewer/csv.html" target="_blank" class="help-more-link" style="color: #0d6efd; text-decoration: none; font-size: 0.875rem; font-weight: 500; display: inline-flex; align-items: center; gap: 4px;">
                더 자세한 정보...
                <svg width="14" height="14"><use href="#icon-external-link"/></svg>
            </a>
        </div>
    </div>
</div>
```
*주의: `href` 링크 주소는 각 뷰어에 맞게 수정해야 합니다.*

### 2.3. 도움말 버튼 추가
Control Bar의 적절한 위치(보통 맨 오른쪽)에 도움말 버튼을 추가합니다.

```html
<button type="button" id="helpBtn" class="control-btn" title="도움말" style="margin-left: auto; margin-right: 10px;">
    <svg width="14" height="14"><use href="#icon-help"/></svg>
</button>
```

### 2.4. 데이터 및 스크립트 추가

**1. 데이터 정의 (`helpData`)**
메인 스크립트 태그 이전에 별도의 스크립트 태그로 데이터를 정의합니다.

```html
<script>
    // renderHelpModal()에서 사용됨
    const helpData = [
        {
            title: "기능 이름",
            desc: "기능에 대한 설명...",
            iconId: "icon-search" // 사용할 아이콘 ID
        },
        // ... 추가 항목
    ];
</script>
```

**2. 로직 구현**
메인 스크립트 영역(`DOMContentLoaded` 내부 등)에 다음 로직을 추가합니다.

```javascript
// Help Modal Logic
const helpBtn = document.getElementById('helpBtn');
const helpModal = document.getElementById('helpModal');
const closeHelpModalBtn = document.getElementById('closeHelpModal');
const helpList = document.getElementById('helpList');

// helpData is defined in a separate script block above

function renderHelpModal() {
    if (!helpList) return;
    helpList.innerHTML = helpData.map(item => `
        <li class="help-item">
            <div class="help-icon">
                <svg width="14" height="14"><use href="#${item.iconId}"/></svg>
            </div>
            <div class="help-text">
                <h4>${item.title}</h4>
                <p>${item.desc}</p>
            </div>
        </li>
    `).join('');
}

function openHelpModal() {
    renderHelpModal(); // Render content when opening
    helpModal.classList.add('open');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeHelpModal() {
    helpModal.classList.remove('open');
    document.body.style.overflow = ''; // Restore scrolling
}

if (helpBtn) {
    helpBtn.addEventListener('click', openHelpModal);
}

if (closeHelpModalBtn) {
    closeHelpModalBtn.addEventListener('click', closeHelpModal);
}

if (helpModal) {
    helpModal.addEventListener('click', (e) => {
        if (e.target === helpModal) {
            closeHelpModal();
        }
    });
}

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && helpModal.classList.contains('open')) {
        closeHelpModal();
    }
});
```

---

## 3. 적용 체크리스트

1.  [ ] `<body>` 상단에 `<svg><defs>...</defs></svg>` 블록 추가
2.  [ ] 기존 아이콘들을 `<use href="#icon-..." />` 형태로 교체
3.  [ ] `<style>`에 모달 관련 CSS 추가
4.  [ ] `<body>` 하단에 모달 HTML 구조 추가
5.  [ ] Control Bar에 도움말 버튼 추가
6.  [ ] `<script>` 블록에 `helpData` 정의 추가 (각 뷰어에 맞는 내용으로 수정)
7.  [ ] 메인 JS에 모달 제어 로직 추가
8.  [ ] 모달 Footer의 "더 자세한 정보" 링크 수정
