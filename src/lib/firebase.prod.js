import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { seedDatabase } from "../seed";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

// Configuration
const firebaseConfig = {
  apiKey: "AIzaSyDMRuR9V3qItQO0z7mJx3opCVI3UTP5Tys",
  authDomain: "netfilx-b513b.firebaseapp.com",
  projectId: "netfilx-b513b",
  storageBucket: "netfilx-b513b.appspot.com",
  messagingSenderId: "1054083889518",
  appId: "1:1054083889518:web:f9f0227681e92c111ea97f",
};

const Firebase = firebase.initializeApp(firebaseConfig);
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// This is done to export data to Firebase
// seedDatabase(Firebase);

export { Firebase };
