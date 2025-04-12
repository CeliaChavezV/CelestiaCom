// Configuración
const usersKey = 'celestia_users_v2';
const currentUserKey = 'celestia_currentUser_v2';

// Inicializar datos
if (!localStorage.getItem(usersKey)) {
  const initialUsers = [
    { 
      id: 1, 
      email: 'admin@celestia.com', 
      password: 'admin123', 
      estacion: 'Estación Central',
      fechaRegistro: new Date().toISOString() 
    }
  ];
  localStorage.setItem(usersKey, JSON.stringify(initialUsers));
}

// ===== REGISTRO =====
document.getElementById('registrar-btn')?.addEventListener('click', () => {
  const email = document.getElementById('registro-email').value;
  const password = document.getElementById('registro-password').value;
  const estacion = document.getElementById('registro-estacion').value;

  if (!email || !password || !estacion) {
    alert('⚠️ Todos los campos son obligatorios');
    return;
  }

  const users = JSON.parse(localStorage.getItem(usersKey));

  // Límite de 10 usuarios
  if (users.length >= 10) {
    alert('🚫 Límite de 10 usuarios alcanzado');
    return;
  }

  // Verificar email existente
  if (users.some(u => u.email === email)) {
    alert('❌ Este email ya está registrado');
    return;
  }

  // Crear usuario
  const newUser = {
    id: Date.now(),
    email,
    password,
    estacion,
    fechaRegistro: new Date().toISOString()
  };

  users.push(newUser);
  localStorage.setItem(usersKey, JSON.stringify(users));
  localStorage.setItem(currentUserKey, JSON.stringify(newUser));

  alert(`✅ Estación "${estacion}" registrada!`);
  window.location.href = '/dashboard';
});

// ===== LOGIN =====
document.getElementById('login-btn')?.addEventListener('click', () => {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  const users = JSON.parse(localStorage.getItem(usersKey));
  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    localStorage.setItem(currentUserKey, JSON.stringify(user));
    window.location.href = '/dashboard';
  } else {
    alert('❌ Email o contraseña incorrectos');
  }
});

// ===== LOGOUT =====
document.getElementById('logout-btn')?.addEventListener('click', () => {
  localStorage.removeItem(currentUserKey);
  window.location.href = '/';
});

// ===== VERIFICAR AUTENTICACIÓN =====
function checkAuth() {
  const currentUser = JSON.parse(localStorage.getItem(currentUserKey));
  
  // Ocultar formularios si está autenticado
  if (currentUser && document.getElementById('auth-forms')) {
    document.getElementById('auth-forms').classList.add('hidden');
  }
}

// Ejecutar al cargar
window.addEventListener('DOMContentLoaded', checkAuth);