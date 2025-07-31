// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA0F5k5eZ35YS_pjpmEy7e2BSk0qt8hjzc",
  authDomain: "safeview-63ed5.firebaseapp.com",
  projectId: "safeview-63ed5",
  storageBucket: "safeview-63ed5.firebasestorage.app",
  messagingSenderId: "75316711729",
  appId: "1:75316711729:web:1a6fb94566b6b5fecf6010"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
