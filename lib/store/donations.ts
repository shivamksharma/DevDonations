import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface DonationItem {
  id: string;
  type: string;
  quantity: number;
}

export interface Donation {
  id: string;
  name: string;
  phone: string;
  donationType: string;
  address: string;
  items: DonationItem[];
  message?: string;
  status: 'pending' | 'completed';
  date: string;
}

interface DonationStore {
  donations: Donation[];
  addDonation: (donation: Omit<Donation, 'id' | 'status' | 'date'>) => void;
  updateDonationStatus: (id: string, status: 'pending' | 'completed') => void;
  deleteDonation: (id: string) => void;
}

export const useDonationStore = create<DonationStore>()(
  persist(
    (set) => ({
      donations: [],
      addDonation: (donation) => set((state) => ({
        donations: [...state.donations, {
          ...donation,
          id: `DON-${String(state.donations.length + 1).padStart(3, '0')}`,
          status: 'pending',
          date: new Date().toISOString(),
        }],
      })),
      updateDonationStatus: (id, status) => set((state) => ({
        donations: state.donations.map((d) =>
          d.id === id ? { ...d, status } : d
        ),
      })),
      deleteDonation: (id) => set((state) => ({
        donations: state.donations.filter((d) => d.id !== id),
      })),
    }),
    {
      name: 'donations-storage',
    }
  )
);