import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword ,sendEmailVerification,onAuthStateChanged ,deleteUser,signOut   } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
import { getFirestore, doc, setDoc ,getDoc, collection, query, where, getDocs,addDoc , serverTimestamp  ,updateDoc ,onSnapshot,orderBy,increment  } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";
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
const user = auth.currentUser;
const db = getFirestore(app);
const storage = getStorage();

export { app, auth, createUserWithEmailAndPassword, user,signInWithEmailAndPassword,sendEmailVerification,onAuthStateChanged,deleteUser,signOut     ,db, doc, setDoc,updateDoc ,getDoc , collection, query, where, serverTimestamp ,onSnapshot , getDocs ,addDoc ,orderBy,increment, storage, ref,uploadBytesResumable, getDownloadURL }
