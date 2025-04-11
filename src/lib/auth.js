// Versión completa mejorada
export function login(email, password) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
      localStorage.setItem('currentUser', email);
      sessionStorage.setItem('isLoggedIn', 'true'); // Para persistencia durante la sesión
      return true;
    }
    return false;
  }
  
  // Verifica si hay sesión activa al cargar la página
  export function checkAuth() {
    return !!localStorage.getItem('currentUser');
  }