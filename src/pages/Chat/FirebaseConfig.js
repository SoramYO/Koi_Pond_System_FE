
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyC_tNOuDqnagRZ0ElzaYmSKdLeOhBDpAtc",
  authDomain: "chat-reactjs-swp391.firebaseapp.com",
  projectId: "chat-reactjs-swp391",
  storageBucket: "chat-reactjs-swp391.appspot.com",
  messagingSenderId: "831468461507",
  appId: "1:831468461507:web:0c061a6344265897b3f176",
  measurementId: "G-RCM7RDLT8F"
};


const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);
const storage = getStorage(firebaseApp);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);


export { db, auth ,analytics,storage};