import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
  addVolunteer: (volunteer: Omit<Volunteer, 'id' | 'status' | 'appliedAt'>) => void;
  updateVolunteerStatus: (id: string, status: Volunteer['status']) => void;
}

export const useVolunteerStore = create<VolunteerStore>()(
  persist(
    (set) => ({
      volunteers: [],
      addVolunteer: (volunteer) => set((state) => ({
        volunteers: [...state.volunteers, {
          ...volunteer,
          id: `VOL-${String(state.volunteers.length + 1).padStart(3, '0')}`,
          status: 'pending',
          appliedAt: new Date().toISOString(),
        }],
      })),
      updateVolunteerStatus: (id, status) => set((state) => ({
        volunteers: state.volunteers.map((v) =>
          v.id === id ? { ...v, status } : v
        ),
      })),
    }),
    {
      name: 'volunteers-storage',
    }
  )
);