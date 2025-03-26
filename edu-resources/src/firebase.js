
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyC0vKT5n__b2ThtFfz-RJUg6nqrGFfNDVY",
  authDomain: "edu-resources-c31ba.firebaseapp.com",
  projectId: "edu-resources-c31ba",
  storageBucket: "edu-resources-c31ba.firebasestorage.app",
  messagingSenderId: "882234191799",
  appId: "1:882234191799:web:04767bef600403ad2e8232"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
