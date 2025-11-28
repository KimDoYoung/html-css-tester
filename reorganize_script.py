#!/usr/bin/env python3
"""
log5.html의 script 블록을 하나로 통합하고 </body> 직전으로 이동
"""

def reorganize_html(input_file):
    with open(input_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # script 시작과 끝 찾기
    script_start_marker = '    <script>\n        /*<![CDATA[*/'
    script_end_marker = '    </script>'
    
    start_idx = content.find(script_start_marker)
    end_idx = content.find(script_end_marker, start_idx)
    
    if start_idx == -1 or end_idx == -1:
        print("Error: Script block not found")
        return
    
    # script 내용 추출 (opening/closing tag 제외)
    script_block_start = start_idx + len(script_start_marker)
    script_content = content[script_block_start:end_idx].strip()
    
    # script 블록 제거
    before_script = content[:start_idx]
    after_script = content[end_idx + len(script_end_marker):]
    
    # </body> 찾기
    body_end_idx = after_script.find('</body>')
    if body_end_idx == -1:
        print("Error: </body> not found")
        return
    
    # 새 내용 구성
    new_content = (
        before_script +
        '\n' +  # script가 있던 자리에 빈 줄
        after_script[:body_end_idx] +
        '    <script>\n' +
        script_content + '\n' +
        '    </script>\n' +
        after_script[body_end_idx:]
    )
    
    # 파일 쓰기
    with open(input_file, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print(f"✓ 완료: {input_file}")
    print(f"  - Script 블록을 </body> 직전으로 이동")

if __name__ == '__main__':
    reorganize_html('apps/aview/log/log5.html')
