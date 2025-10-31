// firebase-messaging-sw.js
importScripts("https://www.gstatic.com/firebasejs/10.5.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.5.0/firebase-messaging-compat.js");
 
firebase.initializeApp({
  apiKey: "BH1rxDUeea6grr0gIXTI19kSWTMa50nHwu-GIShvIBKBndborG647a1A4xnHJ8KjB8iQkn5SuLbIOKdm_PXqIV8",
  projectId: "modypoems",
  messagingSenderId: "805060440847",
  appId: "1:805060440847:web:bc4f89cd351c9c244f447a",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(payload => {
  console.log("🔔 Received background message", payload);
  const { title, body } = payload.notification;
  self.registration.showNotification(title, {
    body,
    icon: "/icon.png", // optional
  });
});
