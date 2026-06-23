# 딥워크 블록 플래너 PWA

## GitHub Pages 업로드

이 폴더 안의 파일 전체를 GitHub 저장소 루트에 업로드하세요.

필수 파일:
- index.html
- manifest.json
- service-worker.js
- icon-192.png
- icon-512.png
- .nojekyll

## 보안 주의

Asana PAT를 코드에 직접 넣지 마세요. 앱에서 입력한 PAT는 각 브라우저의 localStorage에 저장됩니다.

## 업데이트 방법

index.html을 수정한 뒤 GitHub에 다시 업로드하면 됩니다.
service-worker.js를 고친 경우 CACHE_NAME의 버전명을 바꾸면 휴대폰에서 새 파일 반영이 더 확실합니다.
