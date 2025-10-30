import { create } from 'zustand';

interface DonateModalStore {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const useDonateModal = create<DonateModalStore>((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));
