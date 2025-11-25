# 1. 문서 개요 (Heading Level 1)

이 문서는 **마크다운 뷰어를 테스트**하기 위한 종합 샘플입니다.  
다양한 문법 요소를 포함하고 있으므로, 렌더링 결과를 비교·검증하는 용도로 사용할 수 있습니다.

> 💡 *Tip*: 이 문서에는 CommonMark 기본 문법 + GitHub Flavored Markdown(GFM)에서 자주 쓰는 기능을 최대한 포함했습니다.[^about]

---

## 1.1. 헤딩(Heading) 테스트

### 1.1.1. H3 제목

#### 1.1.1.1. H4 제목

##### 1.1.1.1.1. H5 제목

###### 1.1.1.1.1.1. H6 제목

---

# 2. 텍스트 스타일 및 인라인 요소

일반 텍스트입니다.

- *이탤릭* (italic)
- **볼드** (bold)
- ***볼드+이탤릭*** (bold + italic)
- ~~취소선 (strikethrough)~~
- `inline code`
- <sub>아래첨자</sub>와 <sup>위첨자</sup>  
- 이모지: 😀 😎 🚀  

문장 안에서 **굵게**, *기울임*, 그리고 `코드`를 섞어서 사용할 수도 있습니다.  
HTML 태그를 사용한 <span style="color: red; font-weight:bold;">강조 텍스트 (HTML)</span> 도 일부 렌더러에서는 지원됩니다.

특수 문자 이스케이프:

- 별표: \*literal asterisk\*
- 샵: \# literal hash
- 백슬래시: \\

---

# 3. 링크 (Links)

## 3.1. 인라인 링크

- [OpenAI 홈페이지](https://openai.com/)
- [GitHub](https://github.com/)
- [위키백과(한국어)](https://ko.wikipedia.org/)

## 3.2. 참조 스타일 링크 (Reference-style links)

이것은 [참조 링크 A][ref-a] 이고, 이것은 [참조 링크 B][ref-b] 입니다.

[ref-a]: https://www.markdownguide.org/basic-syntax/ "Markdown Guide"
[ref-b]: https://commonmark.org/ "CommonMark 공식 사이트"

## 3.3. 자동 링크 (Autolinks)

URL을 직접 쓰면 대부분의 뷰어에서 자동으로 링크 처리됩니다.

- <https://example.com>
- <mailto:someone@example.com>

---

# 4. 이미지 (Images)

## 4.1. 기본 이미지 (살아있는 실제 URL)

아래 이미지는 위키미디어 공용의 PNG 투명도 예제입니다.
![이미지](https://upload.wikimedia.org/wikipedia/commons/4/47/PNG_transparency_demonstration_1.png)
```md
![PNG 예제 이미지](https://upload.wikimedia.org/wikipedia/commons/4/47/PNG_transparency_demonstration_1.png)
```

# 5. 소스코드

## 자바
```java
public class Hello {
    public static void main(String[] args) {
        System.out.println("Hello, Markdown Viewer!");

        for (int i = 1; i <= 5; i++) {
            System.out.println("Square of " + i + " is " + (i * i));
        }
    }
}
```

## GO

```go
package main

import (
    "fmt"
)

func fib(n int) int {
    if n <= 1 {
        return n
    }
    return fib(n-1) + fib(n-2)
}

func main() {
    for i := 0; i < 10; i++ {
        fmt.Printf("%d ", fib(i))
    }
}
```