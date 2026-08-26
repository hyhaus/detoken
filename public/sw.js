/* Detoken · Appcoólicos Anônimos — service worker
   Guarda o app no seu celular para funcionar offline.
   Ironia registrada: é o único processo em background que te ajuda a não programar. */
const CACHE = 'detoken-v1';
const SHELL = [
  './', './index.html', './manifest.webmanifest',
  './favicon.svg', './favicon.png', './apple-touch-icon.png',
  './icon-192.png', './icon-512.png', './icon-192-maskable.png', './icon-512-maskable.png',
  './og-detoken-classico.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;

  // HTML: rede primeiro (para você receber as correções), cache como plano B
  if (req.mode === 'navigate' || (req.headers.get('accept') || '').includes('text/html')) {
    e.respondWith(
      fetch(req).then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put('./index.html', copy));
        return res;
      }).catch(() => caches.match('./index.html'))
    );
    return;
  }

  // Resto: cache primeiro
  e.respondWith(
    caches.match(req).then(hit => hit || fetch(req).then(res => {
      const copy = res.clone();
      caches.open(CACHE).then(c => c.put(req, copy));
      return res;
    }).catch(() => hit))
  );
});
