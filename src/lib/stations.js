// Estaciones públicas iniciales
export async function getPublicStations() {
    const response = await fetch('/data/stations.json');
    return (await response.json()).filter(s => s.public);
  }
  
  // Estaciones del usuario (guardadas en localStorage)
  export function getUserStations() {
    return JSON.parse(localStorage.getItem('userStations')) || [];
  }
  
  export function saveUserStation(station) {
    const stations = getUserStations();
    stations.push({ 
      ...station, 
      id: 'user-' + Date.now(),
      creator: localStorage.getItem('currentUser')
    });
    localStorage.setItem('userStations', JSON.stringify(stations));
  }