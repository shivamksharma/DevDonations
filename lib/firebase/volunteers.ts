import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
  orderBy,
  Timestamp
} from 'firebase/firestore';
import { db } from './config';
import type { VolunteerFormData } from '@/lib/schemas/volunteer-form-schema';

const VOLUNTEERS_COLLECTION = 'volunteers';

export const addVolunteer = async (volunteerData: VolunteerFormData) => {
  try {
    const docRef = await addDoc(collection(db, VOLUNTEERS_COLLECTION), {
      ...volunteerData,
      status: 'pending',
      appliedAt: Timestamp.now(),
    });
    return { id: docRef.id, error: null };
  } catch (error: any) {
    console.error('Error adding volunteer:', error);
    return { id: null, error: error.message };
  }
};

export const getVolunteers = async (status?: 'pending' | 'approved' | 'rejected') => {
  try {
    const volunteersCollection = collection(db, VOLUNTEERS_COLLECTION);

    let queryConstraints = [];
    if (status) {
      queryConstraints.push(where('status', '==', status));
    }
    queryConstraints.push(orderBy('appliedAt', 'desc'));

    const q = query(volunteersCollection, ...queryConstraints);

    const snapshot = await getDocs(q);
    const volunteers = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return { volunteers, error: null };
  } catch (error: any) {
    console.error('Error getting volunteers:', error);
    return { volunteers: [], error: error.message };
  }
};

export const updateVolunteerStatus = async (id: string, status: 'pending' | 'approved' | 'rejected') => {
  try {
    await updateDoc(doc(db, VOLUNTEERS_COLLECTION, id), { status });
    return { error: null };
  } catch (error: any) {
    console.error('Error updating volunteer status:', error);
    return { error: error.message };
  }
}; 