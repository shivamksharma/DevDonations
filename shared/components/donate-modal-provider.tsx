"use client";

import { DonationModal } from "@/frontend/components/donate/donation-modal";
import { useDonateModal } from "@/shared/lib/store/donate-modal-store";

export function DonateModalProvider() {
  const { isOpen, closeModal } = useDonateModal();

  return (
    <DonationModal 
      isOpen={isOpen} 
      onClose={closeModal}
    />
  );
}
