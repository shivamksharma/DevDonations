import { 
  collection,
  addDoc,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
  deleteDoc,
  orderBy,
  Timestamp
} from 'firebase/firestore';
import { db } from './config';
import type { DonationFormData } from '@/shared/utils/schemas/donation-form-schema';

const DONATIONS_COLLECTION = 'donations';

export const addDonation = async (donationData: DonationFormData) => {
  try {
    const docRef = await addDoc(collection(db, DONATIONS_COLLECTION), {
      ...donationData,
      status: 'pending',
      createdAt: Timestamp.now(),
    });
    return { id: docRef.id, error: null };
  } catch (error: any) {
    console.error('Error adding donation:', error);
    return { id: null, error: error.message };
  }
};

export const getDonations = async (status?: 'pending' | 'completed') => {
  try {
    const donationsCollection = collection(db, DONATIONS_COLLECTION);
    let queryConstraints = [];

    if (status) {
      queryConstraints.push(where('status', '==', status));
    }
    queryConstraints.push(orderBy('createdAt', 'desc'));

    const q = query(donationsCollection, ...queryConstraints);
    
    const snapshot = await getDocs(q);
    const donations = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    return { donations, error: null };
  } catch (error: any) {
    console.error('Error getting donations:', error);
    return { donations: [], error: error.message };
  }
};

export const updateDonationStatus = async (id: string, status: 'pending' | 'completed') => {
  try {
    await updateDoc(doc(db, DONATIONS_COLLECTION, id), { status });
    return { error: null };
  } catch (error: any) {
    console.error('Error updating donation status:', error);
    return { error: error.message };
  }
};

export const deleteDonation = async (id: string) => {
  try {
    await deleteDoc(doc(db, DONATIONS_COLLECTION, id));
    return { error: null };
  } catch (error: any) {
    console.error('Error deleting donation:', error);
    return { error: error.message };
  }
};