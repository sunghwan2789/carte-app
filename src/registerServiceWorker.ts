export default function registerServiceWorker() {
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register(
        new URL('service-worker.ts', import.meta.url),
        { type: 'module' }
      )
    })
  }
}
