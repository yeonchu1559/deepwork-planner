// 딥워크 플래너 서비스 워커
// 앱 화면(셸)만 캐시하고, Asana API 요청은 절대 캐시하지 않습니다 (실시간성 보장).

const CACHE_NAME = 'deepwork-planner-v16';
const SHELL = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(SHELL)).catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Asana API 및 외부 도메인 요청은 캐시하지 않고 항상 네트워크로
  if (url.origin !== self.location.origin) {
    return; // 브라우저 기본 동작 (네트워크)
  }

  // 같은 출처(앱 셸)는 네트워크 우선, 실패 시 캐시 폴백
  event.respondWith(
    fetch(event.request)
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy)).catch(() => {});
        return res;
      })
      .catch(() => caches.match(event.request).then((r) => r || caches.match('./index.html')))
  );
});
