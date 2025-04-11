import { auth, firebaseErrorMessages } from './firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';

export async function register(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error) {
    return { 
      success: false, 
      error: firebaseErrorMessages[error.code] || 'Error de autenticación' 
    };
  }
}

export async function login(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error) {
    return { 
      success: false, 
      error: firebaseErrorMessages[error.code] || 'Error de autenticación' 
    };
  }
}

export async function logout() {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Error al cerrar sesión' };
  }
}

export function initAuthListener(callback) {
  return onAuthStateChanged(auth, (user) => {
    if (callback) callback(user);
  });
}

export function getCurrentUser() {
  return auth?.currentUser;
}