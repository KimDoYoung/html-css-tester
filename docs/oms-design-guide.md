# OMS design guide

## frontend 기술스택

1. tailwind css
2. alpinejs
3. daisyui

## color theme

- daisyui paste theme 사용

## 디자인 컨셉

1. font size 11pt
2. 1 화면에 모든 정보를 표시
3. 영역의 구분자로 넓이를 조절 가능하게

### example 1

- 디자인 및 레이아웃:
  - 전체 화면 (Single Page): h-screen과 overflow-hidden을 사용하여 브라우저 스크롤 없이 창 내부에서 콘텐츠가 스크롤되도록 구현했습니다.
  - Resizer (영역 조절): Alpine.js를 사용한 간단한 드래그 로직을 추가하여, 좌우 영역(Split Pane)의 너비를 사용자가 마우스로 조절할 수 있도록 했습니다.
  - Font Size: 11pt를 기본 폰트 크기로 설정하고, Tailwind의 유틸리티와 커스텀 CSS를 통해 촘촘한 정보 밀도를 유지했습니다.
  - Theme: DaisyUI의 pastel 테마를 적용하여 차분하고 가독성 높은 색감을 사용했습니다. ("paste theme"은 오타로 판단하여 pastel로 적용)
  
- 파일별 구현 내용:
  - 1.html (주식 종목별 시뮬레이션): 상단 탭, 복합 검색 폼, 데이터 그리드, 하단 합계 및 상태바를 포함한 전체화면 레이아웃.
  - 2.html (주식 주문조건 입력): 좌우 분할 화면(Split View) 구조. 좌측 폼/그리드와 우측 폼/메인 그리드를 배치하고 크기 조절 기능 포함.
  - 3.html (주식 주문 취소): 2번과 유사한 분할 화면이나, 상단 탭과 하단 디테일 정보창의 비중을 조절하여 구현.
  - 4.html (섹터/보유/NAV): 상단 요약 정보 패널과 좌우 마스터-디테일 그리드 구조 구현.
