// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAA_VULbxJfgGoV-cs0xSKqwe6R_c15X4A",
  authDomain: "twtrr-d19f9.firebaseapp.com",
  projectId: "twtrr-d19f9",
  storageBucket: "twtrr-d19f9.appspot.com",
  messagingSenderId: "59785442857",
  appId: "1:59785442857:web:f185558d38717d2daf8e38",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const storageRef = getStorage(app);
const dbRef = getFirestore(app);

export { storageRef, dbRef };
export default app;
