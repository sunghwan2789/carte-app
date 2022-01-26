import { manifest, version } from '@parcel/service-worker'

declare const self: ServiceWorkerGlobalScope

async function install() {
  const cache = await caches.open(version)
  await cache.addAll(manifest)
}
self.addEventListener('install', (e) => e.waitUntil(install()))

const apiCacheKey = 'carte-v2-cartes'
const apiBaseUrl = '/carte/api/v1/cartes/'

async function activate() {
  const keys = await caches.keys()
  const deletingKeys = keys.filter((x) => x !== version && x !== apiCacheKey)
  await Promise.all(deletingKeys.map((x) => caches.delete(x)))
}
self.addEventListener('activate', (e) => e.waitUntil(activate()))

self.addEventListener('fetch', (e) =>
  e.respondWith(
    caches
      .match(e.request)
      .then(
        (cachedResponse) =>
          cachedResponse ??
          fetch(e.request).then((networkResponse) => {
            const url = new URL(e.request.url)
            if (url.pathname.startsWith(apiBaseUrl)) {
              const response = networkResponse.clone()
              caches
                .open(apiCacheKey)
                .then((cache) => cache.put(e.request, response))
            }
            return networkResponse
          })
      )
      .catch(() => caches.match('index.html') as Promise<Response>)
  )
)

self.addEventListener('message', async (e) => {
  const { type } = e.data
  switch (type) {
    case 'refresh-cartes':
      await caches.delete(apiCacheKey)
      e.ports[0].postMessage('💖')
      break
  }
})
