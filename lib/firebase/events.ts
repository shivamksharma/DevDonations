import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  Timestamp,
  updateDoc,
  doc,
  deleteDoc
} from 'firebase/firestore';
import { db } from './config';

const EVENTS_COLLECTION = 'distribution_events';

export interface DistributionEvent {
  id: string;
  title: string;
  location: string;
  date: string;
  imageUrl?: string;
  description: string;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export const createEvent = async (eventData: Omit<DistributionEvent, 'id' | 'createdAt' | 'updatedAt'>) => {
  try {
    const now = Timestamp.now();
    const docRef = await addDoc(collection(db, EVENTS_COLLECTION), {
      ...eventData,
      createdAt: now,
      updatedAt: now,
    });
    return { id: docRef.id, error: null };
  } catch (error: any) {
    console.error('Error creating event:', error);
    return { id: null, error: error.message };
  }
};

export const getEvents = async (status?: DistributionEvent['status']) => {
  try {
    const eventsCollection = collection(db, EVENTS_COLLECTION);
    let queryConstraints = [];

    if (status) {
      queryConstraints.push(where('status', '==', status));
    }
    queryConstraints.push(orderBy('date', 'desc'));

    const q = query(eventsCollection, ...queryConstraints);
    
    const snapshot = await getDocs(q);
    const events = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    return { events, error: null };
  } catch (error: any) {
    console.error('Error getting events:', error);
    return { events: [], error: error.message };
  }
};

export const updateEvent = async (id: string, eventData: Partial<DistributionEvent>) => {
  try {
    const eventRef = doc(db, EVENTS_COLLECTION, id);
    await updateDoc(eventRef, {
      ...eventData,
      updatedAt: Timestamp.now(),
    });
    return { error: null };
  } catch (error: any) {
    console.error('Error updating event:', error);
    return { error: error.message };
  }
};

export const deleteEvent = async (id: string) => {
  try {
    const eventRef = doc(db, EVENTS_COLLECTION, id);
    await deleteDoc(eventRef);
    return { error: null };
  } catch (error: any) {
    console.error('Error deleting event:', error);
    return { error: error.message };
  }
}; 