// Asegúrate de exportar todas las funciones necesarias
export function register(email, password) {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Verificar si el usuario ya existe
    if (users.some(user => user.email === email)) {
      throw new Error('El usuario ya existe');
    }
  
    users.push({ email, password });
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', email);
    
    return true;
  }
  
  // Exporta también las demás funciones que necesites
  export function login(email, password) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
      localStorage.setItem('currentUser', email);
      return true;
    }
    return false;
  }
  
  export function getCurrentUser() {
    return localStorage.getItem('currentUser');
  }