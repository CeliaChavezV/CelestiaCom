import { auth, registerUser, loginUser } from './firebase';

export async function register(email, password) {
  try {
    await registerUser(email, password);
    localStorage.setItem('currentUser', email);
    return true;
  } catch (error) {
    throw error;
  }
}

export async function login(email, password) {
  try {
    await loginUser(email, password);
    localStorage.setItem('currentUser', email);
    return true;
  } catch (error) {
    throw error;
  }
}

export function getCurrentUser() {
  return localStorage.getItem('currentUser');
}

export function logout() {
  localStorage.removeItem('currentUser');
}