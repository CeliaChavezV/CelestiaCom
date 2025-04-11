import { db, storage } from './firebase';
import { 
  collection, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc,
  deleteDoc,
  getDocs,
  query,
  where,
  arrayUnion,
  arrayRemove
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
  const q = query(collection(db, 'stations'), where('isPublic', '==', true));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// Obtener estaciones de un usuario específico
export async function getUserStations(userId) {
  if (!userId) return [];
  const q = query(collection(db, 'stations'), where('ownerId', '==', userId));
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
    ownerId: userId,
    isPublic: stationData.isPublic || false,
    createdAt: new Date().toISOString(),
    files: []
  });
  
  return { id: stationRef.id, ...stationData };
}

// Actualizar estación
export async function updateStation(stationId, updates, userId) {
  const station = await getStationById(stationId);
  if (!station) throw new Error('Estación no encontrada');
  if (station.ownerId !== userId) throw new Error('No autorizado');
  
  const stationRef = doc(db, 'stations', stationId);
  await updateDoc(stationRef, updates);
  return true;
}

// Eliminar estación
export async function deleteStation(stationId, userId) {
  const station = await getStationById(stationId);
  if (!station) throw new Error('Estación no encontrada');
  if (station.ownerId !== userId) throw new Error('No autorizado');
  
  // Eliminar archivos primero
  const filesRef = ref(storage, `stations/${stationId}`);
  try {
    const files = await listAll(filesRef);
    await Promise.all(files.items.map(file => deleteObject(file)));
  } catch (error) {
    console.log('No hay archivos para eliminar');
  }
  
  // Eliminar la estación
  await deleteDoc(doc(db, 'stations', stationId));
  return true;
}

// Subir archivo a una estación
export async function uploadStationFile(stationId, file, userId) {
  const station = await getStationById(stationId);
  if (!station) throw new Error('Estación no encontrada');
  if (station.ownerId !== userId) throw new Error('No autorizado');
  
  const storageRef = ref(storage, `stations/${stationId}/${file.name}`);
  await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(storageRef);
  
  const fileData = {
    name: file.name,
    type: file.type,
    size: file.size,
    url: downloadURL,
    uploadedAt: new Date().toISOString()
  };
  
  // Actualizar la estación con el nuevo archivo
  const stationRef = doc(db, 'stations', stationId);
  await updateDoc(stationRef, {
    files: arrayUnion(fileData)
  });
  
  return fileData;
}

// Eliminar archivo de una estación
export async function deleteStationFile(stationId, fileName, userId) {
  const station = await getStationById(stationId);
  if (!station) throw new Error('Estación no encontrada');
  if (station.ownerId !== userId) throw new Error('No autorizado');
  
  // Eliminar de Storage
  const fileRef = ref(storage, `stations/${stationId}/${fileName}`);
  await deleteObject(fileRef);
  
  // Eliminar de la lista de archivos
  const stationRef = doc(db, 'stations', stationId);
  const fileToRemove = station.files.find(f => f.name === fileName);
  if (fileToRemove) {
    await updateDoc(stationRef, {
      files: arrayRemove(fileToRemove)
    });
  }
  
  return true;
}