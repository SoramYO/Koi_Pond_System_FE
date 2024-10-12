import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCWL6qUT_zcc0SzFSEBHXEmncGyt0kF8ZM",
  authDomain: "chat-reactjs-99a6d.firebaseapp.com",
  projectId: "chat-reactjs-99a6d",
  storageBucket: "chat-reactjs-99a6d.appspot.com",
  messagingSenderId: "936404473683",
  appId: "1:936404473683:web:3033d3da864efb9df1b3a6",
};

const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);
const auth = getAuth(firebaseApp);

export { analytics, auth };
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const storage = getStorage(app);
