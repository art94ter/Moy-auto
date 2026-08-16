// Service Worker disabled.
// The previous worker injected a second password-recovery screen and caused
// different behaviour in Safari/Yandex. Keep this file only long enough for
// already-installed workers to unregister themselves and clear old caches.
self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map(key => caches.delete(key)));
    await self.clients.claim();
    await self.registration.unregister();
  })());
});
