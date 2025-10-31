importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyANYJJ3gTxEgeaj731npdx37OHd4Xf3t70",
  authDomain: "modypoems.firebaseapp.com",
  databaseURL: "https://modypoems-default-rtdb.firebaseio.com",
  projectId: "modypoems",
  storageBucket: "modypoems.firebasestorage.app",
  messagingSenderId: "805060440847",
  appId: "1:805060440847:web:bc4f89cd351c9c244f447a"
});

const messaging = firebase.messaging();

// استقبال الإشعارات في الخلفية
messaging.onBackgroundMessage((payload) => {
  console.log('📬 إشعار جديد:', payload);
  
  const notificationTitle = payload.notification?.title || 'Mody Poetry';
  const notificationOptions = {
    body: payload.notification?.body || 'لديك إشعار جديد',
    icon: 'https://cdn-icons-png.flaticon.com/512/9087/9087118.png',
    badge: 'https://cdn-icons-png.flaticon.com/512/9087/9087118.png',
    tag: payload.data?.id || 'notification',
    data: payload.data,
    vibrate: [200, 100, 200],
    requireInteraction: false
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});

// عند النقر على الإشعار
self.addEventListener('notificationclick', (event) => {
  console.log('🔔 تم النقر على الإشعار');
  event.notification.close();
  
  const data = event.notification.data || {};
  
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then((clientList) => {
        // ابحث عن نافذة مفتوحة
        for (let client of clientList) {
          if (client.url.includes(self.location.origin) && 'focus' in client) {
            // أرسل رسالة للصفحة
            client.postMessage({
              type: 'NOTIFICATION_CLICK',
              data: data
            });
            return client.focus();
          }
        }
        // إذا لم توجد نافذة، افتح واحدة جديدة
        if (clients.openWindow) {
          return clients.openWindow(data.url || '/');
        }
      })
  );
});

// تفعيل Service Worker
self.addEventListener('activate', (event) => {
  console.log('✅ Service Worker مُفعَّل');
  event.waitUntil(self.clients.claim());
});

self.addEventListener('install', (event) => {
  console.log('📥 Service Worker يتم التثبيت...');
  self.skipWaiting();
});

console.log('🚀 Service Worker جاهز!');
