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
import { Event, EventStatus } from '@/shared/utils/types/admin';

const COLLECTION_NAME = 'events';

// Convert Firestore timestamp to Date
const timestampToDate = (timestamp: Timestamp | null): Date | undefined => {
  return timestamp ? timestamp.toDate() : undefined;
};

// Convert Date to Firestore timestamp
const dateToTimestamp = (date: Date): Timestamp => {
  return Timestamp.fromDate(date);
};

// Convert Firestore document to Event
const docToEvent = (doc: any): Event => {
  const data = doc.data();
  return {
    id: doc.id,
    title: data.title,
    description: data.description,
    type: data.type,
    status: data.status,
    startDate: timestampToDate(data.startDate),
    endDate: timestampToDate(data.endDate),
    location: data.location,
    maxParticipants: data.maxParticipants,
    registeredParticipants: data.registeredParticipants,
    organizer: data.organizer,
    requirements: data.requirements || [],
    createdAt: timestampToDate(data.createdAt),
    updatedAt: timestampToDate(data.updatedAt),
  } as Event;
};

// Get all events
export const getEvents = async (): Promise<Event[]> => {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(docToEvent);
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

// Get event by ID
export const getEventById = async (id: string): Promise<Event | null> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docToEvent(docSnap);
    }
    return null;
  } catch (error) {
    console.error('Error fetching event:', error);
    throw error;
  }
};

// Create new event
export const createEvent = async (eventData: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  try {
    const now = new Date();
    const docData = {
      ...eventData,
      createdAt: dateToTimestamp(now),
      updatedAt: dateToTimestamp(now),
    };
    const docRef = await addDoc(collection(db, COLLECTION_NAME), docData);
    return docRef.id;
  } catch (error) {
    console.error('Error creating event:', error);
    throw error;
  }
};

// Update event
export const updateEvent = async (id: string, updates: Partial<Omit<Event, 'id' | 'createdAt'>>): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const updateData = {
      ...updates,
      updatedAt: dateToTimestamp(new Date()),
    };
    await updateDoc(docRef, updateData);
  } catch (error) {
    console.error('Error updating event:', error);
    throw error;
  }
};

// Update event status
export const updateEventStatus = async (id: string, status: EventStatus): Promise<void> => {
  await updateEvent(id, { status });
};

// Delete event
export const deleteEvent = async (id: string): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting event:', error);
    throw error;
  }
};

// Get events by status
export const getEventsByStatus = async (status: EventStatus): Promise<Event[]> => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('status', '==', status),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(docToEvent);
  } catch (error) {
    console.error('Error fetching events by status:', error);
    throw error;
  }
};

// Subscribe to events (real-time)
export const subscribeToEvents = (callback: (events: Event[]) => void) => {
  const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
  return onSnapshot(q, (querySnapshot) => {
    const events = querySnapshot.docs.map(docToEvent);
    callback(events);
  }, (error) => {
    console.error('Error subscribing to events:', error);
  });
};

// Get upcoming events
export const getUpcomingEvents = async (): Promise<Event[]> => {
  try {
    const now = new Date();
    const q = query(
      collection(db, COLLECTION_NAME),
      where('startDate', '>=', dateToTimestamp(now)),
      orderBy('startDate', 'asc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(docToEvent);
  } catch (error) {
    console.error('Error fetching upcoming events:', error);
    throw error;
  }
};

// Get events by type
export const getEventsByType = async (type: string): Promise<Event[]> => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('type', '==', type),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(docToEvent);
  } catch (error) {
    console.error('Error fetching events by type:', error);
    throw error;
  }
};

// Register participant for event
export const registerForEvent = async (eventId: string): Promise<void> => {
  try {
    const event = await getEventById(eventId);
    if (!event) throw new Error('Event not found');

    const newCount = (event.registeredParticipants || 0) + 1;
    if (event.maxParticipants && newCount > event.maxParticipants) {
      throw new Error('Event is full');
    }

    await updateEvent(eventId, { registeredParticipants: newCount });
  } catch (error) {
    console.error('Error registering for event:', error);
    throw error;
  }
};