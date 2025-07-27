// Firebase uygulamanı başlatmak için yapılandırma
const firebaseConfig = {
  apiKey: "AIzaSyC2FLQcnSlTODMCgySDEpqOiCmkoxkGzSQ",
  authDomain: "make-it-meme-tr.firebaseapp.com",
  databaseURL: "https://make-it-meme-tr-default-rtdb.firebaseio.com",
  projectId: "make-it-meme-tr",
  storageBucket: "make-it-meme-tr.firebasestorage.app",
  messagingSenderId: "285332089634",
  appId: "1:285332089634:web:91d0f6406bcd5c6b2d137b"
};

// Firebase'i başlat
firebase.initializeApp(firebaseConfig);

// Veritabanına erişim
const db = firebase.database();
