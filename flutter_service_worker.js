// Kill switch for the old Flutter site's service worker.
// Returning visitors still have it installed; when the browser fetches this changed file,
// it clears the old caches, unregisters itself and reloads open tabs onto the new page.
self.addEventListener('install', () => self.skipWaiting())

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    for (const key of await caches.keys()) await caches.delete(key)
    await self.registration.unregister()
    for (const client of await self.clients.matchAll({ type: 'window' })) client.navigate(client.url)
  })())
})
