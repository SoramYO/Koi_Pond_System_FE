// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import "firebase/database";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCCClXl0zh6pdGKkOGrXT3FXAsxGIMB06I",
  authDomain: "kpcos-ee526.firebaseapp.com",
  databaseURL:
    "https://kpcos-ee526-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "kpcos-ee526",
  storageBucket: "kpcos-ee526.appspot.com",
  messagingSenderId: "808608521261",
  appId: "1:808608521261:web:3635eabe535457532deca4",
  measurementId: "G-0X3E805V1Z",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
export const storage = getStorage(app);
