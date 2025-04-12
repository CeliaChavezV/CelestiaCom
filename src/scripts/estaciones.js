// Mostrar información de la estación
document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem('celestia_currentUser_v2'));
    
    if (user) {
      document.getElementById('welcome-message').textContent = `Panel de Control - ${user.estacion}`;
      document.getElementById('current-estacion').textContent = user.estacion;
    }
  });
  
  // Actualizar estación
  document.getElementById('update-estacion-btn')?.addEventListener('click', () => {
    const newName = document.getElementById('new-estacion-name').value.trim();
    if (!newName) {
      alert('⚠️ Escribe un nombre válido');
      return;
    }
  
    const users = JSON.parse(localStorage.getItem('celestia_users_v2'));
    const currentUser = JSON.parse(localStorage.getItem('celestia_currentUser_v2'));
    
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    if (userIndex !== -1) {
      users[userIndex].estacion = newName;
      localStorage.setItem('celestia_users_v2', JSON.stringify(users));
      localStorage.setItem('celestia_currentUser_v2', JSON.stringify(users[userIndex]));
      
      document.getElementById('current-estacion').textContent = newName;
      document.getElementById('welcome-message').textContent = `Panel de Control - ${newName}`;
      alert('✅ Nombre actualizado!');
    }
  });