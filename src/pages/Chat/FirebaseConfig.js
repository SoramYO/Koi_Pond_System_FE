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
  apiKey: "AIzaSyCWL6qUT_zcc0SzFSEBHXEmncGyt0kF8ZM",
  authDomain: "chat-reactjs-99a6d.firebaseapp.com",
  projectId: "chat-reactjs-99a6d",
  storageBucket: "chat-reactjs-99a6d.appspot.com",
  messagingSenderId: "936404473683",
  appId: "1:936404473683:web:3033d3da864efb9df1b3a6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
export const storage = getStorage(app);
