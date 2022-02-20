import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDtn-_KDEZBnhxBOz2ktye9RvrSNXWEukE",
  authDomain: "hackutd-21.firebaseapp.com",
  projectId: "hackutd-21",
  storageBucket: "hackutd-21.appspot.com",
  messagingSenderId: "137716651241",
  appId: "1:137716651241:web:854b518f805e337f2b4c78",
  measurementId: "G-CP9YT43TTE",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
