const cacheList = global.serviceWorkerOption.assets;
var cacheKey = 'my-site-cache-v1';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    this.navigator.serviceWorker.register('/sw.js').then(function(registration) {      
    }, function(error) {
      console.log(error);
    })
  })

  self.addEventListener('install', function(event) {
    self.skipWaiting();
    event.waitUntil(
      caches.open(cacheKey).then(function (cache) {
        // 要缓存的文件 URL 列表
        return cache.addAll(cacheList);
      })
    );
  })
}

/**
 * 当有新的service worker替换旧的service worker时触发
 */
self.addEventListener('activate', event => {
  console.log('V1 now ready to handle fetches!');
});

self.addEventListener('fetch', function(event) {
  caches.keys().then(response => {
    console.log(response, "@@@@")
  })
  event.respondWith(caches.match(event.request).then(function(response) {
    if (response) {
      return response;
    }
    const newResponse = fetch(event.request);
    const forCache = newResponse.clone();
    caches.add(forCache);
    return newResponse;
  }))
})