import { create } from 'zustand';
import { getAnalytics } from '@/lib/firebase/analytics';

interface AnalyticsStore {
  pageViews: any[];
  loading: boolean;
  fetchAnalytics: (startDate?: Date, endDate?: Date) => Promise<void>;
}

export const useAnalyticsStore = create<AnalyticsStore>((set) => ({
  pageViews: [],
  loading: false,
  fetchAnalytics: async (startDate?: Date, endDate?: Date) => {
    set({ loading: true });
    const { pageViews, error } = await getAnalytics(startDate, endDate);
    if (!error) {
      set({ pageViews });
    }
    set({ loading: false });
  }
})); 