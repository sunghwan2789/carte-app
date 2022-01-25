import { manifest, version } from '@parcel/service-worker'

declare const self: ServiceWorkerGlobalScope

async function install() {
  const cache = await caches.open(version)
  await cache.addAll(manifest)
}
self.addEventListener('install', (e) => e.waitUntil(install()))

async function activate() {
  const keys = await caches.keys()
  await Promise.all(keys.map((key) => key !== version && caches.delete(key)))
}
self.addEventListener('activate', (e) => e.waitUntil(activate()))

self.addEventListener('fetch', (e) =>
  e.respondWith(
    caches
      .match(e.request)
      .then((cachedResponse) => cachedResponse ?? fetch(e.request))
      .catch(() => caches.match('index.html') as Promise<Response>)
  )
)
