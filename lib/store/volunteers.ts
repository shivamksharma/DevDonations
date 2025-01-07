import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getVolunteers, updateVolunteerStatus as updateVolunteerStatusFirebase } from '@/lib/firebase/volunteers';

export interface Volunteer {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  availability: string[];
  experience?: string;
  motivation: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedAt: string;
}

interface VolunteerStore {
  volunteers: Volunteer[];
  fetchVolunteers: () => Promise<void>;
  updateVolunteerStatus: (id: string, status: Volunteer['status']) => Promise<void>;
}

export const useVolunteerStore = create<VolunteerStore>()(
  persist(
    (set) => ({
      volunteers: [],
      fetchVolunteers: async () => {
        const { volunteers, error } = await getVolunteers();
        if (error) {
          console.error("Error fetching volunteers:", error);
          return;
        }
        set({ volunteers });
      },
      updateVolunteerStatus: async (id, status) => {
        await updateVolunteerStatusFirebase(id, status);
        set((state) => ({
          volunteers: state.volunteers.map((v) =>
            v.id === id ? { ...v, status } : v
          ),
        }));
      },
    }),
    {
      name: 'volunteers-storage',
    }
  )
);