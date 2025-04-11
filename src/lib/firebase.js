import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBptlFBrncXr6JpwN5EsU9eBAFVnEIZarQ",
  authDomain: "celestiacom-1eede.firebaseapp.com",
  projectId: "celestiacom-1eede",
  storageBucket: "celestiacom-1eede.firebasestorage.app",
  messagingSenderId: "397471130746",
  appId: "1:397471130746:web:513661ccc888526daac7c3"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); // Opcional si luego usas Firestore


// Funciones de autenticación
export async function registerUser(email, password) {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    return true;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function loginUser(email, password) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return true;
  } catch (error) {
    throw new Error(error.message);
  }
}