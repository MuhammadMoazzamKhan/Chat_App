  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-analytics.js";


  const firebaseConfig = {
    apiKey: "AIzaSyBYdAFuD_vCohefFxm4CvfpV0DYAPDQILM",
    authDomain: "talkappmine.firebaseapp.com",
    projectId: "talkappmine",
    storageBucket: "talkappmine.appspot.com",
    messagingSenderId: "485557879003",
    appId: "1:485557879003:web:9dcccd1279608b39c80cfe",
    measurementId: "G-CBFYLBB76C"
  };

  
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);