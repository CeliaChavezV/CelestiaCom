// Importa los datos estáticos
import stationsData from '../data/stations.json';

// Estaciones públicas
export function getPublicStations() {
  return stationsData.filter(s => s.public);
}

// Estaciones del usuario (localStorage)
export function getUserStations() {
  if (typeof window === 'undefined') return []; // Para build estático
  return JSON.parse(localStorage.getItem('userStations')) || [];
}

// Guarda nueva estación (SOLUCIÓN AL ERROR)
export function saveUserStation(stationData) {
  if (typeof window !== 'undefined') {
    const stations = getUserStations();
    const newStation = {
      ...stationData,
      id: 'user-' + Date.now(),
      creator: localStorage.getItem('currentUser'),
      public: false
    };
    stations.push(newStation);
    localStorage.setItem('userStations', JSON.stringify(stations));
    return newStation;
  }
  return null;
}