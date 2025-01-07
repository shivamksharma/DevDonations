import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getDonations, updateDonationStatus as updateDonationStatusFirebase, deleteDonation as deleteDonationFirebase } from '@/lib/firebase/donations';

export interface DonationItem {
  id: string;
  type: string;
  quantity: number;
}

export interface Donation {
  id: string;
  name: string;
  whatsappNumber: string;
  pickupType: string;
  address: string;
  items: DonationItem[];
  message?: string;
  status: 'pending' | 'completed';
  createdAt: string;
}

interface DonationStore {
  donations: Donation[];
  fetchDonations: () => Promise<void>;
  addDonation: (donation: Omit<Donation, 'id' | 'status' | 'createdAt'>) => void;
  updateDonationStatus: (id: string, status: 'pending' | 'completed') => Promise<void>;
  deleteDonation: (id: string) => Promise<void>;
}

export const useDonationStore = create<DonationStore>()(
  persist(
    (set) => ({
      donations: [],
      fetchDonations: async () => {
        const { donations, error } = await getDonations();
        if (error) {
          console.error("Error fetching donations:", error);
          return;
        }
        set({ donations: donations as Donation[] });
      },
      addDonation: (donation) => set((state) => ({
        donations: [...state.donations, {
          ...donation,
          id: `DON-${String(state.donations.length + 1).padStart(3, '0')}`,
          status: 'pending',
          createdAt: new Date().toISOString(),
        }],
      })),
      updateDonationStatus: async (id, status) => {
        await updateDonationStatusFirebase(id, status);
        set((state) => ({
          donations: state.donations.map((d) =>
            d.id === id ? { ...d, status } : d
          ),
        }));
      },
      deleteDonation: async (id) => {
        await deleteDonationFirebase(id);
        set((state) => ({
          donations: state.donations.filter((d) => d.id !== id),
        }));
      },
    }),
    {
      name: 'donations-storage',
    }
  )
);