// Importa directamente en lugar de usar fetch
import stationsData from '../data/stations.json';

export function getPublicStations() {
  return stationsData.filter(s => s.public);
}

export function getUserStations() {
  // Para build devuelve array vacío, en runtime usa localStorage
  if (typeof window === 'undefined') return [];
  return JSON.parse(localStorage.getItem('userStations')) || [];
}