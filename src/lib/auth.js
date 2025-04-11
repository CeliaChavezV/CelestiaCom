import { auth } from './firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';

// Registro con Firebase + localStorage
export async function register(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    localStorage.setItem('currentUser', userCredential.user.email);
    return true;
  } catch (error) {
    console.error("Error en registro:", error.message);
    throw new Error(getFirebaseAuthError(error.code));
  }
}

// Inicio de sesión con Firebase + localStorage
export async function login(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    localStorage.setItem('currentUser', userCredential.user.email);
    return true;
  } catch (error) {
    console.error("Error en login:", error.message);
    throw new Error(getFirebaseAuthError(error.code));
  }
}

// Cerrar sesión (Firebase + limpieza de localStorage)
export async function logout() {
  try {
    await signOut(auth);
    localStorage.removeItem('currentUser');
    return true;
  } catch (error) {
    console.error("Error en logout:", error.message);
    throw new Error("Error al cerrar sesión");
  }
}

// Obtener usuario actual (sincrónico desde localStorage)
export function getCurrentUser() {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('currentUser');
  }
  return null;
}

// Escuchar cambios de autenticación (opcional para sincronización)
export function initAuthListener(callback) {
  return onAuthStateChanged(auth, (user) => {
    if (user) {
      localStorage.setItem('currentUser', user.email);
    } else {
      localStorage.removeItem('currentUser');
    }
    if (callback) callback(user);
  });
}

// Traducción de errores comunes de Firebase
function getFirebaseAuthError(code) {
  const errors = {
    'auth/email-already-in-use': 'El correo ya está registrado',
    'auth/invalid-email': 'Correo electrónico inválido',
    'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres',
    'auth/user-not-found': 'Usuario no encontrado',
    'auth/wrong-password': 'Contraseña incorrecta',
    'auth/too-many-requests': 'Demasiados intentos. Intenta más tarde'
  };
  return errors[code] || 'Error de autenticación';
}