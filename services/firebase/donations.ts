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
import { Donation, DonationStatus } from '@/shared/utils/types/admin';

const COLLECTION_NAME = 'donations';

// Convert Firestore timestamp to Date
const timestampToDate = (timestamp: Timestamp | null): Date | undefined => {
  return timestamp ? timestamp.toDate() : undefined;
};

// Convert Date to Firestore timestamp
const dateToTimestamp = (date: Date): Timestamp => {
  return Timestamp.fromDate(date);
};

// Convert Firestore document to Donation
const docToDonation = (doc: any): Donation => {
  const data = doc.data();
  return {
    id: doc.id,
    donorName: data.name || data.donorName || '',
    donorEmail: data.email || data.donorEmail || '',
    donorPhone: data.whatsappNumber || data.donorPhone || '',
    items: data.items || [],
    totalItems: data.items ? data.items.reduce((sum: number, item: any) => sum + (item.quantity || 0), 0) : 0,
    status: data.status || 'pending',
    createdAt: timestampToDate(data.createdAt) || new Date(),
    updatedAt: timestampToDate(data.updatedAt) || new Date(),
    location: data.pickupType === 'pickup' ? data.address : data.dropoffLocation || '',
    notes: data.message || data.notes,
    assignedVolunteer: data.assignedVolunteer,
  } as Donation;
};

// Get all donations
export const getDonations = async (): Promise<Donation[]> => {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(docToDonation);
  } catch (error) {
    console.error('Error fetching donations:', error);
    throw error;
  }
};

// Get donation by ID
export const getDonationById = async (id: string): Promise<Donation | null> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docToDonation(docSnap);
    }
    return null;
  } catch (error) {
    console.error('Error fetching donation:', error);
    throw error;
  }
};

// Create new donation
export const createDonation = async (donationData: Omit<Donation, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  try {
    const now = new Date();
    const docData = {
      ...donationData,
      createdAt: dateToTimestamp(now),
      updatedAt: dateToTimestamp(now),
    };
    const docRef = await addDoc(collection(db, COLLECTION_NAME), docData);
    return docRef.id;
  } catch (error) {
    console.error('Error creating donation:', error);
    throw error;
  }
};

// Alias for createDonation
export const addDonation = createDonation;

// Update donation
export const updateDonation = async (id: string, updates: Partial<Omit<Donation, 'id' | 'createdAt'>>): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const updateData = {
      ...updates,
      updatedAt: dateToTimestamp(new Date()),
    };
    await updateDoc(docRef, updateData);
  } catch (error) {
    console.error('Error updating donation:', error);
    throw error;
  }
};

// Update donation status
export const updateDonationStatus = async (id: string, status: DonationStatus): Promise<void> => {
  await updateDonation(id, { status });
};

// Delete donation
export const deleteDonation = async (id: string): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting donation:', error);
    throw error;
  }
};

// Get donations by status
export const getDonationsByStatus = async (status: DonationStatus): Promise<Donation[]> => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('status', '==', status),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(docToDonation);
  } catch (error) {
    console.error('Error fetching donations by status:', error);
    throw error;
  }
};

// Subscribe to donations (real-time)
export const subscribeToDonations = (callback: (donations: Donation[]) => void) => {
  const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
  return onSnapshot(q, (querySnapshot) => {
    const donations = querySnapshot.docs.map(docToDonation);
    callback(donations);
  }, (error) => {
    console.error('Error subscribing to donations:', error);
  });
};

// Get recent donations
export const getRecentDonations = async (count: number = 10): Promise<Donation[]> => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      orderBy('createdAt', 'desc'),
      limit(count)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(docToDonation);
  } catch (error) {
    console.error('Error fetching recent donations:', error);
    throw error;
  }
};