import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  Timestamp,
  onSnapshot,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { DropoffLocation } from '@/shared/utils/types/admin';

const COLLECTION_NAME = 'dropoff_locations';

// Convert Firestore timestamp to Date
const timestampToDate = (timestamp: Timestamp | null): Date | undefined => {
  return timestamp ? timestamp.toDate() : undefined;
};

// Convert Date to Firestore timestamp
const dateToTimestamp = (date: Date): Timestamp => {
  return Timestamp.fromDate(date);
};

// Convert Firestore document to DropoffLocation
const docToDropoffLocation = (doc: any): DropoffLocation => {
  const data = doc.data();
  return {
    id: doc.id,
    name: data.name,
    address: data.address,
    city: data.city,
    state: data.state,
    pincode: data.pincode,
    description: data.description || '',
    phone: data.phone || '',
    hours: data.hours || '',
    createdAt: timestampToDate(data.createdAt),
    updatedAt: timestampToDate(data.updatedAt),
  } as DropoffLocation;
};

// Get all dropoff locations
export const getDropoffLocations = async (): Promise<DropoffLocation[]> => {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(docToDropoffLocation);
  } catch (error) {
    console.error('Error fetching dropoff locations:', error);
    throw error;
  }
};

// Get dropoff location by ID
export const getDropoffLocationById = async (id: string): Promise<DropoffLocation | null> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docToDropoffLocation(docSnap);
    }
    return null;
  } catch (error) {
    console.error('Error fetching dropoff location:', error);
    throw error;
  }
};

// Create new dropoff location
export const createDropoffLocation = async (
  locationData: Omit<DropoffLocation, 'id' | 'createdAt' | 'updatedAt'>
): Promise<string> => {
  try {
    const now = new Date();
    const docData = {
      ...locationData,
      createdAt: dateToTimestamp(now),
      updatedAt: dateToTimestamp(now),
    };
    const docRef = await addDoc(collection(db, COLLECTION_NAME), docData);
    return docRef.id;
  } catch (error) {
    console.error('Error creating dropoff location:', error);
    throw error;
  }
};

// Update dropoff location
export const updateDropoffLocation = async (
  id: string,
  updates: Partial<Omit<DropoffLocation, 'id' | 'createdAt'>>
): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const updateData = {
      ...updates,
      updatedAt: dateToTimestamp(new Date()),
    };
    await updateDoc(docRef, updateData);
  } catch (error) {
    console.error('Error updating dropoff location:', error);
    throw error;
  }
};

// Delete dropoff location
export const deleteDropoffLocation = async (id: string): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting dropoff location:', error);
    throw error;
  }
};

// Subscribe to dropoff locations (real-time)
export const subscribeToDropoffLocations = (callback: (locations: DropoffLocation[]) => void) => {
  const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
  return onSnapshot(
    q,
    (querySnapshot) => {
      const locations = querySnapshot.docs.map(docToDropoffLocation);
      callback(locations);
    },
    (error) => {
      console.error('Error subscribing to dropoff locations:', error);
    }
  );
};
