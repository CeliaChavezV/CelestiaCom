import { db, storage } from './firebase';
import { 
  collection, 
  doc, 
  getDoc, 
  setDoc, 
  getDocs,
  query,
  where
} from 'firebase/firestore';
import { 
  ref, 
  uploadBytes, 
  getDownloadURL,
  deleteObject,
  listAll
} from 'firebase/storage';

// Obtener todas las estaciones públicas
export async function getPublicStations() {
  const q = query(collection(db, 'stations'), where('public', '==', true));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// Obtener estaciones de un usuario
export async function getUserStations(userId) {
  if (!userId) return [];
  
  const q = query(collection(db, 'stations'), where('owner', '==', userId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// Obtener estación por ID
export async function getStationById(stationId) {
  const docRef = doc(db, 'stations', stationId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
}

// Crear nueva estación
export async function createStation(stationData, userId) {
  if (!userId) throw new Error('Usuario no autenticado');
  
  const stationRef = doc(collection(db, 'stations'));
  await setDoc(stationRef, {
    ...stationData,
    owner: userId,
    public: stationData.public || false,
    createdAt: new Date().toISOString(),
    files: []
  });
  
  return { id: stationRef.id, ...stationData };
}

// Subir archivo a una estación
export async function uploadStationFile(stationId, file, userId) {
  if (!userId) throw new Error('Usuario no autenticado');
  
  const storageRef = ref(storage, `stations/${stationId}/${file.name}`);
  await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(storageRef);
  
  return {
    name: file.name,
    type: file.type,
    size: file.size,
    url: downloadURL,
    uploadedAt: new Date().toISOString()
  };
}

// Eliminar archivo de una estación
export async function deleteStationFile(stationId, fileName, userId) {
  if (!userId) throw new Error('Usuario no autenticado');
  
  const fileRef = ref(storage, `stations/${stationId}/${fileName}`);
  await deleteObject(fileRef);
  return true;
}