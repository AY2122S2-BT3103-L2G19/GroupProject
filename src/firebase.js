// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB0qWFX7tBLdRSowKmLbmM50uIZesLcUc4",
  authDomain: "group-project-65d9c.firebaseapp.com",
  databaseURL: "https://group-project-65d9c-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "group-project-65d9c",
  storageBucket: "group-project-65d9c.appspot.com",
  messagingSenderId: "841085668550",
  appId: "1:841085668550:web:a155ea49f291a9806a1bc7"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;