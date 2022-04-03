import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCRznefkvvx_tJxJc4IYZHKC8-Qtjldw_c",
  authDomain: "chat-d9e36.firebaseapp.com",
  projectId: "chat-d9e36",
  storageBucket: "chat-d9e36.appspot.com",
  messagingSenderId: "138731860042",
  appId: "1:138731860042:web:6063a281d261bf1e70b6b3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
