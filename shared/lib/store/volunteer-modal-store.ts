import { create } from 'zustand';

interface VolunteerModalStore {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const useVolunteerModal = create<VolunteerModalStore>((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));
