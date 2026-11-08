/* sw.js — 只负责系统通知，故意不做缓存，避免你更新 index.html 后看到旧版本 */
self.addEventListener('install', function(){ self.skipWaiting(); });
self.addEventListener('activate', function(e){ e.waitUntil(self.clients.claim()); });
self.addEventListener('notificationclick', function(e){
  e.notification.close();
  e.waitUntil(
    self.clients.matchAll({ type:'window', includeUncontrolled:true }).then(function(list){
      for (var i = 0; i < list.length; i++) { if (list[i].focus) return list[i].focus(); }
      if (self.clients.openWindow) return self.clients.openWindow('./');
    })
  );
});
