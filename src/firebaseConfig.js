import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyDrrTqnB5ZWEEUEsfrwbIY6zBaEz9Fm3JY",
  authDomain: "calendee-7e801.firebaseapp.com",
  projectId: "calendee-7e801",
  storageBucket: "calendee-7e801.appspot.com",
  messagingSenderId: "147359419324",
  appId: "1:147359419324:web:fea8efe8d9aee7e8dcf9b9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
