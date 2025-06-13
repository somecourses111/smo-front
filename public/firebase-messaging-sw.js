importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyAOkac43QsLW-oeG9JC9RU9UYldV0aQg5M",
  authDomain: "binance-f62e7.firebaseapp.com",
  projectId: "binance-f62e7",
  messagingSenderId: "661537635997",
  appId: "1:661537635997:web:6c8e6f6864929dfabb5e74",
});

const messaging = firebase.messaging();
