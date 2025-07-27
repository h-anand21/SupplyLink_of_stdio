// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  "projectId": "vendorlink-express",
  "appId": "1:736195419280:web:6a413604bc3ca30603cc15",
  "storageBucket": "vendorlink-express.firebasestorage.app",
  "apiKey": "AIzaSyBnmSgC-6XGhrKf556-GT-xYye5YLuCSac",
  "authDomain": "vendorlink-express.firebaseapp.com",
  "messagingSenderId": "736195419280"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);
