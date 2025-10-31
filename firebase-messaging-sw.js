// firebase-messaging-sw.js
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

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log('Received background message:', payload);

  const notificationTitle = payload.notification?.title || 'Mody Poetry';
  const notificationOptions = {
    body: payload.notification?.body || 'لديك إشعار جديد',
    icon: 'https://cdn-icons-png.flaticon.com/512/9087/9087118.png',
    badge: 'https://cdn-icons-png.flaticon.com/512/9087/9087118.png',
    tag: payload.data?.id || 'mody-poetry',
    data: payload.data,
    requireInteraction: false,
    vibrate: [200, 100, 200]
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  const urlToOpen = event.notification.data?.url || '/';
  
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then((clientList) => {
        // Check if there's already a window open
        for (let i = 0; i < clientList.length; i++) {
          const client = clientList[i];
          if (client.url.includes(self.location.origin) && 'focus' in client) {
            return client.focus().then(() => {
              client.postMessage({
                type: 'NOTIFICATION_CLICK',
                data: event.notification.data
              });
            });
          }
        }
        // If not, open a new window
        if (clients.openWindow) {
          return clients.openWindow(urlToOpen);
        }
      })
  );
});
