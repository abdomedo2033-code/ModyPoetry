// firebase-messaging-sw.js
importScripts("https://www.gstatic.com/firebasejs/10.5.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.5.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "YOUR_API_KEY",
  projectId: "YOUR_PROJECT_ID",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
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
