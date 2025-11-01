import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
  onSnapshot,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Volunteer, VolunteerStatus } from '@/shared/utils/types/admin';

const COLLECTION_NAME = 'volunteers';

// Convert Firestore timestamp to Date
const timestampToDate = (timestamp: Timestamp | null): Date | undefined => {
  return timestamp ? timestamp.toDate() : undefined;
};

// Convert Date to Firestore timestamp
const dateToTimestamp = (date: Date): Timestamp => {
  return Timestamp.fromDate(date);
};

// Convert Firestore document to Volunteer
const docToVolunteer = (doc: any): Volunteer => {
  const data = doc.data();
  return {
    id: doc.id,
    name: data.name,
    email: data.email,
    phone: data.phone,
    status: data.status || 'pending',
    skills: data.role ? [data.role] : [], // Map role to skills array
    availability: data.availability || [],
    location: data.location || '',
    experienceLevel: data.experience || 'beginner',
    joinedAt: timestampToDate(data.appliedAt) || new Date(), // Map appliedAt to joinedAt
    lastActive: timestampToDate(data.appliedAt) || new Date(),
    completedTasks: data.completedTasks || 0,
    rating: data.rating || 0,
    bio: data.motivation || data.bio,
  } as Volunteer;
};

// Get all volunteers
export const getVolunteers = async (): Promise<Volunteer[]> => {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy('appliedAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(docToVolunteer);
  } catch (error) {
    console.error('Error fetching volunteers:', error);
    throw error;
  }
};

// Get volunteer by ID
export const getVolunteerById = async (id: string): Promise<Volunteer | null> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docToVolunteer(docSnap);
    }
    return null;
  } catch (error) {
    console.error('Error fetching volunteer:', error);
    throw error;
  }
};

// Create new volunteer
export const createVolunteer = async (volunteerData: Omit<Volunteer, 'id' | 'joinedAt' | 'lastActive'>): Promise<string> => {
  try {
    const now = new Date();
    const docData = {
      ...volunteerData,
      joinedAt: dateToTimestamp(now),
      lastActive: dateToTimestamp(now),
    };
    const docRef = await addDoc(collection(db, COLLECTION_NAME), docData);
    return docRef.id;
  } catch (error) {
    console.error('Error creating volunteer:', error);
    throw error;
  }
};

// Alias for createVolunteer
export const addVolunteer = createVolunteer;

// Update volunteer
export const updateVolunteer = async (id: string, updates: Partial<Omit<Volunteer, 'id' | 'joinedAt'>>): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const updateData = {
      ...updates,
      lastActive: dateToTimestamp(new Date()),
    };
    await updateDoc(docRef, updateData);
  } catch (error) {
    console.error('Error updating volunteer:', error);
    throw error;
  }
};

// Update volunteer status
export const updateVolunteerStatus = async (id: string, status: VolunteerStatus): Promise<void> => {
  await updateVolunteer(id, { status });
};

// Delete volunteer
export const deleteVolunteer = async (id: string): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting volunteer:', error);
    throw error;
  }
};

// Get volunteers by status
export const getVolunteersByStatus = async (status: VolunteerStatus): Promise<Volunteer[]> => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('status', '==', status),
      orderBy('appliedAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(docToVolunteer);
  } catch (error) {
    console.error('Error fetching volunteers by status:', error);
    throw error;
  }
};

// Subscribe to volunteers (real-time)
export const subscribeToVolunteers = (callback: (volunteers: Volunteer[]) => void) => {
  const q = query(collection(db, COLLECTION_NAME), orderBy('appliedAt', 'desc'));
  return onSnapshot(q, (querySnapshot) => {
    const volunteers = querySnapshot.docs.map(docToVolunteer);
    callback(volunteers);
  }, (error) => {
    console.error('Error subscribing to volunteers:', error);
  });
};

// Get active volunteers
export const getActiveVolunteers = async (): Promise<Volunteer[]> => {
  return getVolunteersByStatus('active');
};

// Get top volunteers by rating
export const getTopVolunteers = async (count: number = 10): Promise<Volunteer[]> => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('status', '==', 'active'),
      orderBy('rating', 'desc'),
      limit(count)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(docToVolunteer);
  } catch (error) {
    console.error('Error fetching top volunteers:', error);
    throw error;
  }
};