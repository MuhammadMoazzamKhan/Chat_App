import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword ,sendEmailVerification } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";
import {  getStorage, ref, uploadBytesResumable, getDownloadURL  } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyC4tzXX_AisTmpPbsNagMl1f1YhoXbJw_g",
  authDomain: "chat-app-mine-a2eda.firebaseapp.com",
  projectId: "chat-app-mine-a2eda",
  storageBucket: "chat-app-mine-a2eda.appspot.com",
  messagingSenderId: "157337274521",
  appId: "1:157337274521:web:fe92a1a68ca9bb43dad008",
  measurementId: "G-S4DK0TTMZM"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getFirestore(app);
const storage = getStorage();
console.log(auth)
export { app, auth, createUserWithEmailAndPassword, signInWithEmailAndPassword,sendEmailVerification ,db, doc, setDoc, storage, ref,uploadBytesResumable, getDownloadURL }